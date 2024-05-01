import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Modal from '../Modal'
import Cart from '../pages/Cart'
import {useCart} from './ContextReducer'

function Header() {
  const navigate = useNavigate();
  let data = useCart()
  const [cartView, setCartView] = useState(false)

  const handleLogout = ()=>{
    localStorage.removeItem("authToken")
    navigate("/createuser")
  }
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">beFoodie</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse d-flex justify-content-between" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
              </li>
              {(localStorage.getItem("authToken"))?
              <li className="nav-item">
                <Link className="nav-link active fs-5" aria-current="page" to="/myorderdata">My Orders</Link>
              </li>
              :""
              }
            </ul>
            <ul> 
              <div className='d-flex mt-2'>
                {(localStorage.getItem("authToken"))?
                <div>
                  <div className="btn bg-white text-success mx-1" onClick={()=>{setCartView(true)}}>
                    My Cart {" "}
                    <span className='fs-5'>{data.length}</span>
                  </div>
                  {cartView? <Modal onClose={()=>setCartView(false)}><Cart/></Modal> :
                  null
                  }
                  <Link className="btn bg-danger text-white mx-1" onClick={handleLogout}>Logout</Link>
                </div>
                  : 
                  <div>
                    <Link className="btn bg-white text-success mx-1" to="/login">Login</Link>
                    <Link className="btn bg-white text-success mx-1" to="/createuser">SignUp</Link>
                  </div>
              }
              </div>
            </ul>
          </div>
          <div>
            
         {/* <form class="form-inline d-flex" style={{zIndex:"10"}}>
           <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
           <button class="btn btn-outline-success my-2 my-sm-0 background-transparant text-white" type="submit">Search</button>
         </form> */}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header