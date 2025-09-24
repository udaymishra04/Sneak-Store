import React, { useState, useRef, useEffect } from 'react';
import { User, Package, LogOut } from 'lucide-react';
import { CartState } from '../context/CartProvider';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import '../styles/DropDown.css';

const DropDown = () => {

  const {handleLogout} = CartState();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleViewOrders = () => {
    setIsDropdownOpen(false);
    navigate('/orders');
  };

  const logoutUser = () => {
    console.log('Logout clicked');
    handleLogout();
    setIsDropdownOpen(false);
    toast.success("Logged out successfully");
  };

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="profile-button"
                aria-expanded={isDropdownOpen}
                aria-haspopup="true"
              >
                <User className="profile-icon" />
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    <button onClick={handleViewOrders} className="dropdown-item">
                      <Package className="dropdown-icon" />
                      View Orders
                    </button>
                    <button onClick={logoutUser} className="dropdown-item">
                      <LogOut className="dropdown-icon" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
  )
}

export default DropDown;