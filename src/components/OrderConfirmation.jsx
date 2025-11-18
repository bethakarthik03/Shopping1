import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaTimes, FaBars, FaHeart, FaShoppingBag } from "react-icons/fa";
import { useAuth } from "./Authcontent";
import { useWishlist } from "./WishlistContext";
import { useCartlist } from "./CartlistContext";
import logo from "../Assets/Nykaalogo.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Responsive hook
const useResponsiveStyles = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth > 768 && window.innerWidth <= 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsTablet(window.innerWidth > 768 && window.innerWidth <= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isTablet };
};

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { wishlistItems } = useWishlist();
  const { cartlistItems } = useCartlist();
  const { isMobile, isTablet } = useResponsiveStyles();

  const [menuOpen, setMenuOpen] = useState(false);

  const orderData = location.state?.orderData;
  const paymentId = location.state?.paymentId;

  const wishlistCount = wishlistItems.length;
  const cartlistCount = cartlistItems.length;

  if (!orderData) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <h2>Order Not Found</h2>
        <button onClick={() => navigate("/home")}>Go to Home</button>
      </div>
    );
  }

  return (
    <div>
      <ToastContainer theme="colored" />

      {/* Navbar */}
      <div className="navbar-responsive">
        <div className="nav-left-responsive">
          <img src={logo} alt="logo" className="nav-logo-responsive" onClick={() => navigate("/home")} />
          <button className="hamburger-button-responsive" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav>
          <div className={`side-menu-responsive ${menuOpen ? "side-menu-open" : ""}`}>
            <div
              style={{ color: "#fff", fontSize: "24px", cursor: "pointer", textAlign: "center" }}
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
            >
              Home
            </div>
          </div>

          {menuOpen && <div className="overlay-responsive" onClick={() => setMenuOpen(false)}></div>}
        </nav>

        <div className="nav-search-responsive">
          <input type="text" placeholder="search products..." className="nav-search-input" />
        </div>

        <div className="nav-buttons-responsive">
          <div className="nav-icon-responsive" onClick={() => navigate("/wishlist")}>
            <FaHeart style={{ fontSize: "20px", color: "white" }} />
            <span className="nav-icon-badge">{wishlistCount}</span>
          </div>
          <div className="nav-icon-responsive" onClick={() => navigate("/cart")}>
            <FaShoppingBag style={{ fontSize: "20px", color: "white" }} />
            <span className="nav-icon-badge">{cartlistCount}</span>
          </div>
        </div>
      </div>

      {/* Order Confirmation */}
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : isTablet ? "1200px" : "1400px",
          margin: "0 auto",
          padding: isMobile ? "20px 10px" : "40px 20px",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            textAlign: "center",
            background: "white",
            borderRadius: "20px",
            padding: isMobile ? "30px 20px" : "50px 40px",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <FaCheckCircle style={{ fontSize: "80px", color: "#28a745", marginBottom: "20px" }} />
          <h1 style={{ color: "#28a745", marginBottom: "10px" }}>Order Confirmed!</h1>
          <p style={{ fontSize: "18px", color: "#666", marginBottom: "30px" }}>
            Thank you for your purchase. Your order has been successfully placed.
          </p>

          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>Order Details</h3>
            <p><strong>Order ID:</strong> {orderData._id}</p>
            <p><strong>Payment ID:</strong> {paymentId || "N/A"}</p>
            <p><strong>Total Amount:</strong> ₹{orderData.total}</p>
            <p><strong>Status:</strong> {orderData.status}</p>
          </div>

          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>Shipping Details</h3>
            <p><strong>Name:</strong> {orderData.shippingDetails?.name}</p>
            <p><strong>Address:</strong> {orderData.shippingDetails?.address}</p>
            <p><strong>Phone:</strong> {orderData.shippingDetails?.phone}</p>
          </div>

          <div style={{ background: "#f8f9fa", padding: "20px", borderRadius: "10px", marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "15px", color: "#333" }}>Items Ordered</h3>
            {orderData.items?.map((item, index) => (
              <div key={index} style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                <span>{item.name} (x{item.quantity})</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: "15px", justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => navigate("/home")}
              style={{
                background: "#0077b6",
                color: "white",
                padding: "12px 30px",
                borderRadius: "25px",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
            >
              Continue Shopping
            </button>
            {isAuthenticated && (
              <button
                onClick={() => navigate("/orders")}
                style={{
                  background: "#28a745",
                  color: "white",
                  padding: "12px 30px",
                  borderRadius: "25px",
                  border: "none",
                  fontSize: "16px",
                  cursor: "pointer",
                }}
              >
                View My Orders
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
