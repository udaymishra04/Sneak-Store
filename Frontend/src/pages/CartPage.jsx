import React, { useState } from "react";
import { CartState } from "../context/CartProvider";
import { createOrder } from "../services/orderService";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "../styles/CartPage.css";

const CartPage = () => {
  // Sample cart items based on your products data
  const {
    state: { cart },
    dispatch,
    user,
    isLoggedIn
  } = CartState();
  const navigate = useNavigate();
  const [totalPrice, setTotalPrice] = useState(
    cart.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)
  );

  const incQuantity = item => {
    dispatch({
      type: "ADD_TO_CART",
      payload: item
    });
    setTotalPrice(prevTotal => (parseFloat(prevTotal) + item.price).toFixed(2));
  };

  const decQuantity = item => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: item
    });
    setTotalPrice(prevTotal => (parseFloat(prevTotal) - item.price).toFixed(2));
  };

  const removeItem = item => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: item._id
    });
    setTotalPrice(prevTotal =>
      (parseFloat(prevTotal) - item.price * item.qty).toFixed(2)
    );
  };

  const handleSubmit = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to place an order.");
      // navigate("/auth");
      return;
    }
    try {
      const orderData = {
        userId: user.id,
        items: cart,
        totalPrice
      };
      console.log("User from cart page:", user);
      console.log("Order Data:", orderData);
      const res = await createOrder(orderData);
      toast.success("Order placed successfully!");
      dispatch({ type: "CLEAR_CART" });
      navigate("/orders"); 
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order. Please try again.");
    }
  };

  return (
    <div data-aos="fade-in" className="cart-page-container">
      <div className="cart-page-content pd-20">
        <div className="cart-page-head">
          <h2 className="fc-white fw-700 mb-5">Your Shopping Cart</h2>
          <p className="cart-page-subtitle text-gray">
            Review your selected items
          </p>
        </div>
        <hr></hr>
        <div className="cart-items m-20">
          {cart.length === 0 ? (
            <p className="text-gray">Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div
                key={item._id}
                className="cart-item flex justify-between pd-20">
                <div className="flex">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="cart-item-image"
                    width={120}
                    height={120}
                  />
                  <div className="cart-item-details">
                    <h3 className="cart-item-name">{item.name}</h3>

                    <p className="cart-item-brand">{item.brand}</p>
                    <p className="cart-item-price">${item.price}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-400">Quantity:</span>
                        <div className="flex justify-content-center align-items-center bg-gray-700 rounded-lg">
                          <button
                            onClick={() => decQuantity(item)}
                            className="px-3 py-1 text-gray-300 hover:text-white transition-colors duration-300">
                            -
                          </button>
                          <span className="px-4 py-1 text-white font-medium">
                            {item.qty}
                          </span>
                          <button
                            onClick={() => incQuantity(item)}
                            className="px-3 py-1 text-gray-300 hover:text-white transition-colors duration-300">
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="flex-col
                           ">
                  <button
                    onClick={() => removeItem(item)}
                    className="text-gray-400 hover:text-red-400 transition-colors duration-300 p-1">
                    🗑️
                  </button>
                  <div className="text-xl font-bold text-white">
                    ${(item.price * item.qty).toFixed(2)}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      {cart.length > 0 ? (
        <div className="cart-summary pd-20">
          <h3 className="cart-summary-title fc-white fw-700 mb-10">
            Order Summary
          </h3>
          <hr></hr>
          <div className="mt-10">
            <div className="flex justify-between mb-5 pd-20">
              <h2>Total</h2>
              <h2 className="text-xl font-bold fc-green border-green">
                ${totalPrice}
              </h2>
            </div>
            <div className="cart-summary-actions">
              <button
                type="submit"
                onClick={handleSubmit}
                className="checkout-button w-full pd-10 fw-600 fs-18 ">
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}      
    </div>
  );
};

export default CartPage;
