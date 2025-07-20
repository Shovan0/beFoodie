import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { addToCart } from '../features/cartSlice'; 
import { openLogin } from '../features/modalSlice';
import { useSelector, useDispatch } from 'react-redux';

function Card({ foodItem, options, onOpen }) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [token, setToken] = useState('');
  const priceRef = useRef();
  const showLogin = useSelector((state) => state.modal.showLogin);

  const dispatch = useDispatch();
  const priceOptions = Object.keys(options);
  const finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceRef.current?.value || priceOptions[0]);
    setToken(Cookies.get('authToken'));
  }, []);

  const handleAddToCart = () => {
    if (!token) {
      dispatch(openLogin());
      return;
    }

    dispatch(
      addToCart({
        _id: foodItem._id,
        name: foodItem.name,
        img: foodItem.img,
        qty,
        size,
        price: finalPrice,
      })
    );
  };

  return (
    <div className="max-w-sm mx-auto my-6 bg-white rounded-2xl shadow-md overflow-hidden transition hover:shadow-lg">
      {/* Image */}
      <img
        src={foodItem.img}
        alt={foodItem.name}
        className="w-full h-48 object-cover rounded-t-2xl"
      />

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h5 className="text-xl font-semibold text-gray-800 mb-2">
          {foodItem.name}
        </h5>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-4">
          Choose your preferred size and quantity to enjoy this delicious dish.
        </p>

        {/* Quantity & Size Selector */}
        <div className="flex items-center justify-between mb-4">
          {/* Quantity */}
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

          {/* Size Dropdown */}
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

        {/* Price */}
        <div className="text-lg font-bold text-gray-800 mb-4">
          ₹{finalPrice}/-
        </div>

        {/* Add to Cart Button */}
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
