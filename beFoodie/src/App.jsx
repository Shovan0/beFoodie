import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './pages/Signup.jsx';
import MyOrder from './pages/MyOrder.jsx';
import PaymentSuccess from './pages/paymentSuccess.jsx';
import { CartProvider } from './components/ContextReducer.jsx';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/createuser' element={<Signup />} />
            <Route exact path='/myorderdata' element={<MyOrder />} />
            <Route exact path='/paymentverification' element={<PaymentSuccess/>} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
