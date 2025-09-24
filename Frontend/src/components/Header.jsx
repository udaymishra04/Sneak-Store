import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "../styles/Header.css";
import { CartState } from "../context/CartProvider";
import { getAllProducts } from "../services/productService";
import DropDown from "./DropDown";
import AdminHeader from "./AdminHeader";
import SearchBar from "./SearchBar";

function Header() {
  const {
    state: { cart },
    productDispatch,
    isLoggedIn,
    user
  } = CartState();
  const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProducts();
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  // Fetching all the products from the DB
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res);
      console.log("Products fetched:", res);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  console.log("User from header:", user);

  return isLoggedIn && user.role === "admin" ? (
    <AdminHeader />
  ) : (
    <header className="header">
      <nav className="nav">
        <a href="/" className="logo">
          SneakStore
        </a>
        <div className="nav-links">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/shop" className="nav-link">
            Shop
          </Link>
          <Link to="/categories" className="nav-link">
            Categories
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
          <Link to="/contact" className="nav-link">
            Contact
          </Link>
        </div>
        <div className="search-bar">

        <SearchBar products={products} />
        </div>
        <Link to="/cart" className="cart-link">
          <div className="flex justify-content-center align-items-center">
            <AiOutlineShoppingCart size={30} color="white" />
            <span className="cart-badge c-white">{totalItems}</span>
          </div>
        </Link>
        <div className="user-auth">
        {isLoggedIn ? (
          <DropDown />
        ) : (
          <div className="nav-button">
            <Link to="/auth">
              <button className="login-button">Login</button>
              {/* <button className="signup-button">Sign Up</button> */}
            </Link>
          </div>
        )}
        </div>
      </nav>
       <div className="sidebar-container">
      {/* Toggle Button */}
      <button className="sidebar-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Menu</h2>
        <div className="sidebar-list">
          <Link to="/" className="sidebar-item">
            Home
          </Link>
          <Link to="/shop" className="sidebar-item">
            Shop
          </Link>
          <Link to="/categories" className="sidebar-item">
            Categories
          </Link>
          <Link to="/about" className="sidebar-item">
            About
          </Link>
          <Link to="/contact" className="sidebar-item">
            Contact
          </Link>
        </div>
      </div>
    </div>
    </header>
  );
}
export default Header;
