import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { decrementCart, clearCart, setCartCount } from '../features/cartSlice';

function Cart() {
  const [cartItems, setCartItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addrLoading, setAddrLoading] = useState(false);
  const [addrFields, setAddrFields] = useState({ city: '', pincode: '', phone: '', landmark: '', houseNumber: '' });
  const dispatch = useDispatch();
  const userEmail = useSelector((state) => state.user.email);
  const BASE = import.meta.env.VITE_BACKEND_URL;

  const fetchCart = async () => {
  try {
    const response = await fetch(`${BASE}/api/getCart`, { credentials: 'include' });
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
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    try {
      setAddrLoading(true);
      const res = await fetch(`${BASE}/api/address`, { method: 'GET', credentials: 'include' });
      const data = await res.json();
      if (data.success && data.address) {
        setAddress(data.address);
        // prefill form fields so user can edit before checkout
        setAddrFields({
          city: data.address.city || '',
          pincode: data.address.pincode || '',
          phone: data.address.phone || '',
          landmark: data.address.landmark || '',
          houseNumber: data.address.houseNumber || ''
        });
        setShowAddressForm(true);
      } else {
        setAddress(null);
      }
    } catch (err) {
      console.error('Error fetching address', err);
      setAddress(null);
    } finally {
      setAddrLoading(false);
    }
  };

  const totalPrice = (Array.isArray(cartItems) ? cartItems : []).reduce(
    (total, item) => total + (item.price || 0),
    0
  );

  const handleRemove = async (index) => {
    try {
      const response = await fetch(`${BASE}/api/removeFromCart`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ index }),
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.updatedCart)) {
        setCartItems(data.updatedCart);
        dispatch(decrementCart());
        toast.success('Item removed from cart');
      } else {
        toast.error('Failed to remove item');
      }

    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleClearCart = async () => {
    try {
      const response = await fetch(`${BASE}/api/clearCart`, {
        method: 'POST',
        credentials: 'include',
      });
      const data = await response.json();
      if (data.success) {
        setCartItems([]);
        dispatch(clearCart());
        toast.success('Cart cleared');
      } else {
        toast.error('Failed to clear cart');
      }

    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const proceedToCheckout = async () => {
    try {
      const checkoutResponse = await fetch(`${BASE}/api/checkout`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ totalPrice }),
      });

      const { order } = await checkoutResponse.json();
      const keyResponse = await fetch(`${BASE}/api/getkey`);
      const { key } = await keyResponse.json();

      const options = {
        key,
        amount: order.amount,
        currency: 'INR',
        name: 'beFoodie',
        description: `You have ordered food worth ₹${totalPrice}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            // send verification to backend
            const verifyRes = await fetch(`${BASE}/api/paymentverification`, {
              method: 'POST',
              credentials: 'include',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });

            const json = await verifyRes.json();
            if (json && json.success) {
              // refresh cart and UI
              await fetchCart();
              dispatch(clearCart());
              toast.success('Payment successful');
              window.location.href = `/payment-result?status=success&reference=${json.reference}`;
            } else {
              toast.error('Payment verification failed');
              window.location.href = `/payment-result?status=failed`;
            }
          } catch (err) {
            console.error('Verification error', err);
            toast.error('Payment verification error');
            window.location.href = `/payment-result?status=failed`;
          }
        },
        prefill: {
          name: 'You',
          email: userEmail || '',
          contact: address?.phone || ''
        },
        notes: {
          address: `${address?.houseNumber || ''} ${address?.landmark || ''} ${address?.city || ''} - ${address?.pincode || ''}`
        },
        theme: {
          color: '#10b981'
        }
      };

      const razor = new window.Razorpay(options);
      razor.on('payment.failed', function (response) {
        toast.error('Payment failed');
      });
      razor.open();
    } catch (error) {
      console.error('Error during checkout:', error.message);
      toast.error('Checkout failed');
    }
  };

  const handleCheckOut = async () => {
    try {
      // ensure user is logged in
      if (!userEmail) {
        toast.error('Please login to continue');
        return;
      }

      // fetch address
      if (!address) {
        // show address form to collect minimal info
        setShowAddressForm(true);
        return;
      }

      // proceed if address exists
      await proceedToCheckout();
    } catch (err) {
      console.error('Checkout preparation failed', err);
      toast.error('Checkout failed');
    }
  };

  const handleAddressChange = (e) => {
    setAddrFields({ ...addrFields, [e.target.name]: e.target.value });
  };

  const submitAddressAndCheckout = async (e) => {
    e.preventDefault();
    // basic validation
    const { city, pincode, phone } = addrFields;
    if (!city || !pincode || !phone) {
      toast.error('Please fill city, pincode and phone');
      return;
    }
    try {
      const res = await fetch(`${BASE}/api/address`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addrFields),
      });
      const data = await res.json();
      if (data.success) {
        setAddress(data.address);
        setShowAddressForm(false);
        toast.success('Address saved');
        await proceedToCheckout();
      } else {
        toast.error('Failed to save address');
      }
    } catch (err) {
      console.error('Error saving address', err);
      toast.error('Failed to save address');
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
        <div className="overflow-x-auto mb-12">
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

        {showAddressForm && (
          <>
            <hr className="border-gray-200 my-8" />
            <form onSubmit={submitAddressAndCheckout} className="bg-emerald-50 p-6 rounded-lg mt-2 mb-12 shadow-sm border">
              <h3 className="text-lg font-medium mb-3">Enter delivery address</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <input name="city" value={addrFields.city} onChange={handleAddressChange} placeholder="City" className="p-2 border rounded" />
              <input name="pincode" value={addrFields.pincode} onChange={handleAddressChange} placeholder="Pincode" className="p-2 border rounded" />
              <input name="phone" value={addrFields.phone} onChange={handleAddressChange} placeholder="Phone" className="p-2 border rounded" />
              <input name="houseNumber" value={addrFields.houseNumber} onChange={handleAddressChange} placeholder="House/Flat no." className="p-2 border rounded" />
              <input name="landmark" value={addrFields.landmark} onChange={handleAddressChange} placeholder="Landmark" className="p-2 border rounded sm:col-span-2" />
            </div>
            <div className="mt-3 flex gap-3">
              <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded">Save & Continue</button>
              <button type="button" onClick={() => setShowAddressForm(false)} className="px-4 py-2 border rounded">Cancel</button>
            </div>
          </form>
          </>
        )}

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
