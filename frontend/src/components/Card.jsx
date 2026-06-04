import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { incrementCart } from '../features/cartSlice';
import { openLogin } from '../features/modalSlice'; // 👈 import modal action

function Card({ foodItem, options }) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceRef = useRef();
  const dispatch = useDispatch();
  const priceOptions = Object.keys(options);
  const finalPrice = qty * parseInt(options[size] || 0);
  const BASE = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    setSize(priceRef.current?.value || priceOptions[0]);
  }, []);

  const userEmail = useSelector((state) => state.user.email);

  const handleAddToCart = async () => {
    if (!userEmail) {
      dispatch(openLogin());
      return;
    }

    try {
      const response = await fetch(`${BASE}/api/addToCart`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: foodItem.name,
          qty,
          size,
          price: finalPrice,
          img: foodItem.img,
        }),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(incrementCart());
        toast.success('Added to cart');
      } else {
        toast.error('Something went wrong while adding to cart');
      }
    } catch (error) {
      console.error(error);
      toast.error('Error adding item to cart.');
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg flex flex-col h-full">
      <img
        src={foodItem.img}
        alt={foodItem.name}
        className="w-full h-44 sm:h-44 md:h-48 object-cover rounded-t-2xl"
        onError={(e)=>{e.currentTarget.src = 'data:image/svg+xml;utf8,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27400%27 height=%27300%27%3E%3Crect width=%27100%25%27 height=%27100%25%27 fill=%27%23f3f4f6%27/%3E%3Ctext x=%2750%25%27 y=%2750%25%27 dominant-baseline=%27middle%27 text-anchor=%27middle%27 fill=%27%23959e9f%27 font-family=%27Arial, Helvetica, sans-serif%27 font-size=%2720%27%3ENo%20Image%3C/text%3E%3C/svg%3E'}}
      />

      <div className="p-5 flex-1 flex flex-col">
        <h5 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
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

        <div className="mt-auto">
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
    </div>
  );
}

export default Card;
