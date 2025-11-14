import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTimes, FaBars, FaSearch, FaShoppingBag } from "react-icons/fa";
import { useAuth } from "./Authcontent";
import { useWishlist } from "./WishlistContext";
import { useCartlist } from "./CartlistContext";
import logo from "../Assets/Nykaalogo.png";

const Cart = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const { wishlistItems } = useWishlist();
  const { cartlistItems, removeFromCartlist } = useCartlist();

  const [menuOpen, setMenuOpen] = useState(false);
  const [quantities, setQuantities] = useState(
    cartlistItems.reduce((acc, item) => {
      acc[item.id] = 1;
      return acc;
    }, {})
  );

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    login();
    navigate("/");
  };

  const parsePrice = (priceString) => parseFloat(priceString.replace(/₹|,/g, ""));

  const handleCheckout = () => {
    navigate("/checkout", { state: { cartlistItems, quantities } });
  };

  const wishlistCount = wishlistItems.length;
  const cartlistCount = cartlistItems.length;

  const increaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 1) + 1,
    }));
  };

  const decreaseQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max((prev[id] || 1) - 1, 1),
    }));
  };

  return (
    <div>
      {/* Navbar */}
      <div className="navbar" style={{ backgroundColor: "#0077b6", padding: "10px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "white", position: "sticky", top: 0, zIndex: 1000 }}>
        <div className="nav-left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src={logo} alt="logo" style={{ width: "80px", height: "auto", borderRadius: "10px" }} />
          <button
            className="hamburger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ background: "none", border: "none", fontSize: "20px", color: "white", cursor: "pointer" }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        <nav>
          <div
            className="side-menu"
            style={{
              position: "fixed",
              top: 0,
              left: menuOpen ? "0" : "-270px",
              width: "250px",
              height: "100vh",
              backgroundColor: "#0077b6",
              paddingTop: "70px",
              paddingLeft: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              transition: "left 0.3s ease-in-out",
              zIndex: 1001,
            }}
          >
            <div
              style={{ color: "#fff", fontSize: "24px", cursor: "pointer", textAlign: "center" }}
              onClick={() => {
                navigate("/home");
                setMenuOpen(false);
              }}
            >
              Home
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  style={{
                    backgroundColor: "#fff",
                    color: "#0077b6",
                    border: "none",
                    padding: "10px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    style={{
                      backgroundColor: "#fff",
                      color: "#0077b6",
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate("/signup")}
                    style={{
                      backgroundColor: "#ffd166",
                      color: "black",
                      border: "none",
                      padding: "10px",
                      borderRadius: "6px",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          {menuOpen && (
            <div
              className="overlay"
              onClick={() => setMenuOpen(false)}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 1000,
              }}
            ></div>
          )}
        </nav>

        <div className="nav-search" style={{ display: "flex", alignItems: "center", gap: "5px", backgroundColor: "white", borderRadius: "20px", padding: "5px 10px" }}>
          <input type="text" placeholder="search products..." style={{ border: "none", outline: "none", width: "180px" }} />
          <FaSearch style={{ color: "#0077b6" }} />
        </div>

        <div className="nav-buttons" style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div onClick={() => navigate("/wishlist")} style={{ position: "relative", cursor: "pointer" }}>
            <FaHeart style={{ fontSize: "20px", color: "white" }} />
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {wishlistCount}
            </span>
          </div>
          <div onClick={() => navigate("/cart")} style={{ position: "relative", cursor: "pointer" }}>
            <FaShoppingBag style={{ fontSize: "20px", color: "white" }} />
            <span
              style={{
                position: "absolute",
                top: "-8px",
                right: "-10px",
                background: "red",
                color: "white",
                borderRadius: "50%",
                padding: "2px 6px",
                fontSize: "12px",
              }}
            >
              {cartlistCount}
            </span>
          </div>
        </div>
      </div>

      {/* Cart Section */}
      <div style={{ width: "100%", maxWidth: "1400px", margin: "0 auto", padding: "40px 20px", minHeight: "100vh" }}>
        <h2 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "40px", textAlign: "center", color: "#2c3e50" }}>
          Your Cart
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "30px" }}>
          {cartlistItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              style={{
                background: "white",
                borderRadius: "20px",
                padding: "25px",
                display: "flex",
                alignItems: "center",
                gap: "20px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{ width: "150px", height: "150px", objectFit: "cover", borderRadius: "15px" }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: "20px", fontWeight: "600", color: "#2c3e50" }}>{item.name}</h3>
                <p style={{ fontSize: "16px", color: "#7f8c8d" }}>Size: {item.selectedSize}</p>
                <p style={{ fontSize: "18px", fontWeight: "700", color: "#e74c3c" }}>
                  Price: ₹{parsePrice(item.price).toFixed(2)}
                </p>

                <div style={{ display: "flex", alignItems: "center", gap: "15px", margin: "10px 0" }}>
                  <button
                    onClick={() => decreaseQuantity(item.id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#0077b6",
                      color: "white",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ fontSize: "18px", fontWeight: "600" }}>{quantities[item.id] || 1}</span>
                  <button
                    onClick={() => increaseQuantity(item.id)}
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      border: "none",
                      background: "#0077b6",
                      color: "white",
                      fontSize: "20px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                <p style={{ fontSize: "18px", fontWeight: "700", color: "#27ae60" }}>
                  Total: ₹{(parsePrice(item.price) * (quantities[item.id] || 1)).toFixed(2)}
                </p>
              </div>

              <button
                onClick={() => removeFromCartlist(item.id)}
                style={{
                  background: "linear-gradient(135deg, #e74c3c, #c0392b)",
                  color: "white",
                  padding: "12px 24px",
                  border: "none",
                  borderRadius: "25px",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "all 0.3s ease",
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {cartlistItems.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "50px" }}>
            <button
              onClick={handleCheckout}
              style={{
                background: "linear-gradient(135deg, #2c3e50, #34495e)",
                color: "white",
                padding: "18px 40px",
                border: "none",
                borderRadius: "30px",
                fontSize: "18px",
                fontWeight: "700",
                cursor: "pointer",
                boxShadow: "0 8px 25px rgba(44, 62, 80, 0.3)",
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;