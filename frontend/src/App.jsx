import React, { useEffect } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css'
import Signup from './pages/Signup.jsx';
import MyOrder from './pages/MyOrder.jsx';
import PaymentSuccess from './pages/paymentSuccess.jsx';
import Navbar from './pages/NewHome.jsx';
import About from './pages/About.jsx';
import Cart from './pages/Cart.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUserEmail } from './features/userSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentResult from './pages/PaymentResult.jsx';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const BASE = import.meta.env.VITE_BACKEND_URL;
        const res = await axios.get(`${BASE}/api/me`, { withCredentials: true });
        if (res.data && res.data.success && res.data.user && res.data.user.email) {
          dispatch(setUserEmail(res.data.user.email));
        }
      } catch (err) {
        // no-op
      }
    };
    checkUser();
  }, [dispatch]);

  // ToastContainer placed at app root
  return (
      <Router>
        <div className='app'>
          <Header />
          <ToastContainer position="top-left" />
          <Routes>
            <Route exact path="/payment-result" element={<PaymentResult />} />
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myorderdata' element={<MyOrder />} />
            <Route exact path='/paymentverification' element={<PaymentSuccess/>} />
            <Route exact path='/about' element={<About />}/>
            <Route exact path='/cart' element={<Cart />}/>
            <Route exact path='/navbar' element={<Navbar />}/>
          </Routes>
          <Footer />
        </div>
      </Router>
  );
}

export default App;
