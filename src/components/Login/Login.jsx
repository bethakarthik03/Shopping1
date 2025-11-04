import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../Authcontent'
import './login.css'
import { Link} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Login = () => {
  
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const [errors, setErrors] = useState({});
  const[isSubmitting,setIsSubmitting]=useState(false);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate=()=>{
    let formErrors = {};

        // Email Validation
        if (!email) {
            formErrors.email = 'Email is required';
            toast.error('Email is required');
        } else if (!emailRegex.test(email)) {
            formErrors.email = 'Email address is invalid';
            toast.error('Invalid email address');
        }

        // Password Validation
        if (!password) {
            formErrors.password = 'Password is required';
            toast.error('Password is required');
        } else if (password.length <= 8) {
            formErrors.password = 'Password must be more than 8 characters';
            toast.error('Password must be more than 8 characters');
        }

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
  };

  const handleEmailBlur = () => {
    if (!email) {
      toast.error('Email is required');
    } else if (!emailRegex.test(email)) {
      toast.error('Email address is invalid');
    }
  };

  const handlePasswordBlur = () => {
    if (!password) {
      toast.error('Password is required');
    } else if (password.length <= 8) {
      toast.error('Password must be more than 8 characters');
    }
  };

  const { login } = useAuth();  // ⬅ bring login function from context
    const navigate = useNavigate();
  const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            toast.warning('Please fill both email and password');
            return;
        }

        if (!email.includes('@gmail.com')) {
            toast.warning('Email must be a Gmail address');
            return;
        }


        if (validate()) {
            setIsSubmitting(true);
            console.log('Login data is valid:', { email, password });

            toast.success('Login successful! Redirecting to home...');
            setTimeout(() => {
                login();
                navigate('/home');
                setIsSubmitting(false);
            }, 1500);
        }
        else{
            toast.info('Please correct the errors before submitting');
        }
    };

  return (
    <div className='login-background'>
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} newestOnTop={true} closeOnClick pauseOnHover draggable theme="colored"  />
      <div className='addUser'>
          <h3>Sign In</h3>
          <form className='addUserForm' onSubmit={handleSubmit}>
              <div className="inputGroup">

                  <label htmlFor="email">Email:</label>
                  <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} onBlur={handleEmailBlur} autoComplete='off' placeholder='Enter your email' />

                  {errors.email && <p className="error-text">{errors.email}</p>}
                  <label htmlFor="pass">Password:</label>
                  <input type="password" id='pass' value={password}
                  onChange={(e) => setPassword(e.target.value)} onBlur={handlePasswordBlur} autoComplete='off' placeholder='Enter your password' />
                  {errors.password && <p className="error-text">{errors.password}</p>}
                  <button type="submit" disabled={isSubmitting} className="btn btn-primary">{isSubmitting ? 'Logging In...' : 'Login'}</button>

              </div>
          </form>
          <div className="login">
              <div className="forgot-password">
                  <span>Forgot password</span>
                  <a href="/fpassword">Click here</a>
              </div>
              <Link to="/signup" type="submit" className="btn btn-success mt-3">Sign Up</Link> <br/>
              <Link to="/google-login" type='submit' className="btn btn-primary mt-3">Sign Up with Google</Link>
          </div>
      </div>
    </div>
  )
}

export default Login