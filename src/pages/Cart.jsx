import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, clearCart } from '../features/cartSlice';
import Cookies from 'js-cookie';

function Cart() {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  // const userEmail = localStorage.getItem("userEmail");

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleRemove = (index) => {
    dispatch(removeFromCart(index));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckOut = async () => {
  try {
    const checkoutResponse = await fetch("http://localhost:5000/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ totalPrice })
    });

    const { order } = await checkoutResponse.json();
    const keyResponse = await fetch("http://localhost:5000/api/getkey");
    const { key } = await keyResponse.json();

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Shovan Nath",
      description: `You have ordered food worth ₹${totalPrice}`,
      image: "", 
      order_id: order.id,
      callback_url: "http://localhost:5000/api/paymentverification",
      prefill: {
        name: "You",
        email: "gaurav.kumar@example.com",
        contact: "9000090000"
      },
      notes: {
        address: "Razorpay Corporate Office"
      },
      theme: {
        color: "#10b981"
      }
    };

    console.log("Razorpay Options:", options); // for debugging

    const razor = new window.Razorpay(options);

    razor.on("payment.failed", function (response) {
    console.error("Payment failed:", response.error);
    });

    razor.open();


    const orderResponse = await fetch("http://localhost:5000/api/orderdata", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,  // ✅ JWT token from cookie
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        orderData: cartItems,
        date: new Date().toDateString()
      })
    });

    if (orderResponse.ok) {
      handleClearCart();
    }
  } catch (error) {
    console.error("Error during checkout:", error.message);
  }
};


  if (cartItems.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-emerald-50">
        <p className="text-xl font-semibold text-emerald-700">Your Cart is Empty!</p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gray-50">
      <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-xl">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto text-left">
            <thead className="bg-emerald-600 text-white">
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Qty</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((food, index) => (
                <tr key={index} className="border-b hover:bg-emerald-50">
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{food.name}</td>
                  <td className="px-4 py-2">{food.qty}</td>
                  <td className="px-4 py-2">{food.size}</td>
                  <td className="px-4 py-2">₹{food.price}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemove(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total + Checkout */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
          <div className="text-lg font-bold text-gray-800">
            Total: ₹{totalPrice}/-
          </div>
          <button
            onClick={handleCheckOut}
            className="bg-emerald-600 text-white px-6 py-2 rounded-full hover:bg-emerald-700 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
