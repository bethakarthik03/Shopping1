import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../Authcontent";
import { ToastContainer, toast } from "react-toastify";
import bgImage from "../../Assets/backgroundimage.jpg";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const { login } = useAuth();
  const navigate = useNavigate();

  // Responsive listener
  useEffect(() => {
    const resizeHandler = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  // Dynamic responsive width for login box
  const getResponsiveWidth = () => {
    if (windowWidth < 480) return "95%";
    if (windowWidth < 768) return "90%";
    if (windowWidth < 1024) return "40%";
    return "25%";
  };

  const styles = {
    background: {
      backgroundImage: `url(${bgImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },

    card: {
      width: getResponsiveWidth(),
      background: "white",
      padding: windowWidth < 480 ? "20px" : "40px",
      borderRadius: "10px",
      boxShadow: "1px 1px 8px rgba(0,0,0,0.065)",
    },

    title: {
      textAlign: "center",
      fontWeight: "bold",
      color: "darkcyan",
      textTransform: "uppercase",
      textShadow: "1px 1px 2px rgba(0,0,0,0.7)",
      marginBottom: "20px",
      fontSize:
        windowWidth < 480
          ? "18px"
          : windowWidth < 768
          ? "20px"
          : windowWidth < 1024
          ? "22px"
          : "24px",
    },

    inputGroup: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
    },

    label: {
      marginTop: "10px",
      fontSize: windowWidth < 480 ? "14px" : "16px",
    },

    input: {
      marginTop: "5px",
      padding: windowWidth < 480 ? "12px" : "10px",
      fontSize: windowWidth < 480 ? "15px" : "16px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      outline: "none",
    },

    primaryBtn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#0077b6",
      border: "none",
      borderRadius: "10px",
      color: "#fff",
      fontSize: "17px",
      fontWeight: "600",
      cursor: "pointer",
      marginTop: "25px",
      transition: "0.3s ease-in-out",
      boxShadow: "0 4px 12px rgba(0,119,182,0.3)",
    },

    successBtn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#06d6a0",
      border: "none",
      borderRadius: "10px",
      color: "white",
      fontSize: "17px",
      fontWeight: "600",
      marginTop: "30px",
      cursor: "pointer",
      transition: "0.3s ease-in-out",
      boxShadow: "0 4px 12px rgba(6,214,160,0.3)",
      textDecoration: "none",
      display: "block",
      textAlign: "center",
    },

    googleBtn: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#4285F4",
      border: "none",
      borderRadius: "10px",
      color: "white",
      fontSize: "17px",
      fontWeight: "600",
      marginTop: "15px",
      cursor: "pointer",
      textDecoration: "none",
      display: "block",
      textAlign: "center",
    },

    forgotPassword: {
      display: "flex",
      justifyContent: "center",
      gap: "5px",
      fontSize: windowWidth < 480 ? "12px" : "14px",
      marginTop: "20px",
    },

    errorText: {
      color: "red",
      fontSize: "14px",
      marginTop: "5px",
    },
  };

  const validate = () => {
    let formErrors = {};

    if (!email) {
      formErrors.email = "Email is required";
      toast.error("Email is required");
    } else if (!emailRegex.test(email)) {
      formErrors.email = "Invalid email address";
      toast.error("Invalid email");
    }

    if (!password) {
      formErrors.password = "Password is required";
      toast.error("Password is required");
    } else if (password.length <= 8) {
      formErrors.password = "Password must be more than 8 characters";
      toast.error("Password must be more than 8 characters");
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Please fill both email and password");
      return;
    }

    if (!email.includes("@gmail.com")) {
      toast.warning("Email must be a Gmail address");
      return;
    }

    if (validate()) {
      setIsSubmitting(true);
      toast.success("Login successful! Redirecting...");
      setTimeout(() => {
        login();
        navigate("/home");
        setIsSubmitting(false);
      }, 1500);
    }
  };

  return (
    <div style={styles.background}>
      <ToastContainer theme="colored" />

      <div style={styles.card}>
        <h3 style={styles.title}>Sign In</h3>

        <form onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email:</label>
            <input
              type="email"
              style={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p style={styles.errorText}>{errors.email}</p>}

            <label style={styles.label}>Password:</label>
            <input
              type="password"
              style={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <p style={styles.errorText}>{errors.password}</p>
            )}

            <button type="submit" style={styles.primaryBtn}>
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <div style={styles.forgotPassword}>
          <span>Forgot Password?</span>
          <a href="/fpassword" style={{ color: "#0077b6" }}>
            Click here
          </a>
        </div>

        <Link to="/signup" style={styles.successBtn}>
          Sign Up
        </Link>

        <Link to="/google-login" style={styles.googleBtn}>
          Sign Up with Google
        </Link>
      </div>
    </div>
  );
};

export default Login;