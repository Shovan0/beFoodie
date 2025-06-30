import React, { useEffect, useRef, useState } from 'react';
import { useCart, useDispatchCart } from './ContextReducer';
import { Link } from 'react-router-dom';

function Card(props) {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');

  let priceref = useRef();
  let data = useCart();
  let dispatch = useDispatchCart();
  let options = props.options;
  let priceOptions = Object.keys(options);

  const foodItem = props.foodItem;

  const handleAddToCart = async () => {
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
    // console.log(data);
  };

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceref.current.value);
  }, []);

  return (
    <div className="max-w-sm mx-auto my-3 bg-white rounded-lg shadow-lg">
      <img
        src={props.foodItem.img}
        className="w-full h-48 object-cover rounded-t-lg"
        alt={props.foodItem.name}
      />
      <div className="p-4">
        <h5 className="text-xl font-bold mb-2">{props.foodItem.name}</h5>
        <p className="text-gray-700 mb-4">This is a description.</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <button
              className="bg-green-500 text-white p-1 rounded-full"
              onClick={() => setQty((prevQty) => Math.max(prevQty - 1, 1))}
            >
              <i class="fa-solid fa-minus"></i>
            </button>
            <span className="mx-2">{qty}</span>
            <button
              className="bg-green-500 text-white p-1 rounded-full"
              onClick={() => setQty((prevQty) => prevQty + 1)}
            >
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <select
            className="bg-green-500 text-white p-2 rounded"
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
        <div className="text-lg font-bold text-gray-800 mb-4">
          Rs. {finalPrice}/-
        </div>
        {localStorage.getItem('authToken') ? (
          <button
            className="p-[10px_30px] border border-red-500 rounded-[50px] bg-transparent cursor-pointer hover:bg-[#f19282] transition duration-300"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
        ) : (
          <Link
            className="w-full bg-white text-green-500 py-2 rounded-lg border border-green-500 hover:bg-green-500 hover:text-white text-center block"
            to="/login"
          >
            Login
          </Link>
          
        )}
      </div>
    </div>
  );
}

export default Card;
