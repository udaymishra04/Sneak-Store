import React, { useState, useRef, useEffect } from 'react';
import { User, Package, LogOut } from 'lucide-react';
import { CartState } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../styles/AdminDropDown.css';

const DropDown = () => {
  const { handleLogout } = CartState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const logoutUser = () => {
    // Clear user session or token here if needed
    handleLogout();
    toast.success("Logged out successfully");
    navigate("/auth");
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="admin-profile-dropdown" ref={dropdownRef}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="admin-profile-button"
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
      >
        <div style={{ color: "#d1d5db", fontSize: "0.875rem" }}>
          Welcome back, Admin
        </div>
      </button>

      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="admin-dropdown-menu">
          <div className="admin-dropdown-content">
            <button onClick={logoutUser} className="admin-dropdown-item">
              <LogOut className="admin-dropdown-icon" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DropDown;