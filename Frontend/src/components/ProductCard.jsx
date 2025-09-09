import React, { useState } from 'react';
import { CartState } from "../context/CartProvider";
import "../styles/ProductCard.css";

function ProductCard(prod) {

  const {state: {cart},dispatch} = CartState();
  console.log(cart);
  const quantityInCart = cart.find(item => item.id === prod.id)?.qty || 0;

  return (
    <div className="product-card">
      <img src={prod.img} alt={prod.name} className="product-image" />
      <h3 className="product-name txt-center">{prod.name}</h3>
      <p className="product-price txt-center">${prod.price}</p>
      <p className="text-yellow-500 py-1 txt-center">{"⭐".repeat(prod.rating)}</p>
        {quantityInCart > 0 ? (
          <div className='flex justify-content-center align-items-center g-10'>
          <button 
            onClick={() =>

              dispatch({
                type: "ADD_TO_CART",
                payload: prod,
              })
            
        }
        id="add-to-cart-button" className="add-to-cart-button">+</button>
          <span className="mx-2"><h3>{quantityInCart}</h3></span>
          <button 
            onClick={() =>
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod,
              })
            } 
            id="remove-from-cart-button" className="remove-from-cart-button">-</button>
        </div>
         ) :  (
        <button 
          onClick={() =>
          dispatch({
            type: "ADD_TO_CART",
            payload: prod,
          })        
        }
        id="add-to-cart-button" className="add-to-cart-button">Add to Cart</button>
      )}
    </div>
  );
}
export default ProductCard;
