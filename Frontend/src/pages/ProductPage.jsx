import React, { useState, useEffect } from "react";
import { CartState } from "../context/CartProvider";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import {
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Zap
} from "lucide-react";
import "../styles/ProductPage.css";
// import { set } from 'mongoose';

const ProductPage = () => {
  const {
    state: { cart },
    dispatch,
    user,
    isLoggedIn
  } = CartState();

  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchProduct();
  }, []);

  // Fetching all the products from the DB
  const fetchProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res);
      console.log("Products fetched:", res);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const incQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  // TODO: Replace with actual API call to fetch product data
  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await fetch(`/api/products/${productId}`);
  //       const data = await response.json();
  //       setProduct(data);
  //     } catch (error) {
  //       console.error('Error fetching product:', error);
  //     }
  //   };
  //   fetchProduct();
  // }, [productId]);

  // TODO: Replace with actual API call to add product to cart
  const handleAddToCart = async () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { ...product, qty: quantity }
    });
    // const cartItem = {
    //   productId: product._id,
    //   name: product.name,
    //   price: product.price,
    //   quantity: quantity,
    //   image: product.images[0]
    // };

    // try {
    //   // TODO: Replace with actual API call
    //   // await fetch('/api/cart', {
    //   //   method: 'POST',
    //   //   headers: { 'Content-Type': 'application/json' },
    //   //   body: JSON.stringify(cartItem)
    //   // });

    //   console.log('ADD TO CART API CALL:', cartItem);
    //   alert('Product added to cart successfully!');
    // } catch (error) {
    //   console.error('Error adding to cart:', error);
    //   alert('Error adding product to cart. Please try again.');
    // }
  };

  return (
    <div className="product-page">
      {/* Main Content */}
      {!product ? (
        <p>Loading product...</p>
      ) : (
        <div className="product-page-main-content">
          <div className="product-page-grid">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="product-page-image-container">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="product-page-image"
                />
              </div>
            </div>

            {/* Product Details */}
            <div>
              {/* Category Badge */}
              <div
                className={`product-page-category-badge ${product.category}`}>
                {product.category}
              </div>

              {/* Product Title & Brand */}
              <h1 className="product-page-title">{product.name}</h1>

              <p className="product-page-brand">{product.brand}</p>

              {/* Rating */}
              <div className="product-page-rating-container">
                <div className="product-page-rating-stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      fill={i < Math.round(product.rating) ? "#f59e0b" : "none"}
                      color={
                        i < Math.round(product.rating) ? "#f59e0b" : "#6b7280"
                      }
                    />
                  ))}
                </div>

                <span className="product-page-rating-text">
                  {product.rating}
                </span>
              </div>

              {/* Price */}
              <div className="product-page-price-container">
                <span className="product-page-price">${product.price}</span>
              </div>

              {/* Quantity Selection */}
              <div className="product-page-quantity-section">
                <label className="product-page-quantity-label">Quantity</label>
                <div className="product-page-quantity-controls">
                  <button
                    onClick={() => decQuantity()}
                    disabled={quantity <= 1}
                    className="product-page-quantity-btn">
                    <Minus size={16} />
                  </button>
                  <span className="product-page-quantity-display">
                    {quantity}
                  </span>
                  <button
                    onClick={() => incQuantity()}
                    disabled={quantity >= product.stock}
                    className="product-page-quantity-btn">
                    <Plus size={16} />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="product-page-action-buttons">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                  className={`product-page-add-to-cart-btn ${
                    product.stock === 0 ? "unavailable" : "available"
                  }`}>
                  <ShoppingCart size={18} />
                  {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
