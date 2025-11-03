import React, { useState } from 'react';
import { FaSearch, FaTimes, FaBars, FaHeart, FaShoppingBag } from 'react-icons/fa';
import { useAuth } from './Authcontent';
import { useWishlist } from './WishlistContext';
import { useCartlist } from './CartlistContext';
import { useNavigate } from 'react-router-dom';
import logo from '../Assets/Nykaalogo.png';
import './styli.css';

const ProductPage = ({
  product,
  mainImage,
  thumbnails,
  tag,
  title,
  rating,
  reviews,
  price,
  discount,
  sizes = []
}) => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
  const { addToWishlist, wishlistItems } = useWishlist();
  const { addToCartlist, cartlistItems } = useCartlist();
  const wishlistCount = wishlistItems.length;
  const cartlistCount = cartlistItems.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentMainImage, setCurrentMainImage] = useState(mainImage);

  const handleAddToWishlist = () => {
    if (sizes.length > 0 && !selectedSize) {
      alert('Please select a size before adding to wishlist.');
      return;
    }
    const itemWithSize = sizes.length > 0 ? { ...product, selectedSize } : product;
    addToWishlist(itemWithSize);
    navigate('/wishlist');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLogin = () => {
    login();
    navigate('/');
  };

  return (
    <div>
      <div className="navbar">
        <div className="nav-left">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <button
            className="hamburger-button"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ backgroundColor: 'transparent' }}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        <nav>
          <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
            <div className="menu-item" onClick={() => { navigate('/home'); setMenuOpen(false); }} style={{textAlign:'center'}}>Home</div>
            <div className="nav-buttons">
              {isAuthenticated ? (
                <>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div className='menu-item' onClick={handleLogout} >Logout</div>
                </>
              ):(
                <>
                  <button onClick={handleLogin} className="login-btn">Login</button>
                  <button onClick={() => navigate("/signup")} className="signup-btn">SignUp</button>
                </>
              )}
              </div>
          </div>
          {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
        </nav>
        <div className="nav-search">
          <input type="text" placeholder="search products..." />
          <FaSearch className="search-icon" />
        </div>
        <div className="nav-buttons">
          <div className="icon-btn" onClick={() => navigate('/wishlist')}>
            <FaHeart className="icon" />
            <span className="badge">{wishlistCount}</span>
          </div>
          <div className="icon-btn" onClick={() => navigate('/cart')}>
            <FaShoppingBag className="icon" />
            <span className="badge">{cartlistCount}</span>
          </div>
        </div>
      </div>
      <div className="product-container">
        <div className="product-images">
          <div className="thumbnail-gallery">
            {thumbnails.map((thumb, index) => (
              <img key={index} src={thumb} alt={title} onClick={() => setCurrentMainImage(thumb)} style={{ cursor: 'pointer' }} />
            ))}
          </div>
          <div className="main-image">
            <img src={currentMainImage} alt={title} />
          </div>
        </div>
        <div className="product-details">
          <p className="tag">{tag}</p>
          <h2 className="product-title">{title}</h2>
          <div className="rating-section">
            <span className="rating">{rating}</span>
            <span className="reviews">{reviews}</span>
          </div>
          <div className="price-box">
            <span className="price">{price}</span> &nbsp; &nbsp;
            <span className="discount">{discount}</span>
          </div>
          {sizes.length > 0 && (
            <div className="size-section">
              <h4>Select Size</h4>
              {sizes.map((size, index) => (
                <button
                  key={index}
                  className={selectedSize === size ? 'selected' : ''}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          )}
          <div className="action-buttons">
            <button className="wishlist-btn" onClick={handleAddToWishlist}>
              ♡ Add to Wishlist
            </button>
            <button className="bag-btn" onClick={() => {
              if (sizes.length > 0 && !selectedSize) {
                alert('Please select a size before adding to cart.');
                return;
              }
              const itemWithSize = sizes.length > 0 ? { ...product, selectedSize } : product;
              addToCartlist(itemWithSize);
            }}>
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
