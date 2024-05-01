import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function Login() {
const navigate = useNavigate();
  const [details, setDetails] = useState({email: '', password: ''});

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
        navigate("/");
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
    <div className='container'>
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
    </div>
    </>
  )
}

export default Login