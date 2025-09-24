import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "./config/api";
import AOS from "aos";
import "aos/dist/aos.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import ShopPage from "./pages/ShopPage";
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import CategoryPage from "./pages/CategoryPage";
import AuthPage from "./pages/AuthPage";
import AdminDashboard from "./pages/AdminDashboard";
import ViewOrders from "./pages/ViewOrders";
import ProductPage from "./pages/ProductPage";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";
import { CartState } from "./context/CartProvider";
import {getMe} from "./services/authService";
import "./App.css";

function App() {
    const [loading, setLoading] = useState(true);
    const { setUser, user, setLoggedIn } = CartState();

  useEffect(() => {
    AOS.init({ once: true }); // 'once' animates only once per element
    const token = localStorage.getItem("token");
    if (token) {
    const fetchUser = async () => {
            try {
              const me = await getMe();
              setUser(me);
              // console.log("Authenticated user data from app:", user);
              setLoggedIn(true);
              console.log("User set in context:", user,me);
            } catch (err) {
              console.error("Error fetching user:", err);
              // setUser(null);
            }
          };
          fetchUser();
    }
  }, []);

  // const { isLoggedIn,user } = CartState();
  // console.log("Is user logged in?", isLoggedIn);
  // console.log("User details:", user);

  return (
    
      <Router>      
        <>
          <Header />
          <main>
            <ScrollToTop />
            {/* To display POPUP notifications */}
            <Toaster position="top-center" />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/categories" element={<CategoryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/orders" element={<ViewOrders />} />
              <Route path="/product/:id" element={<ProductPage />} />
            </Routes>
          </main>
          <Footer />
        </>      
      </Router>
  );
}

export default App;
