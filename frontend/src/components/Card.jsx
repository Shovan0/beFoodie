import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { incrementCart } from '../features/cartSlice';


function Card({ foodItem, options, onOpen }) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  const dispatch = useDispatch();
  const priceOptions = Object.keys(options);
  const finalPrice = qty * parseInt(options[size] || 0);
  const cartCount = useSelector((state) => state.cart.count);
  const BASE = import.meta.env.VITE_BACKEND_URL;;

  useEffect(() => {
    setSize(priceRef.current?.value || priceOptions[0]);
  }, []);

  const handleAddToCart = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      if (onOpen) onOpen(); 
      return;
    }

    try {
      const response = await fetch(`${BASE}/api/addToCart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: foodItem.name,
        qty,
        size,
        price: finalPrice,
      }),
    });
    
    const data = await response.json();

    if (data.success) {
    dispatch(incrementCart()); 
    } else {
    alert('Something went wrong while adding to cart');
    }

    } catch (error) {
      console.error(error);
      alert('Error adding item to cart.');
    }
  };

  return (
    <div className="max-w-sm mx-auto my-6 bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
      <img
        src={foodItem.img}
        alt={foodItem.name}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      <div className="p-5">
        <h5 className="text-xl font-semibold text-gray-800 mb-2">
          {foodItem.name}
        </h5>

        <p className="text-gray-600 text-sm mb-4">
          Choose your preferred size and quantity to enjoy this delicious dish.
        </p>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
              onClick={() => setQty((prev) => Math.max(1, prev - 1))}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="font-medium text-gray-800">{qty}</span>
            <button
              className="w-8 h-8 bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
              onClick={() => setQty((prev) => prev + 1)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          <select
            className="bg-emerald-500 text-white text-sm px-3 py-2 rounded-md hover:bg-emerald-600"
            ref={priceRef}
            value={size}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="text-lg font-bold text-gray-800 mb-4">
          ₹{finalPrice}/-
        </div>

        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
