import React, { use } from "react";
import CartContext from "./CartContext";
import products from "../data/products";
import { useReducer,useContext } from "react";
import { CartReducer } from "./Reducers";

const CartProvider = ({ children }) => {

  const [state, dispatch] = useReducer(CartReducer,{
    products: products,
    cart: []
  });


  return (
    <CartContext.Provider value={{state, dispatch}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const CartState = () => {
  return useContext(CartContext);
}