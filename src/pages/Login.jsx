import React, {useState, useRef} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';

function Login({onClose, onOpen}) {
const navigate = useNavigate();
  const [details, setDetails] = useState({email: '', password: ''});

  const modalRef = useRef();

  const closeModal = (e)=>{
    if(modalRef.current === e.target) {
      onClose();
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: details.email,
        password: details.password
      });
      console.log(response.data);
      if (!response.data.success) {
        alert("Enter valid credentials");
      }
      if(response.data.success)  {
        localStorage.setItem("userEmail", details.email)
        localStorage.setItem("authToken", response.authToken);
        onClose();
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting the form");
    }
  };

  const onChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };
  return (
    <>
    <div ref={modalRef} onClick={closeModal} className="flex justify-center items-center bg-red-100">
      <form onSubmit={handleSubmit} className="bg-red-200 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="mb-6">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-red-700">Email</label>
          <input type="email" name="email" value={details.email} onChange={onChange} className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Email" />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-red-700">Password</label>
          <input type="password" name="password" value={details.password} onChange={onChange} className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500" placeholder="Password" />
        </div>
        <div className="flex items-center justify-between">
          <button type="submit" className="p-[10px_30px] border border-red-500 rounded-[50px] bg-transparent cursor-pointer hover:bg-[#f19282] transition duration-300">Submit</button>
          <Link onClick={onOpen} className="text-md text-black hover:underline">Don't have an account?</Link>
        </div>
      </form>
    </div>


    {/* <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Email</label>
          <input type="email" name='email' value={details.email} onChange={onChange} className="form-control" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name='password' value={details.password} onChange={onChange} className="form-control" placeholder="Password" />
        </div>
        <div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <a href="/createuser" className='m-3'>Not have an account??</a>
        </div>
      </form>
    </div> */}
    </>
  )
}

export default Login