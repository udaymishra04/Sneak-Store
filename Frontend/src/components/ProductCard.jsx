import { CartState } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import "../styles/ProductCard.css";

function ProductCard({ prod }) {
  const navigate = useNavigate();
  const {
    state: { cart },
    dispatch
  } = CartState();
  // console.log(prod);
  const quantityInCart = cart.find(item => item._id === prod._id)?.qty || 0;

  const handleCardClick = () => {
    navigate(`/product/${prod._id}`);
  };

  return (
    <div onClick={handleCardClick} className="product-card">
      {prod.images[0] && (
        <img
          src={prod.images[0]}
          alt={prod.name}
          className="product-image"
          style={{
            width: "100%",
            height: "120px",
            objectFit: "cover",
            borderRadius: "0.75rem",
            marginBottom: "1rem"
          }}
        />
      )}
      <h3 className="product-name txt-center">{prod.name}</h3>
      <p className="product-price txt-center">${prod.price}</p>
      <p className="text-yellow-500 py-1 txt-center">
        {"⭐".repeat(prod.rating)}
      </p>
      {quantityInCart > 0 ? (
        <div className="flex justify-content-center align-items-center g-10">
          <button
            onClick={e => {
              e.stopPropagation();
              dispatch({
                type: "ADD_TO_CART",
                payload: prod
              });
            }}
            id="add-to-cart-button"
            className="add-to-cart-button">
            +
          </button>
          <span className="mx-2 cl-black">
            <h3>{quantityInCart}</h3>
          </span>
          <button
            onClick={e => {
              e.stopPropagation();
              dispatch({
                type: "REMOVE_FROM_CART",
                payload: prod
              });
            }}
            id="remove-from-cart-button"
            className="remove-from-cart-button">
            -
          </button>
        </div>
      ) : (
        <button
          onClick={e => {
            e.stopPropagation();
            dispatch({
              type: "ADD_TO_CART",
              payload: prod
            });
          }}
          id="add-to-cart-button"
          className="add-to-cart-button">
          Add to Cart
        </button>
      )}
    </div>
  );
}
export default ProductCard;
