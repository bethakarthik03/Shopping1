import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../Signup/signup.css'
import { useAuth } from "../Authcontent";
import { Link } from 'react-router-dom'
const Signup = () => {
  const [formData,setFormData]=useState({
    fname:"",
    lname:"",
    email:"",
    pass:"",
    cPass:"",

  })
  
  const navigate = useNavigate();
  const[errors,setErrors]=useState({});

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value});
  }
  
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };
  
 const { signup } = useAuth();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!formData.fname.trim()) newErrors.fname = "First name is required";
    if (!formData.lname.trim()) newErrors.lname = "Last name is required";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!validateEmail(formData.email))
      newErrors.email = "Invalid email format";

    if (!formData.pass.trim()) newErrors.pass = "Password is required";
    else if (formData.pass.length < 8)
      newErrors.pass = "Password must be at least 8 characters";

    if (!formData.cPass.trim())
      newErrors.cPass = "Please confirm your password";
    else if (formData.pass !== formData.cPass)
      newErrors.cPass = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      
      alert("Signup Successful!");
      signup();
      setTimeout(() => {
        
        navigate("/home");
      }, 1000);
      console.log("Form Submitted:", formData);
    }
  }
  return (
    <div className='signup-background'>
      <div className='addUser'>
          <h3>Sign Up</h3>
          <form className='addUserForm' onSubmit={handleSubmit}>
              <div className="inputGroup">
                  <label htmlFor="fname">First Name:</label>
                  <input type="text" id='fname' autoComplete='off' value={formData.fname} onChange={handleChange} placeholder='Enter your First name' />
                  {errors.fname && <span className="error">{errors.fname}</span>}
                  <label htmlFor="lname">Last Name:</label>
                  <input type="text" id='lname' autoComplete='off' value={formData.lname} onChange={handleChange} placeholder='Enter your Last name' />
                  {errors.lname && <span className="error">{errors.lname}</span>}
                  <label htmlFor="email">Email:</label>
                  <input type="email" id='email' autoComplete='off' value={formData.email} onChange={handleChange} placeholder='Enter your email' />
                   {errors.email && <span className="error">{errors.email}</span>}
                  <label htmlFor="pass">Password:</label>
                  <input type="password" id='pass' value={formData.pass} onChange={handleChange}  placeholder='Enter your password' />
                  {errors.pass && <span className="error">{errors.pass}</span>}
                  <label htmlFor="cPass">Confirm Password:</label>
                  <input type="password" id='cPass' value={formData.cPass} onChange={handleChange}  placeholder='Enter your confirm password' />
                  {errors.cPass && (
              <span className="error">{errors.cPass}</span>
            )}
                  <button type="submit" class="btn btn-success" >Sign Up</button>
              </div>
          </form>
          <div className="login">
              <p>Already have an account ?</p>
              <Link to="/" type="submit" class="btn btn-primary">Login</Link>
          </div>
      </div>
    </div>
  )
}

export default Signup