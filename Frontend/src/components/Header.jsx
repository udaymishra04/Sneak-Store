import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from "react-icons/ai";
import '../styles/Header.css';
import { CartState } from '../context/CartProvider';

function Header() {
  const { state: { cart } } = CartState();
  console.log(cart);
const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <header className="header">
      <nav className="nav">
        <a href="/" className="logo">SneakStore</a>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/shop" className="nav-link">Shop</Link>
          <Link to="/categories" className="nav-link">Categories</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </div>
        <input type="text" className="search-bar" placeholder="Search for sneakers..." />
        <div className='flex justify-content-center align-items-center'>
          <AiOutlineShoppingCart size={30} color='white' />
          <span className="cart-badge c-white">{totalItems}</span>
        </div>
        <div className="nav-button">
          <button className="login-button">Login</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </nav>
    </header>
  )
}
export default Header;