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
      <div className='sticky top-0 bg-red-200'>
        <div className='flex p-5 justify-between items-center'>
          <p>beFoodie</p>
          <ul className='flex list-none gap-10 text-xl text-[#43557e]'>
            <NavLink to="/" className={({ isActive }) => isActive ? "underline decoration-red-500" : ""}>
              Home
            </NavLink>
            {localStorage.getItem("authToken") && (
              <NavLink to="/myorderdata" className={({ isActive }) => isActive ? "underline decoration-red-500" : ""}>
                Orders
              </NavLink>
            )}
            <NavLink to="/about" className={({ isActive }) => isActive ? "underline decoration-red-500" : ""}>
              About
            </NavLink>
          </ul>
          <div className='flex items-center gap-10'>
            {localStorage.getItem("authToken") ? (
              <div className="flex items-center space-x-4">
                <Link to="/cart" className="flex items-center p-[10px_30px] border border-red-500 rounded-[50px] bg-transparent cursor-pointer hover:bg-[#f19282] transition duration-300">
                  <i className="fa-solid fa-cart-shopping mr-2"></i>
                  <span className="fs-5">{data.length}</span>
                </Link>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <button onClick={handleLogout} className="p-[10px_30px] border border-red-500 rounded-[50px] bg-transparent cursor-pointer hover:bg-[#f19282] transition duration-300">
                  LogOut
                </button>
              </div>
            ) : (
              <div className="flex space-x-4">
                <Link onClick={() => setShowLogin(true)} className="p-[10px_30px] border border-red-500 rounded-[50px] bg-transparent cursor-pointer hover:bg-[#f19282] transition duration-300">
                  Login
                </Link>
                {showLogin && (
                  <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='absolute inset-0 backdrop-blur-sm'></div>
                    <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-10 flex flex-col gap-5'>
                      <button className='absolute top-2 right-2' onClick={() => setShowLogin(false)}>
                        <i className="fa-solid fa-xmark"></i>
                      </button>
                      <Login onClose={onClose} onOpen={onOpen} />
                    </div>
                  </div>
                )}
                <Link onClick={()=> setSignup(true)} className="p-[10px_30px] border border-red-500 rounded-[50px] bg-transparent cursor-pointer hover:bg-[#f19282] transition duration-300">
                  SignUp
                </Link>
                {showSignup && (
                  <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
                    <div className='absolute inset-0 backdrop-blur-sm'></div>
                    <div className='relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md mt-10 flex flex-col gap-5'>
                      <button className='absolute top-2 right-2' onClick={() => setSignup(false)}>
                        <i className="fa-solid fa-xmark"></i>
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
    </>
  );
}

export default Header;
