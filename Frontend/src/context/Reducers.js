export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // check if product already exists
      const exist = state.cart.find((c) => c.id === action.payload.id);
      if (exist) {
        // increment quantity
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === action.payload.id ? { ...c, qty: c.qty + 1 } : c
          ),
        };
      } else {
        // add new product
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: 1 }],
        };
      }

    case "REMOVE_FROM_CART":
      const existRemove = state.cart.find((c) => c.id === action.payload.id);
      if (existRemove.qty === 1) {
        // remove completely if qty = 1
        return {
          ...state,
          cart: state.cart.filter((c) => c.id !== action.payload.id),
        };
      } else {
        // otherwise just decrement qty
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === action.payload.id ? { ...c, qty: c.qty - 1 } : c
          ),
        };
      }

    default:
      return state;
  }
};
