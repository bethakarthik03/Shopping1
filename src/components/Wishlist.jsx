import React, { useState } from "react";
import { useAuth } from "./Authcontent";
import { useWishlist } from "./WishlistContext";
import { useCartlist } from "./CartlistContext";
import { FaTimes, FaBars, FaSearch, FaHeart, FaClipboardList, FaShoppingBag } from "react-icons/fa";
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
      {/* NAVBAR */}
      <div className="navbar-responsive">
        <div className="nav-left-responsive">
          <img src={logo} alt="logo" className="nav-logo-responsive" />
          <button
            className="hamburger-button-responsive"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* SIDE MENU */}
        <nav>
          <div className={`side-menu-responsive ${menuOpen ? 'side-menu-open' : ''}`}>
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

          {menuOpen && <div className="overlay-responsive" onClick={() => setMenuOpen(false)}></div>}
        </nav>

        {/* SEARCH BAR */}
        <div className="nav-search-responsive">
          <input
            type="text"
            placeholder="search products..."
            className="nav-search-input"
          />
          <FaSearch style={{ color: "#0077b6" }} />
        </div>

        {/* ICON BUTTONS */}
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

      {/* --- WISHLIST CONTENT --- */}
      <div className="wishlist-content-responsive">
        <h2 className="wishlist-title-responsive">Your WishList</h2>

        <div className="wishlist-grid-responsive">
          {wishlistItems.map((item) => (
            <div key={`${item.id}-${item.selectedSize}`} className="wishlist-item-responsive">
              <img src={item.img} alt={item.name} className="wishlist-item-img" />

              <h3 className="wishlist-item-name">{item.name}</h3>
              <p className="wishlist-item-size">Size: {item.selectedSize}</p>

              <button
                className="wishlist-item-btn"
                style={{ backgroundColor: "black", color: "white" }}
                onClick={() => {
                  addToCartlist(item);
                  removeFromWishlist(item.id);
                  navigate("/cart");
                }}
              >
                Move to Cart
              </button>

              <button
                className="wishlist-item-btn"
                style={{ backgroundColor: "#ff4b4b", color: "white" }}
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