import React, { useState } from "react";
import { Eye, EyeOff, User, Mail, Lock, Zap } from "lucide-react";
import { CartState } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import "../styles/AuthPage.css";

export default function AuthPage() {
  const { handleLogin, handleRegister,user } = CartState();

  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false
  });

  const handleInputChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    if (isLogin) {
      try {
        const loginUser = await handleLogin(formData.email, formData.password);
        console.log(loginUser);
        toast.success("Login successful! Welcome back to Sneakhead!");
        console.log("User after login:", user);
        if (loginUser.user != null && loginUser.user.role === "admin") {
          console.log("Navigating to admin dashboard");
          navigate("/admin");
        } else navigate("/");
      } catch (err) {
        console.error("Login error:", err);
        const msg =
          err?.message ||
          err?.error ||
          err?.response?.data?.message ||
          "Unknown error";
        toast.error(`Login failed: ${msg}`);
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match.");
        return;
      }
      // Call register API here (not implemented in this snippet)
      try {
        console.log(formData.username, formData.email, formData.password);
        const temp = await handleRegister(
          formData.username,
          formData.email,
          formData.password
        );
        toast.success("Account created successfully! Welcome to Sneakhead!");
        navigate("/");
      } catch (err) {
        console.error("Registration error:", err);
        const msg =
          err?.message ||
          err?.error ||
          err?.response?.data?.message ||
          "Unknown error";
        toast.error(`Registration failed: ${msg}`);
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      rememberMe: false
    });
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        {/* Logo/Header */}
        <div className="auth-header">
          <div className="auth-logo-container">
            <Zap className="auth-logo-icon" />
          </div>
          <h1 className="auth-title">SNEAKHEAD</h1>
          <p className="auth-subtitle">
            {isLogin
              ? "Welcome back, sneakerhead!"
              : "Join the sneaker community"}
          </p>
        </div>

        {/* Auth Card */}
        <div className="auth-card">
          {/* Toggle Buttons */}
          <div className="auth-toggle-container">
            <button
              onClick={() => setIsLogin(true)}
              className={`auth-toggle-btn ${isLogin ? "active" : ""}`}>
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`auth-toggle-btn ${!isLogin ? "active" : ""}`}>
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="auth-form-fields">
              {/* Username field (signup only) */}
              {!isLogin && (
                <div className="auth-field">
                  <label className="auth-field-label">Username</label>
                  <div className="auth-input-container">
                    <User className="auth-input-icon" />
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Enter your username"
                      className="auth-input-field"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Email field */}
              <div className="auth-field">
                <label className="auth-field-label">Email</label>
                <div className="auth-input-container">
                  <Mail className="auth-input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="auth-input-field"
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="auth-field">
                <label className="auth-field-label">Password</label>
                <div className="auth-input-container">
                  <Lock className="auth-input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="auth-input-field auth-input-with-toggle"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="auth-password-toggle">
                    {showPassword ? (
                      <EyeOff className="auth-toggle-icon" />
                    ) : (
                      <Eye className="auth-toggle-icon" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password field (signup only) */}
              {!isLogin && (
                <div className="auth-field">
                  <label className="auth-field-label">Confirm Password</label>
                  <div className="auth-input-container">
                    <Lock className="auth-input-icon" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="auth-input-field"
                      required
                    />
                  </div>
                </div>
              )}

              {/* Submit button */}
              <button type="submit" className="auth-submit-btn">
                {isLogin ? "Sign In" : "Create Account"}
              </button>
            </div>
          </form>

          {/* Footer text */}
          <div className="auth-footer-text">
            <p className="auth-switch-mode-text">
              {isLogin
                ? "Don't have an account? "
                : "Already have an account? "}
              <button
                type="button"
                onClick={toggleMode}
                className="auth-switch-mode-btn">
                {isLogin ? "Sign up here" : "Sign in here"}
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Popup for login/register success/error messages */}
      {/* {popup.visible && (
        <Popup
          message={popup.message}
          type={popup.type}
          duration={4000}
          position="top-right"
          isVisible={popup.visible}
          onClose={() => setPopup({ ...popup, visible: false })}
        />
      )} */}
    </div>
  );
}
