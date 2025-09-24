import React, { use } from "react";
import CartContext from "./CartContext";
import products from "../data/products";
import { useReducer,useContext,useState, useEffect } from "react";
import { CartReducer } from "./Reducers";
import { filterReducer } from "./Reducers";
import { getMe, login, register, logout } from "../services/authService";

const CartProvider = ({ children }) => {
  
  const [isLoggedIn,setLoggedIn] = useState(false);
  const [state, dispatch] = useReducer(CartReducer,{
    products: products,
    cart: []
  });

  const [user, setUser] = useState(null);
  
    useEffect(() => {
      const fetchUser = async () => {
        try {
          const me = await getMe();
          setUser(me);
          console.log("Authenticated user data from CartProvider:", user);

        } catch (err) {
          console.error("Error fetching user:", err);
          setUser(null);
        }
      };
      fetchUser();
    }, []);
  
    const handleLogin = async (email,password) => {
      try{

        const res = await login(email,password);
        setUser(res.user);
        console.log("Login response:", user);
        // console.log("user logged in");
        // When user logs in, set isLoggedIn to true
        setLoggedIn(true);     
        console.log("Printing loggedIn state in handleLogin:", isLoggedIn); 
        return res;
      }catch(err){
        console.log("Login failed", err);
        throw err;
      }
    };
  
    const handleRegister = async (username,email,password) => {
      // console.log(data);
      const res = await register(username,email,password);
      setUser(res.user);
      console.log("Registration response:", user);
      // When user logs in, set isLoggedIn to true
      setLoggedIn(true); 
    };
  
    const handleLogout = () => {
      logout();
      setLoggedIn(false);
      setUser(null);
    };
 
  const [productState, productDispatch] = useReducer(filterReducer,{
    sort: "",
    category: [],
    rating: "",
    brand: [],
    searchQuery: ""
  });

  const [popup, setPopup] = useState({
        visible: false,
        message: "",
        type: "success"
      });

    


  return (
    <CartContext.Provider value={{state, dispatch, productState, productDispatch,isLoggedIn,setLoggedIn, user, setUser, handleLogin, handleRegister, handleLogout, popup, setPopup}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider;

export const CartState = () => {
  return useContext(CartContext);
}