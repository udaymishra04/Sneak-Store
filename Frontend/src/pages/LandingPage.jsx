import React from "react";
import 'aos/dist/aos.css';
import "../styles/LandingPage.css";
import Sneaker from '../assets/Images/Air_Jordan.png';
import ProductCard from "../components/ProductCard";
import SneakerBrands from "../components/SneakerBrands";
import { CartState } from "../context/CartProvider";

function LandingPage() {
  const imgUrl = "https://static.nike.com/a/images/t_PDP_936_v1/f_auto,q_auto:eco/76e54683-5822-464c-a8cf-8b366b629675/AIR+MAX+DN.png";
  
  const {state} = CartState();
  console.log(state);


  return (
    <>
      <div data-aos="fade-in" className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Step Into Your <span className="highlight">Style</span></h1>
            <p>Discover the latest drops, exclusive releases, and timeless classics. Your perfect pair is waiting at SneakHub - where every step tells a story.</p>
            <div className="hero-buttons">
              <a href="#categories" className="btn-primary">Shop Now</a>
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
      <div data-aos="fade-up" className="landing-page-products">
        <SneakerBrands />
        <h2 className="section-title">Featured Products</h2>
        <div className="product-grid-container">
          {/* Product Cards */}
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
          <ProductCard image={imgUrl} name="Air Jordan 1" price="150" rating="4" />
        </div>
      </div>
    </>
  );
}
export default LandingPage;