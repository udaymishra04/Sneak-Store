export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      // check if product already exists
      const exist = state.cart.find((c) => c._id === action.payload._id);
      const qtyToAdd = action.payload.qty || 1;;
      if (exist) {
        // increment quantity
        return {
          ...state,
          cart: state.cart.map((c) =>
            c._id === action.payload._id ? { ...c, qty: c.qty + qtyToAdd  } : c
          ),
        };
      } else {
        // add new product
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, qty: qtyToAdd }],
        };
      }

    case "REMOVE_FROM_CART":
      const existRemove = state.cart.find((c) => c._id === action.payload._id);
      if (existRemove.qty === 1) {
        // remove completely if qty = 1
        return {
          ...state,
          cart: state.cart.filter((c) => c._id !== action.payload._id),
        };
      } else {
        // otherwise just decrement qty
        return {
          ...state,
          cart: state.cart.map((c) =>
            c._id === action.payload._id ? { ...c, qty: c.qty - 1 } : c
          ),
        };
      }

    case "REMOVE_ITEM":
      return {
        ...state,
        cart: state.cart.filter((c) => c._id !== action.payload),
      };

    case "CLEAR_CART":
      return {
        ...state,
        cart: [],
      };

    default:
      return state;
  }
};

export const filterReducer = (state, action) => {
  switch (action.type) {
    case "SORT_BY_PRICE":
      return { ...state, sort: action.payload };

    case "FILTER_BY_CATEGORY":
      if (state.category.includes(action.payload)) {
        return {
          ...state,
          category: state.category.filter((cat) => cat !== action.payload),
        };
      }
      else {
        return { ...state, category: [...state.category, action.payload] };
      }

    case "FILTER_BY_RATING":
      return { ...state, rating: action.payload };

    case "FILTER_BY_BRAND":
      if (state.brand.includes(action.payload)) {
        return {
          ...state,
          brand: state.brand.filter((b) => b !== action.payload),
        };
      }
      else {
        return { ...state, brand: [...state.brand,action.payload]}
      };

    case "FILTER_BY_SEARCH":
      return { ...state, searchQuery: action.payload };

    case "CLEAR_FILTERS":
      return {
    sort: "",
    category: [],
    rating: [],
    brand: [],
    searchQuery: ""
  };

    default:
      return state;
  }
};