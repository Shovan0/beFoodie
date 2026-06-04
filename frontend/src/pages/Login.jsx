import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { openLogin, openSignup, closeModals } from '../features/modalSlice';
import { toast } from 'react-toastify';
import { setUserEmail } from '../features/userSlice';

function Login() {
  const dispatch = useDispatch();
  const modalRef = useRef();
  const formRef = useRef();
  const [mounted, setMounted] = useState(false);
  const BASE = import.meta.env.VITE_BACKEND_URL;

  const [details, setDetails] = useState({
    email: '',
    password: ''
  });

  const handleOverlayClick = (e) => {
    if (modalRef.current === e.target) {
      dispatch(openLogin(false));
    }
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

    // set initial focus
    setTimeout(() => {
      const firstInput = formRef.current.querySelector('input, button');
      if (firstInput) firstInput.focus();
    }, 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', handleKey);
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${BASE}/api/login`, {
        email: details.email,
        password: details.password
      }, { withCredentials: true });

      if (!response.data.success) {
        toast.error('Enter valid credentials');
        return;
      }

      // Retrieve current user info from server (cookie-based auth)
      const me = await axios.get(`${BASE}/api/me`, { withCredentials: true });
      if (me.data && me.data.success && me.data.user && me.data.user.email) {
        dispatch(setUserEmail(me.data.user.email));
      }

      toast.success('Logged in successfully');
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
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm p-0 sm:p-4"
      >
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="login-title"
          className={`relative bg-white p-6 sm:p-8 rounded-t-2xl sm:rounded-2xl shadow-xl w-full mx-auto max-w-[95vw] sm:max-w-[480px] md:max-w-[520px] lg:max-w-[550px] min-h-[60vh] sm:min-h-0 max-h-[92vh] sm:max-h-[85vh] overflow-auto transform transition-all duration-200 ${mounted ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => dispatch(closeModals())}
          className="absolute sm:top-3 top-2 sm:right-3 right-3 text-gray-400 hover:text-red-500"
        >
          <i className="fa-solid fa-xmark text-xl"></i>
        </button>

        <h2 id="login-title" className="text-2xl font-semibold text-emerald-600 mb-6 text-center">
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
            className="w-full px-4 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
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
            className="w-full px-4 py-3 h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400 text-sm"
          />
        </div>

        {/* Submit + Switch to Signup */}
        <div className="flex flex-col sm:flex-row items-center sm:justify-between gap-3">
          <button
            type="submit"
            className="w-full sm:w-auto px-5 py-3 h-12 flex items-center justify-center border border-emerald-600 text-emerald-600 rounded-full hover:bg-emerald-50 text-center text-sm"
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
