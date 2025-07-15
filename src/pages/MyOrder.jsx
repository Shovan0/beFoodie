import React, { useState, useEffect } from 'react';

function MyOrder() {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');

      let response = await fetch('http://localhost:5000/api/myorderdata', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: userEmail })
      });

      response = await response.json();
      setOrders(response.orderData.orderData);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-emerald-600 mb-8 text-center">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">Loading your order history...</p>
        ) : (
          [...orders].reverse().map((orderArray, i) => (
            <div key={i} className="mb-10">
              <h2 className="text-xl font-semibold text-gray-700 mb-4 border-b pb-1">
                Order Placed on:{" "}
                {new Date(orderArray[0].date).toLocaleDateString()}
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {orderArray.map((item) => (
                  <div
                    key={item._id}
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
