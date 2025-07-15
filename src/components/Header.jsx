import React, { useState, useRef } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { useCart } from './ContextReducer';
import Login from '../pages/Login';
import Signup from '../pages/Signup';

function Header() {
  const navigate = useNavigate();
  let data = useCart();
  const [cartView, setCartView] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setSignup] = useState(false);

  const onOpen = ()=> {
    setSignup(!showSignup);
    setShowLogin(!showLogin)
  }
  const onClose = ()=>{
    setSignup(false);
    setShowLogin(false);
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to="/" className="text-2xl font-semibold text-emerald-600 tracking-tight">
              beFoodie
            </Link>
      
            {/* Nav Links */}
            <nav className="flex gap-8 text-base font-medium text-gray-700">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-1"
                    : "hover:text-emerald-600"
                }
              >
                Home
              </NavLink>
              {localStorage.getItem("authToken") && (
                <NavLink
                  to="/myorderdata"
                  className={({ isActive }) =>
                    isActive
                      ? "text-emerald-600 border-b-2 border-emerald-600 pb-1"
                      : "hover:text-emerald-600"
                  }
                >
                  Orders
                </NavLink>
              )}
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive
                    ? "text-emerald-600 border-b-2 border-emerald-600 pb-1"
                    : "hover:text-emerald-600"
                }
              >
                About
              </NavLink>
            </nav>
              
            {/* Auth & Cart */}
            <div className="flex items-center gap-4">
              {localStorage.getItem("authToken") ? (
                <div className="flex items-center gap-4">
                  <Link
                    to="/cart"
                    className="flex items-center gap-2 px-4 py-2 border border-emerald-600 rounded-full text-emerald-600 hover:bg-emerald-50"
                  >
                    <i className="fa-solid fa-cart-shopping"></i>
                    <span>{data.length}</span>
                  </Link>
              
                  {cartView && (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart />
                    </Modal>
                  )}
    
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowLogin(true)}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </button>
                  {showLogin && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                          onClick={() => setShowLogin(false)}
                        >
                          <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                        <Login onClose={onClose} onOpen={onOpen} />
                      </div>
                    </div>
                  )}
    
                  <button
                    onClick={() => setSignup(true)}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                  >
                    Sign Up
                  </button>
                  {showSignup && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
                      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                          onClick={() => setSignup(false)}
                        >
                          <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                        <Signup onClose={onClose} onOpen={onOpen} />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>



  );
}

export default Header;
