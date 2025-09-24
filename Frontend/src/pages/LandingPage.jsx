import React from "react";
import { useEffect, useState } from "react";
import AOS from "aos";
import 'aos/dist/aos.css';
import "../styles/LandingPage.css";
import Sneaker from '../assets/Images/Air_Jordan.png';
import ProductCard from "../components/ProductCard";
import SneakerBrands from "../components/SneakerBrands";
import { CartState } from "../context/CartProvider";
import { getAllProducts } from "../services/productService";

function LandingPage() {
  const imgUrl = "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/76e54683-5822-464c-a8cf-8b366b629675/AIR+MAX+DN.png";
  
  const {isLoggedIn} = CartState();
  const [products, setProducts] = useState([]);
    useEffect(() => {
      fetchProducts();
    }, []);
  
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
  // console.log("Is user logged in?", isLoggedIn);

  return (
    <>
      <div data-aos="fade-in" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Step Into Your <span className="highlight">Style</span></h1>
            <p>Discover the latest drops, exclusive releases, and timeless classics. Your perfect pair is waiting at SneakHub - where every step tells a story.</p>
            <div className="hero-buttons">
              <a href="#products" className="btn-primary">Shop Now</a>
              <a href="#brands" className="btn-secondary">Explore Brands</a>
            </div>
            <div className="stats">
              <div className="stat">
                <span className="stat-number">500+</span>
                <span className="stat-label">Premium Sneakers</span>
              </div>
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Top Brands</span>
              </div>
              <div className="stat">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="sneaker-showcase">
              <div className="sneaker-card">
                <img src={Sneaker} alt="Sneaker" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="brands" data-aos="fade-up" className="landing-page-products">
        <SneakerBrands />
        <h2 id="products" className="section-title">Featured Products</h2>
        <div className="product-grid-container">
          {/* Product Cards */}
          {products.map((product) => (
            <div
              key={product.id}             
            >
              <ProductCard
                prod={product}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default LandingPage;