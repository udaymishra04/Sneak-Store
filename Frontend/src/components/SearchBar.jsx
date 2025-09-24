import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import '../styles/SearchBar.css';

const ProductSearch = ({products}) => {
  // Mock product data - replace with actual API call
  // const [products, setProducts] = useState([]);
  //     useEffect(() => {
  //       fetchProducts();
  //     }, []);
    
  //     // Fetching all the products from the DB
  //     const fetchProducts = async () => {
  //       try {
  //         const res = await getAllProducts();
  //         setProducts(res);
  //         console.log("Products fetched:", res);
  //       } catch (error) {
  //         console.error("Failed to fetch products", error);
  //       }
  //     };

      const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  
  const searchRef = useRef(null);
  const dropdownRef = useRef(null);

  // Filter products based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts([]);
      setIsDropdownOpen(false);
      return;
    }

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredProducts(filtered);
    setIsDropdownOpen(filtered.length > 0);
    setHighlightedIndex(-1);
  }, [searchQuery]);

  // Handle keyboard navigation
  const handleKeyDown = (e) => {
    if (!isDropdownOpen) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < filteredProducts.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleProductSelect(filteredProducts[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Handle product selection
  const handleProductSelect = (product) => {
    console.log('Selected product:', product);
    setSearchQuery(product.name);
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
    // TODO: Navigate to product page or perform desired action
    // Example: navigate(`/product/${product.id}`);
    console.log("Navigate to product page for ID:", product._id);
    navigate(`/product/${product._id}`);
  };

  // Handle input change
  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setIsDropdownOpen(false);
    setHighlightedIndex(-1);
    searchRef.current?.focus();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="search-container">
      {/* Search Input */}
      <div className="search-input-wrapper">
        <div className="search-icon">
          <Search />
        </div>
        
        <input
          ref={searchRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search products..."
          className="search-input"
        />
        
        {searchQuery && (
          <button
            onClick={clearSearch}
            className="search-clear-button"
          >
            <X />
          </button>
        )}
      </div>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="search-dropdown-container"
        >
          {filteredProducts.length === 0 ? (
            <div className="search-dropdown-empty">
              No products found for "{searchQuery}"
            </div>
          ) : (
            <div className="search-dropdown-results">
              {filteredProducts.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() => handleProductSelect(product)}
                  className={`search-product-item ${index === highlightedIndex ? 'search-highlighted' : ''}`}
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="search-product-image"
                  />
                  <div className="search-product-details">
                    <div className="search-product-name">
                      {product.name}
                    </div>
                    <div className="search-product-brand">
                      {product.brand}
                    </div>
                  </div>
                  <div className="search-product-price">
                    ${product.price}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Results count */}
      {isDropdownOpen && filteredProducts.length > 0 && (
        <div className="search-results-count">
          <div className="search-results-count-text">
            {filteredProducts.length} result{filteredProducts.length !== 1 ? 's' : ''} found
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;