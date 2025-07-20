import React, { useEffect, useState } from 'react';
import { Link, useNavigate, NavLink } from 'react-router-dom';
import Modal from '../Modal';
import Cart from '../pages/Cart';
import { openLogin, openSignup, closeModals } from '../features/modalSlice';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import { setCartCount } from '../features/cartSlice'; 


function Header() {
  const dispatch = useDispatch();
  const showLogin = useSelector((state) => state.modal.showLogin);
  const showSignup = useSelector((state) => state.modal.showSignup);
  const cartCount = useSelector((state) => state.cart.count);

  const navigate = useNavigate();
  const [cartView, setCartView] = useState(false);
  const token = Cookies.get('authToken');

  const handleLogout = () => {
    Cookies.remove('authToken');
    navigate("/");
  };

   useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/cartCount", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          dispatch(setCartCount(data.count));  
        } else {
          dispatch(setCartCount(0));         
        }
      } catch (err) {
        console.error("Failed to fetch cart count", err);
        dispatch(setCartCount(0));            
      }
    };

  if (token) fetchCartCount();
}, [token, dispatch]);


  return (
    <>
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-semibold text-emerald-600 tracking-tight">
              beFoodie
            </Link>

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
              {token && (
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

            <div className="flex items-center gap-4">
            {token ? (
              <div className="flex items-center gap-4">
                <Link
                  to="/cart"
                  className="flex items-center gap-2 px-4 py-2 border border-emerald-600 rounded-full text-emerald-600 hover:bg-emerald-50"
                >
                  <i className="fa-solid fa-cart-shopping"></i>
                  <span>{cartCount}</span> 
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
                  {/* Login Button */}
                  <button
                    onClick={() => dispatch(openLogin())}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                  >
                    Login
                  </button>

                  {showLogin && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
                    onClick={() => {dispatch(closeModals())}}
                    >
                      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                          onClick={() => dispatch(closeModals())}
                        >
                          <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                        <Login
                          onClose={() => dispatch(closeModals())}
                          onOpen={() => dispatch(openSignup())}
                        />
                      </div>
                    </div>
                  )}

                  {/* Signup Button */}
                  <button
                    onClick={() => dispatch(openSignup())}
                    className="px-4 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100"
                  >
                    Sign Up
                  </button>

                  {showSignup && (
                    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center"
                    onClick={() => {dispatch(closeModals())}}
                    >
                      <div className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-md">
                        <button
                          className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
                          onClick={() => dispatch(closeModals())}
                        >
                          <i className="fa-solid fa-xmark text-xl"></i>
                        </button>
                        <Signup
                          onClose={() => dispatch(closeModals())}
                          onOpen={() => dispatch(openLogin())}
                        />
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
