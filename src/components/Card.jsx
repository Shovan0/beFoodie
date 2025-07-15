import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { Link } from 'react-router-dom';

function Card(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const priceref = useRef();

  const data = useCart();
  const dispatch = useDispatchCart();

  const options = props.options;
  const priceOptions = Object.keys(options);
  const foodItem = props.foodItem;

  const finalPrice = qty * parseInt(options[size]);

  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  const handleAddToCart = async () => {
    if (!localStorage.getItem('authToken')) {
      // If not logged in, show login modal
      props.onOpen();
      return;
    }

    await dispatch({
      type: 'ADD',
      item: {
        _id: foodItem._id,
        name: foodItem.name,
        qty: qty,
        size: size,
        price: finalPrice,
        img: foodItem.img,
      },
    });
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
          A delicious option for your next meal. Choose your size and quantity below.
        </p>

        {/* Quantity and Size Selector */}
        <div className="flex items-center justify-between mb-4">
          {/* Quantity Buttons */}
          <div className="flex items-center gap-2">
            <button
              className="w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
              onClick={() => setQty((prevQty) => Math.max(prevQty - 1, 1))}
            >
              <i className="fa-solid fa-minus"></i>
            </button>
            <span className="font-medium text-gray-800">{qty}</span>
            <button
              className="w-8 h-8 flex items-center justify-center bg-emerald-500 text-white rounded-full hover:bg-emerald-600"
              onClick={() => setQty((prevQty) => prevQty + 1)}
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          </div>

          {/* Size Dropdown */}
          <select
            className="bg-emerald-500 text-white text-sm px-3 py-2 rounded-md outline-none hover:bg-emerald-600 cursor-pointer"
            ref={priceref}
            onChange={(e) => setSize(e.target.value)}
          >
            {priceOptions.map((data) => (
              <option key={data} value={data}>
                {data}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="text-lg font-bold text-gray-800 mb-4">
          ₹{finalPrice}/-
        </div>

        {/* Action Button */}
        <button
          onClick={handleAddToCart}
          className="w-full py-2 bg-emerald-600 text-white font-medium rounded-full hover:bg-emerald-700 transition"
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
}

export default Card;
