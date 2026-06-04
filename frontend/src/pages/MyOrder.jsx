import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE = import.meta.env.VITE_BACKEND_URL;
  const userEmail = useSelector((state) => state.user.email);

  const loadOrders = async () => {
    try {
      if (!userEmail) {
        console.warn('User not logged in.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${BASE}/api/myorderdata`, { method: 'GET', credentials: 'include' });

      const result = await response.json();
      if (result?.orders && Array.isArray(result.orders)) {
        setOrders(result.orders);
      } else {
        console.warn('No valid order data found.');
        setOrders([]);
      }

    } catch (error) {
      console.error("Error loading orders:", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const generateFakeDate = (index) => {
    const now = new Date();
    const fakeDate = new Date(now.getTime() - index * 2 * 24 * 60 * 60 * 1000);
    return fakeDate.toLocaleString("en-IN", {
      weekday: "short",
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-600 mb-8 text-center">
          My Orders
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 text-lg">Loading your order history...</p>
        ) : orders.length === 0 ? (
          <p className="text-center text-gray-500 text-lg">No orders found.</p>
        ) : (
          orders.map((order, i) => (
            <div key={order._id || i} className="mb-10">
              <div className="flex items-center justify-between mb-4 border-b pb-2">
                <div className="text-sm text-gray-500">
                  Order placed on <span className="font-medium">{new Date(order.orderDate).toLocaleString()}</span>
                </div>
                <div className="text-sm">
                  <span className="text-gray-600">Amount: <span className="font-medium">₹{order.amount ?? order.orderData.reduce((s,it)=>s+(it.price||0),0)}</span></span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(order.orderData || []).map((item, index) => (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={item.img || item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                      alt={item.name}
                      className="w-full h-40 object-cover"
                      onError={(e)=>{e.currentTarget.src='https://via.placeholder.com/400x300?text=No+Image'}}
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-1">
                        Size: <span className="font-medium">{item.size}</span>
                      </p>
                      <p className="text-sm text-gray-600 mb-1">
                        Quantity: <span className="font-medium">{item.qty}</span>
                      </p>
                      <p className="text-sm text-gray-600">
                        Price: ₹<span className="font-medium">{item.price}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Payment ID: <span className="font-medium text-sm">{item.paymentId || order.paymentId || '—'}</span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyOrder;
