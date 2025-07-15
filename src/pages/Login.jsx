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
      <div
        ref={modalRef}
        onClick={onClose}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm"
      >
        <form
          onSubmit={handleSubmit}
          onClick={(e) => e.stopPropagation()} // Prevent close on form click
          className="relative bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        >
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500"
          >
            <i className="fa-solid fa-xmark text-xl"></i>
          </button>

          <h2 className="text-2xl font-semibold text-emerald-600 mb-6 text-center">
            Login to beFoodie
          </h2>

          <div className="mb-5">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="mb-6">
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
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-5 py-2 border border-emerald-600 text-emerald-600 rounded-full hover:bg-emerald-50"
            >
              Submit
            </button>
            <Link
              onClick={onOpen}
              className="text-sm text-gray-600 hover:text-emerald-600 hover:underline"
            >
              Don’t have an account?
            </Link>
          </div>
        </form>
      </div>
    </>



  )
}

export default Login