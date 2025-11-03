import React from 'react'
import { useState } from 'react';
import './home.css'
import {FaSearch,FaTimes,FaBars, FaHeart, FaShoppingBag} from 'react-icons/fa'
import { useAuth } from './Authcontent';
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import logo from '../Assets/Nykaalogo.png'
import fashion from '../Assets/Nykaafashion.png'
import westernWear from '../Assets/westernwear.jpeg'
import iWear from '../Assets/indianwear.jpeg'
import men from '../Assets/men.jpeg'
import kids from '../Assets/kids.jpeg'
import bags from '../Assets/bags.jpeg'
import shoes from '../Assets/shoes.jpeg'
import styli from '../Assets/stylimendark.jpeg'
import campus from '../Assets/campussutra.jpeg'
import garge from '../Assets/gargego.jpeg'
import puma from '../Assets/puma.jpeg'
import mabli from '../Assets/Mabish.webp'
import peach from '../Assets/peachself.jpeg'
import stylum from '../Assets/stylum.webp'
import chaabra from '../Assets/chaabra.webp'
import stylobug from '../Assets/Stylobug.jpeg'
import aj from '../Assets/AjDezines.jpeg'
import bitiya from '../Assets/bitiyabhama.jpeg'
import kisah from '../Assets/Kisah.jpeg'
import bagsstyli from '../Assets/bagsstyli.jpeg'
import bagstommy from '../Assets/bagstommy.jpeg'
import bagszouk from '../Assets/bagszouk.jpeg'
import bagsmouchi from '../Assets/bagsmouchi.jpeg'
import shoescampus from '../Assets/shoescampus.jpeg'
import shoespuma from '../Assets/shoespuma.jpeg'
import shoesredtape from '../Assets/shoesredtape.jpeg'
import shoesreebok from '../Assets/shoesreebok.jpeg'
import { useWishlist } from './WishlistContext';
import { useCartlist } from './CartlistContext';
import Footer from './Footer';
const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated, login, logout } = useAuth();
   const [menuOpen, setMenuOpen] = useState(false);
   const { wishlistItems } = useWishlist();
   const wishlistCount = wishlistItems.length;
   const {cartlistItems} =useCartlist();
   const cartlistCount=cartlistItems.length;
   const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLogin = () => {
    login()
    navigate("/");
  };
  

  return (
    <div>
        <div className="navbar" >
            <div className="nav-left">
                <div className="logo">
                    <img src={logo} alt="logo" />
                 </div>
                <button className="hamburger-button" onClick={() => setMenuOpen(!menuOpen)} >
                {menuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>
            <nav >
            <div className={`side-menu ${menuOpen ? 'open' : ''}`}>
            <div className="menu-item" onClick={() => { scrollToSection('mens-section'); setMenuOpen(false); }} style={{textAlign:'center'}}>Men</div>
            <div className="menu-item" onClick={() => { scrollToSection('women-section'); setMenuOpen(false); }} style={{textAlign:'center'}}>Women</div>
            <div className="menu-item" onClick={() => { scrollToSection('kids-section'); setMenuOpen(false); }} style={{textAlign:'center'}}>Kids</div>
            <div className="menu-item" onClick={() => { scrollToSection('bags-section'); setMenuOpen(false); }} style={{textAlign:'center'}}>Bags</div>

            <div className="menu-item" onClick={() => { scrollToSection('shoes-section'); setMenuOpen(false); }} style={{textAlign:'center'}}>Shoes</div>
            <div className="nav-buttons">
                {isAuthenticated ? (
                    <>
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <div className="menu-item" onClick={handleLogout} >Logout</div>
                    </>
                ):(
                    <>
                        <button onClick={handleLogin} className="login-btn" >Login</button>
                        <button onClick={() => navigate("/signup")} className="signup-btn"  >SignUp</button>
                    </>
                )}
            </div>
        </div>

          {menuOpen && <div className="overlay" onClick={() => setMenuOpen(false)}></div>}
            </nav>
            <div className="nav-search">
                <input type="text" placeholder='search products...' />
                <FaSearch className='search-icon'/>
            </div>
            
            <div className="nav-buttons">
                <div className="icon-btn" onClick={() => navigate("/wishlist")}>
                <FaHeart className="icon" />
                <span className="badge">{wishlistCount}</span>
                </div>
                <div className="icon-btn" onClick={() => navigate("/cart")}>
                <FaShoppingBag className="icon" />
                <span className="badge">{cartlistCount}</span>
            </div>
        </div>
    </div>
        <div className="fashion">
            <img src={fashion} alt="" />
        </div>
        <div className="row">
            <div className="col-3">
                <img src={westernWear} alt="" onClick={(e) => { e.preventDefault(); scrollToSection('women-section'); }} />
                <p>WesternWear</p>
            </div>
            <div className="col-3">
                <img src={iWear} alt="" onClick={(e) => { e.preventDefault(); scrollToSection('women-section'); }}/>
                <p>IndianWear</p>
            </div>
            <div className="col-3">
                <img src={men} alt="" onClick={(e) => { e.preventDefault(); scrollToSection('mens-section'); }}/>
                <p>Men</p>
            </div>
            <div className="col-3">
                <img src={kids} alt="" onClick={(e) => { e.preventDefault(); scrollToSection('kids-section'); }}/>
                <p>Kids</p>
            </div>
            <div className="col-3">
                <img src={bags} alt="" onClick={(e) => { e.preventDefault(); scrollToSection('bags-section'); }}/>
                <p>Bags</p>
            </div>
            <div className="col-3">
                <img src={shoes} alt="" onClick={(e) => { e.preventDefault(); scrollToSection('shoes-section'); }}/>
                <p>Shoes</p>
            </div>
        </div>
        <section id='mens-section' className='mens-section'>
        <div className="container">
            <h1>Men's Collection</h1>
            <div className="row1">
                <Link to='/styli' style={{textDecoration:'none'}}><div className="col-4">
                    <img src={styli} className='img' alt="" />
                    <h4>styli</h4>
                    <p>Men Dark Blue Ballon Fit Dark
                    <br/>
                    <br/>
                    <span>₹1,440 &nbsp; <del>₹1,999</del></span></p>
                </div></Link>
                <Link to='/campus' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={campus} alt="" />
                    <h4>campus sutra    </h4>
                    <p>Men Black Solid Casual Shirt
                    <br/>
                    <br/>
                    <span>₹608 &nbsp; <del>₹1,899</del></span></p>
                </div></Link>
                <Link to='/garage' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={garge} alt="" />
                    <h4>The Indian garage go</h4>
                    <p>Men Slim Fit Multi Striped Full Shirt
                    <br/>
                    <br/>
                    <span>₹753 &nbsp; <del>₹1,749</del></span></p>
                </div></Link>
               <Link to='/puma' style={{textDecoration:'none'}}> <div className="col-4">
                    <img className='img' src={puma} alt="" />
                    <h4>Puma</h4>
                    <p>Smashic Unisex White Sneakers
                    <br/>
                    <br/>
                    <span>₹1,800 &nbsp; <del>₹4,499</del></span></p>
                </div></Link>
                
            </div>
        </div>
        </section>
        <section id='women-section' className='women-section'>
        <div className="container ">
            <h1>Women's Collection</h1>
            <div className="row1">
                <Link to='/mabish' style={{textDecoration:'none'}}><div className="col-4">
                    <img src={mabli} className='img' alt="" />
                    <h4>&nbsp;&nbsp;Mabish By Sonal </h4>
                    <p>Maroon Printed Crop Top
                    <br/>
                    <br/>
                    <span>₹1,976 &nbsp; <del>₹5,199</del></span></p>
                </div></Link>
                <Link to='/libas' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={peach} alt="" />
                    <h4>Libas</h4>
                    <p>Embroidered Peach Kurta and Pant
                    <br/>
                    <br/>
                    <span>₹4,880 &nbsp; <del>₹7,999</del></span></p>
                </div></Link>
                <Link to='/stylum' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={stylum} alt="" />
                    <h4>Stylum</h4>
                    <p>Blue Ajrakh Printed A-Line Kurtha
                    <br/>
                    <br/>
                    <span>₹1,334 &nbsp; <del>₹4,599</del></span></p>
                </div></Link>
                <Link to='/chaabra' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={chaabra} alt="" />
                    <h4>Chhabra 555</h4>
                    <p>Cream Embroidered Flared Crop Top
                    <br/>
                    <br/>
                    <span>₹3,920 &nbsp; <del>₹11,200</del></span></p>
                </div></Link>
            </div>
        </div>
        </section>
        <section id='kids-section' className='kids-section'>
        <div className="container container-kid">
            <h1>Kid's Collection</h1>
            <div className="row1">
                <Link to='/kidsstylo' style={{textDecoration:'none'}}><div className="col-4">
                    <img src={stylobug} className='img' alt="" />
                    <h4>Stylo Bug</h4>
                    <p>Girls kurta & Pant Yellow
                    <br/>
                    <br/>
                    <span>₹1,440 &nbsp; <del>₹3,599</del></span></p>
                </div></Link>
                <Link to='/kidsaj' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={aj} alt="" />
                    <h4>AJ Dezines</h4>
                    <p>Foil Printed Sleeveless Kurta
                    <br/>
                    <br/>
                    <span>₹1,800 &nbsp; <del>₹3,999</del></span></p>
                </div></Link>
                <Link to='/kidsbitiya' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={bitiya} alt="" />
                    <h4>Bitiya By Bhama</h4>
                    <p>Girls Ethnic Yellow Floral Kurta
                    <br/>
                    <br/>
                    <span>₹1,350 &nbsp; <del>₹4,499</del></span></p>
                </div></Link>
                <Link to='/kidskisah' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={kisah} alt="" />
                    <h4>Kisah</h4>
                    <p>Cream Floral Printed Nehru Jacket
                    <br/>
                    <br/>
                    <span>₹1,499 &nbsp; <del>₹3,399</del></span></p>
                </div></Link>
            </div>
        </div>
        </section>
        <section id='bags-section' className='bags-section'>
        <div className="container container-bag">
            <h1>Bag's Collection</h1>
            <div className="row1">
                <Link to='/bagsstyli' style={{textDecoration:'none'}}><div className="col-4">
                    <img src={bagsstyli} className='img' alt="" />
                    <h4>Styli Bag</h4>
                    <p>Mk Print Flap Handbag with Turn Lock Closure
                    <br/>
                    <br/>
                    <span>₹1,332 &nbsp; <del>₹2,049</del></span></p>
                </div></Link>
                <Link to='/bagstommy' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={bagstommy} alt="" />
                    <h4>Tommy Hilfiger</h4>
                    <p>Solid Navy Pu Handbag
                    <br/>
                    <br/>
                    <span>₹4,200 &nbsp; <del>₹5,999</del></span></p>
                </div></Link>
                <Link to='/bagszouk' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={bagszouk} alt="" />
                    <h4>Zouk</h4>
                    <p>Office Bag - Jet Black
                    <br/>
                    <br/>
                    <span>₹4,000 &nbsp; <del>11,420</del></span></p>
                </div></Link>
                <Link to='/bagsmouchi' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={bagsmouchi} alt="" />
                    <h4>Mochi</h4>
                    <p>Women Brown Casual Leather Solid Shoulder Bag
                    <br/>
                    <br/>
                    <span>₹3,894 &nbsp; <del>₹6,490</del></span></p>
                </div></Link>
            </div>
        </div>
        </section>
        <section id='shoes-section' className='shoes-section'>
        <div className="container container-shoe">
            <h1>Shoe's Collection</h1>
            <div className="row1">
                <Link to='/shoescampus' style={{textDecoration:'none'}}><div className="col-4">
                    <img src={shoescampus} className='img' alt="" />
                    <h4>Campus Shoes</h4>
                    <p>Comfortable and stylish campus shoes
                    <br/>
                    <br/>
                    <span>₹1,500 &nbsp; <del>₹2,000</del></span></p>
                </div></Link>
                <Link to='/shoespuma' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={shoespuma} alt="" />
                    <h4>Puma Shoes</h4>
                    <p>High-quality Puma sneakers
                    <br/>
                    <br/>
                    <span>₹2,500 &nbsp; <del>₹3,500</del></span></p>
                </div></Link>
                <Link to='/shoesredtape' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={shoesredtape} alt="" />
                    <h4>Red Tape Shoes</h4>
                    <p>Classic Red Tape formal shoes
                    <br/>
                    <br/>
                    <span>₹1,800 &nbsp; <del>₹2,500</del></span></p>
                </div></Link>
                <Link to='/shoesreebok' style={{textDecoration:'none'}}><div className="col-4">
                    <img className='img' src={shoesreebok} alt="" />
                    <h4>Reebok Shoes</h4>
                    <p>Performance Reebok running shoes
                    <br/>
                    <br/>
                    <span>₹2,200 &nbsp; <del>₹3,000</del></span></p>
                </div></Link>
            </div>
        </div>
        </section>
        <Footer scrollToSection={scrollToSection} />
    </div>


  )
}

export default Home