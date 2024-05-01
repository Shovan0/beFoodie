import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const navigate = useNavigate();
  const [details, setDetails] = useState({ name: '', email: '', password: '', location: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/createuser", {
        name: details.name,
        email: details.email,
        password: details.password,
        location: details.location
      });
      console.log(response.data);
      if (!response.data.success) {
        alert("Enter valid credentials");
      }
      else {
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
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input type="text" name='name' value={details.name} onChange={onChange} className="form-control" placeholder="Enter name" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Email</label>
          <input type="email" name='email' value={details.email} onChange={onChange} className="form-control" placeholder="Email" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input type="password" name='password' value={details.password} onChange={onChange} className="form-control" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Location</label>
          <input type="text" name='location' value={details.location} onChange={onChange} className="form-control" placeholder="Location" />
        </div>
        <div>
          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <a href="/login" className='m-3'>Already a User ??</a>
        </div>
        
      </form>
    </div>
  );
}

export default Signup;
