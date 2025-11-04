import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Signup/signup.css'
import { useAuth } from "../Authcontent";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    pass: "",
    cPass: "",
  })

  const navigate = useNavigate();
  const { signup } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  }

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fname.trim()) {
      toast.error('First name is required');
      return;
    }

    if (!formData.lname.trim()) {
      toast.error('Last name is required');
      return;
    }

    if (!formData.email.trim()) {
      toast.error('Email is required');
      return;
    }

    if (!validateEmail(formData.email)) {
      toast.error('Invalid email format');
      return;
    }

    if (!formData.pass.trim()) {
      toast.error('Password is required');
      return;
    }

    if (formData.pass.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }

    if (!formData.cPass.trim()) {
      toast.error('Please confirm your password');
      return;
    }

    if (formData.pass !== formData.cPass) {
      toast.error('Passwords do not match');
      return;
    }

    toast.success("Signup Successful!");
    signup();
    setTimeout(() => {
      navigate("/");
    }, 1500);
    console.log("Form Submitted:", formData);
  }

  return (
    <div className='signup-background'>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover draggable theme="colored" />
      <div className='addUser'>
        <h3>Sign Up</h3>
        <form className='addUserForm' onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label htmlFor="fname">First Name:</label>
            <input type="text" id='fname' autoComplete='off' value={formData.fname} onChange={handleChange} placeholder='Enter your First name' />

            <label htmlFor="lname">Last Name:</label>
            <input type="text" id='lname' autoComplete='off' value={formData.lname} onChange={handleChange} placeholder='Enter your Last name' />

            <label htmlFor="email">Email:</label>
            <input type="email" id='email' autoComplete='off' value={formData.email} onChange={handleChange} placeholder='Enter your email' />

            <label htmlFor="pass">Password:</label>
            <input type="password" id='pass' value={formData.pass} onChange={handleChange} placeholder='Enter your password' />

            <label htmlFor="cPass">Confirm Password:</label>
            <input type="password" id='cPass' value={formData.cPass} onChange={handleChange} placeholder='Enter your confirm password' />

            <button type="submit" className="btn btn-success">Sign Up</button>
          </div>
        </form>
        <div className="login">
          <p>Already have an account ?</p>
          <Link to="/" className="btn btn-primary">Login</Link>
        </div>
      </div>
    </div>
  )
}

export default Signup
