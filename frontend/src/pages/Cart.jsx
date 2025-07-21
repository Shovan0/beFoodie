import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { decrementCart, clearCart, setCartCount } from '../features/cartSlice';

function Cart() {
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const token = Cookies.get("authToken");
  const BASE = import.meta.env.VITE_BACKEND_URL;

  const fetchCart = async () => {
  try {
    const response = await fetch(`${BASE}/api/getCart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data.success && Array.isArray(data.cartItems)) {
      setCartItems(data.cartItems);
      dispatch(setCartCount(data.cartItems.length));
    } else {
      setCartItems([]); 
    }
  } catch (error) {
    console.error("Error fetching cart:", error);
    setCartItems([]); 
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchCart();
  }, []);

  const totalPrice = (Array.isArray(cartItems) ? cartItems : []).reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  const handleRemove = async (index) => {
    try {
      const response = await fetch(`${BASE}/api/removeFromCart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ index })
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.updatedCart)) {
      setCartItems(data.updatedCart);
      dispatch(decrementCart()); 
    }

    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch(`${BASE}/api/clearCart`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
      setCartItems([]);
      dispatch(clearCart()); 
    }

    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const handleCheckOut = async () => {
    try {
      const checkoutResponse = await fetch(`${BASE}/api/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ totalPrice })
      });

      const { order } = await checkoutResponse.json();
      const keyResponse = await fetch(`${BASE}/api/getkey`);
      const { key } = await keyResponse.json();

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Shovan Nath",
        description: `You have ordered food worth ₹${totalPrice}`,
        order_id: order.id,
        callback_url: `${BASE}/api/paymentverification`,
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

      const razor = new window.Razorpay(options);
      razor.on("payment.failed", function (response) {
        console.error("Payment failed:", response.error);
      });
      razor.open();

      const orderResponse = await fetch(`${BASE}/api/orderdata`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
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

  if (loading) {
    return <div className="text-center py-10 text-gray-500">Loading your cart...</div>;
  }

  if (!Array.isArray(cartItems) || cartItems.length === 0) {
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
