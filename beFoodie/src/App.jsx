import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import './App.css'
// import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
// import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/Signup.jsx';
import MyOrder from './pages/MyOrder.jsx';
import PaymentSuccess from './pages/paymentSuccess.jsx';
import Navbar from './pages/NewHome.jsx';
import About from './pages/About.jsx';
import Cart from './pages/Cart.jsx';
import Header from './components/Header.jsx';
import Footer from './components/Footer.jsx';
import { CartProvider } from './components/ContextReducer.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className='app'>
          <Header />
          <Routes>
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
    </CartProvider>
  );
}

export default App;
