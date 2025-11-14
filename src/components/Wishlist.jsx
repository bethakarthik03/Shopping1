import React, { useState } from "react";
import { useAuth } from "./Authcontent";
import { useWishlist } from "./WishlistContext";
import { useCartlist } from "./CartlistContext";
import { FaTimes, FaBars, FaSearch, FaHeart, FaShoppingBag } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../Assets/Nykaalogo.png";

const Wishlist = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { cartlistItems, addToCartlist } = useCartlist();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    login();
    navigate("/");
  };

  const wishlistCount = wishlistItems.length;
  const cartlistCount = cartlistItems.length;

  return (
    <div>

      {/* NAVBAR (Copied 100% same from Cart.jsx) */}
      <div
        className="navbar"
        style={{
          backgroundColor: "#0077b6",
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
        }}
      >
        <div
          className="nav-left"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <img
            src={logo}
            alt="logo"
            style={{ width: "80px", height: "auto", borderRadius: "10px" }}
          />

          <button
            className="hamburger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: "none",
              border: "none",
              fontSize: "20px",
              color: "white",
              cursor: "pointer",
            }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* SIDE MENU */}
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
              style={{
                color: "#fff",
                fontSize: "24px",
                cursor: "pointer",
                textAlign: "center",
              }}
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

        {/* SEARCH BAR */}
        <div
          className="nav-search"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "5px",
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "5px 10px",
          }}
        >
          <input
            type="text"
            placeholder="search products..."
            style={{ border: "none", outline: "none", width: "180px" }}
          />
          <FaSearch style={{ color: "#0077b6" }} />
        </div>

        {/* ICON BUTTONS */}
        <div
          className="nav-buttons"
          style={{ display: "flex", alignItems: "center", gap: "20px" }}
        >
          <div
            onClick={() => navigate("/wishlist")}
            style={{ position: "relative", cursor: "pointer" }}
          >
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

          <div
            onClick={() => navigate("/cart")}
            style={{ position: "relative", cursor: "pointer" }}
          >
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

      {/* --- WISHLIST CONTENT --- */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "auto",
          padding: "30px",
        }}
      >
        <h2
          style={{
            fontSize: "28px",
            fontWeight: "bold",
            marginBottom: "25px",
            textAlign: "center",
          }}
        >
          Your WishList
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "20px",
          }}
        >
          {wishlistItems.map((item) => (
            <div
              key={`${item.id}-${item.selectedSize}`}
              style={{
                backgroundColor: "white",
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <img
                src={item.img}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "8px",
                }}
              />

              <h3 style={{ fontSize: "18px", margin: "10px 0" }}>{item.name}</h3>
              <p style={{ margin: "10px 0" }}>Size: {item.selectedSize}</p>

              <button
                style={{
                  padding: "10px 15px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  margin: "5px",
                  fontWeight: "500",
                  backgroundColor: "black",
                  color: "white",
                }}
                onClick={() => {
                  addToCartlist(item);
                  removeFromWishlist(item.id);
                  navigate("/cart");
                }}
              >
                Move to Cart
              </button>

              <button
                style={{
                  padding: "10px 15px",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: "5px",
                  margin: "5px",
                  fontWeight: "500",
                  backgroundColor: "#ff4b4b",
                  color: "white",
                }}
                onClick={() => removeFromWishlist(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;