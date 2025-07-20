import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

function MyOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const token = Cookies.get('authToken');

      if (!token) {
        console.warn("Auth token not found. User might not be logged in.");
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/myorderdata', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      const result = await response.json();
      console.log("Fetched order result:", result);

      // ✅ Safely check if orderData exists
      if (result?.orderData?.orderData && Array.isArray(result.orderData.orderData)) {
        setOrders([result.orderData.orderData]);
      } else {
        console.warn("No valid order data found.");
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
          [...orders].reverse().map((orderGroup, i) => (
            <div key={i} className="mb-10">
              <div className="text-center text-sm text-gray-500 mb-4 border-b pb-2">
                Order placed on <span className="font-medium">{generateFakeDate(i)}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orderGroup.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
                  >
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-40 object-cover"
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
