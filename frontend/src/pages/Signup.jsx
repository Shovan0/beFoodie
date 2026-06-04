import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openSignup, closeModals } from '../features/modalSlice';
import { toast } from 'react-toastify';

function Signup({onClose , onOpen}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalRef = useRef();
  const formRef = useRef();
  const [mounted, setMounted] = useState(false);
  const [details, setDetails] = useState({ name: '', email: '', password: '', location: '' });
  const BASE = import.meta.env.VITE_BACKEND_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE}/api/createuser`, {
        name: details.name,
        email: details.email,
        password: details.password,
        location: details.location
      });
      
      if (!response.data.success) {
        toast.error('Enter valid credentials');
      } else {
        toast.success('Account created successfully');
        dispatch(closeModals());
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('An error occurred while creating account');
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusableSelector = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        dispatch(closeModals());
      }
      if (e.key === 'Tab') {
        const focusable = formRef.current.querySelectorAll(focusableSelector);
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener('keydown', handleKey);
    setTimeout(() => {
      const firstInput = formRef.current.querySelector('input, button');
      if (firstInput) firstInput.focus();
    }, 0);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [dispatch]);

  return (
    <>
      <div
        ref={modalRef}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-0 sm:p-4"
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="signup-title"
          className={`relative bg-white p-6 sm:p-8 rounded-t-2xl sm:rounded-2xl shadow-xl w-full mx-auto max-w-[95vw] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[550px] min-h-[60vh] sm:min-h-0 max-h-[92vh] sm:max-h-[85vh] overflow-auto transform transition-all duration-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
          <button
            type="button"
            onClick={() => dispatch(closeModals())}
            className="absolute sm:top-3 top-2 sm:right-3 right-3 text-gray-400 hover:text-red-500"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          <h2 className="text-2xl font-semibold text-emerald-600 mb-6 text-center">
            Create Account
          </h2>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={details.name}
              onChange={onChange}
              required
              placeholder="Enter your name"
              className="w-full px-4 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={details.email}
              onChange={onChange}
              required
              placeholder="example@domain.com"
              className="w-full px-4 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
          </div>
      
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={details.password}
              onChange={onChange}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              name="location"
              value={details.location}
              onChange={onChange}
              required
              placeholder="City / Area"
              className="w-full px-4 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
            <button
              type="submit"
              className="w-full sm:w-auto px-5 py-3 h-12 flex items-center justify-center border border-emerald-600 text-emerald-600 rounded-full hover:bg-emerald-50 text-center text-sm"
            >
              Submit
            </button>
            <button
              onClick={() => {
                dispatch(openLogin());
              }}
              className="text-sm text-gray-600 hover:text-emerald-600 hover:underline"
            >
              Already a user?
            </button>
          </div>
        </form>
      </div>
    </>



  );
}

export default Signup;
