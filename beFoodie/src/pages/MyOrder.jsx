import React, { useState, useEffect } from 'react';

function MyOrder() {
  const [order, setOrder] = useState([]);

  const loadData = async () => {
    try {
      // const email = localStorage.getItem("email");
      let response = await fetch('http://localhost:5000/api/myorderdata', {
        method: 'post',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: "shovan@gmail.com" })
      });
      response = await response.json();
      setOrder(response.orderData.orderData);
      console.log("this is response ", response.orderData.orderData);
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }

  useEffect(() => {
    loadData();
  }, []);
  return (
    <div className="min-h-screen flex justify-center my-7">
      <div>
        <h1 className='text-6xl'>My Order</h1>
        {order.length > 0 ? (
          order.map((orderArray, index) => (
            <div key={index}>
              {orderArray.map((item) => (
                <div key={item._id} className="order-item">
                  <h2>{item.name}</h2>
                  <p>Quantity: {item.qty}</p>
                  <p>Size: {item.size}</p>
                  <p>Price: {item.price}</p>
                  <img src={item.img} alt={item.name} />
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  )
}

export default MyOrder;
