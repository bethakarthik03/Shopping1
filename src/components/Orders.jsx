import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTimes, FaBars, FaSearch, FaShoppingBag, FaClipboardList, FaSpinner } from "react-icons/fa";
import { useAuth } from "./Authcontent";
import { useWishlist } from "./WishlistContext";
import { useCartlist } from "./CartlistContext";
import logo from "../Assets/Nykaalogo.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getMyOrders } from "../api/orderApi";

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

const Orders = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { wishlistItems } = useWishlist();
  const { cartlistItems } = useCartlist();
  const { isMobile, isTablet } = useResponsiveStyles();

  const [menuOpen, setMenuOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const wishlistCount = wishlistItems.length;
  const cartlistCount = cartlistItems.length;

  useEffect(() => {
    if (!isAuthenticated) {
      toast.error("Please login to view your orders!");
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [isAuthenticated, navigate]);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const response = await getMyOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to load orders");
    } finally {
      setIsLoading(false);
    }
  };

  const parsePrice = (price) => {
    if (typeof price === 'string') {
      return parseFloat(price.replace(/₹|,/g, "")) || 0;
    }
    return parseFloat(price) || 0;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'paid':
      case 'completed':
        return '#28a745';
      case 'pending':
        return '#ffc107';
      case 'cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

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
          <FaSearch style={{ color: "#0077b6" }} />
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
          <div className="nav-icon-responsive" onClick={() => navigate("/orders")}>
            <FaClipboardList style={{ fontSize: "20px", color: "white" }} />
            
          </div>
        </div>
      </div>

      {/* Orders Section */}
      <div
        style={{
          width: "100%",
          maxWidth: isMobile ? "100%" : isTablet ? "1200px" : "1400px",
          margin: "0 auto",
          padding: isMobile ? "20px 10px" : "40px 20px",
          minHeight: "100vh",
        }}
      >
        <h2
          style={{
            fontSize: isMobile ? "24px" : "32px",
            fontWeight: "700",
            marginBottom: isMobile ? "20px" : "40px",
            textAlign: "center",
            color: "#2c3e50",
          }}
        >
          My Orders
        </h2>

        {isLoading ? (
          <div style={{ textAlign: "center", padding: "50px 20px" }}>
            <FaSpinner className="fa-spin" size={40} color="#0077b6" />
            <p style={{ color: "#666", marginTop: "20px" }}>Loading your orders...</p>
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: "center", padding: "50px 20px" }}>
            <FaShoppingBag size={80} color="#ccc" />
            <h3 style={{ color: "#666", marginTop: "20px" }}>No orders found</h3>
            <p style={{ color: "#999", marginBottom: "30px" }}>You haven't placed any orders yet.</p>
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
              Start Shopping
            </button>
          </div>
        ) : (
          <div>
            {orders.map((order) => (
              <div
                key={order._id}
                style={{
                  background: "white",
                  borderRadius: "20px",
                  padding: isMobile ? "20px" : "30px",
                  marginBottom: "20px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                }}
              >
                {/* Order Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                    gap: "10px",
                  }}
                >
                  <div>
                    <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>
                      Order #{order._id?.slice(-8)}
                    </h3>
                    <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div
                      style={{
                        background: getStatusColor(order.status),
                        color: "white",
                        padding: "5px 15px",
                        borderRadius: "20px",
                        fontSize: "12px",
                        fontWeight: "bold",
                        display: "inline-block",
                        marginBottom: "5px",
                      }}
                    >
                      {order.status || "Pending"}
                    </div>
                    <p style={{ margin: "0", fontWeight: "bold", color: "#0077b6" }}>
                      ₹{parsePrice(order.total).toFixed(2)}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div style={{ marginBottom: "20px" }}>
                  <h4 style={{ marginBottom: "15px", color: "#333" }}>Items Ordered</h4>
                  {order.items?.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 0",
                        borderBottom: index < order.items.length - 1 ? "1px solid #eee" : "none",
                      }}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "8px",
                          objectFit: "cover",
                          marginRight: "15px",
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <h5 style={{ margin: "0 0 5px 0", color: "#333" }}>{item.name}</h5>
                        <p style={{ margin: "0", color: "#666", fontSize: "14px" }}>
                          Size: {item.size || "N/A"} | Qty: {item.quantity}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <p style={{ margin: "0", fontWeight: "bold", color: "#0077b6" }}>
                          ₹{(parsePrice(item.price) * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Shipping Details */}
                {order.shippingDetails && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ marginBottom: "10px", color: "#333" }}>Shipping Address</h4>
                    <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "10px" }}>
                      <p style={{ margin: "0", fontWeight: "bold" }}>{order.shippingDetails.name}</p>
                      <p style={{ margin: "5px 0", color: "#666" }}>{order.shippingDetails.address}</p>
                      <p style={{ margin: "0", color: "#666" }}>Phone: {order.shippingDetails.phone}</p>
                    </div>
                  </div>
                )}

                {/* Payment Info */}
                {order.payment && (
                  <div style={{ marginBottom: "20px" }}>
                    <h4 style={{ marginBottom: "10px", color: "#333" }}>Payment Information</h4>
                    <div style={{ background: "#f8f9fa", padding: "15px", borderRadius: "10px" }}>
                      <p style={{ margin: "0", color: "#666" }}>
                        Payment ID: {order.payment.paymentId || "N/A"}
                      </p>
                      <p style={{ margin: "5px 0", color: "#666" }}>
                        Paid: {order.payment.paid ? "Yes" : "No"}
                      </p>
                      {order.payment.paidAt && (
                        <p style={{ margin: "0", color: "#666" }}>
                          Paid At: {formatDate(order.payment.paidAt)}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", flexWrap: "wrap" }}>
                  <button
                    onClick={() => navigate("/cart")}
                    style={{
                      background: "#0077b6",
                      color: "white",
                      padding: "10px 20px",
                      borderRadius: "25px",
                      border: "none",
                      fontSize: "14px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                    }}
                  >
                    Back to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
