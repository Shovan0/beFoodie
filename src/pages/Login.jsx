import React, { useState, useRef } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openSignup, closeModals } from '../features/modalSlice';

function Login() {
  const dispatch = useDispatch();
  const modalRef = useRef();

  const [details, setDetails] = useState({
    email: '',
    password: ''
  });

  const handleOverlayClick = (e) => {
    if (modalRef.current === e.target) {
      dispatch(openLogin(false));
    }
  };

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        email: details.email,
        password: details.password
      });

      if (!response.data.success) {
        alert('Enter valid credentials');
        return;
      }
      
      Cookies.set('authToken', response.data.authToken, { expires: 7 });

      dispatch(closeModals());
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => dispatch(closeModals())}
          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <h2 className="text-2xl font-semibold text-emerald-600 mb-6 text-center">
          Login to beFoodie
        </h2>

        {/* Email Field */}
        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={details.email}
            onChange={handleChange}
            required
            placeholder="example@domain.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Password Field */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={details.password}
            onChange={handleChange}
            required
            placeholder="••••••••"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>

        {/* Submit + Switch to Signup */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="px-5 py-2 border border-emerald-600 text-emerald-600 rounded-full hover:bg-emerald-50"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(openSignup());
            }}
            className="text-sm text-gray-600 hover:text-emerald-600 hover:underline"
          >
            Don’t have an account?
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
