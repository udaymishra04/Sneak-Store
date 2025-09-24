import React, { useState, useEffect } from 'react';
import { addProduct, deleteProduct, getAllProducts } from '../services/adminService';
import { 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Package, 
  ShoppingCart, 
  Users, 
  TrendingUp,
  Filter,
  Eye,
  Save,
  X,
  Upload,
  DollarSign,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react';
import '../styles/AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // MOCK DATA - Replace with actual API calls to your database
  const [products, setProducts] = useState([
    {
      _id: '1',
      name: 'Air Jordan 1 Retro High OG',
      brand: 'Nike',
      price: 170,
      images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300'],
      stock: 25,
      description: 'Classic basketball shoe with premium leather construction.',
      category: 'sneakers',
      createdAt: new Date('2024-01-15')
    },
    {
      _id: '2',
      name: 'Yeezy Boost 350 V2',
      brand: 'Adidas',
      price: 220,
      images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300'],
      stock: 12,
      description: 'Innovative design with Boost cushioning technology.',
      category: 'limited edition',
      createdAt: new Date('2024-01-20')
    }
  ]);
  
  // MOCK DATA - Replace with actual orders from your database
  const [orders, setOrders] = useState([
    {
      _id: '1',
      customerName: 'John Doe',
      email: 'john@email.com',
      products: [{ name: 'Air Jordan 1 Retro High OG', quantity: 1, price: 170 }],
      totalAmount: 170,
      status: 'pending',
      createdAt: new Date('2024-01-25')
    },
    {
      _id: '2',
      customerName: 'Jane Smith',
      email: 'jane@email.com',
      products: [{ name: 'Yeezy Boost 350 V2', quantity: 2, price: 220 }],
      totalAmount: 440,
      status: 'shipped',
      createdAt: new Date('2024-01-24')
    }
  ]);

  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  
  const [productForm, setProductForm] = useState({
    name: '',
    brand: '',
    price: '',
    images: [''],
    stock: '',
    description: '',
    category: 'sneakers'
  });

  const categories = ['sneakers', 'sports', 'casual', 'limited edition'];
  const orderStatuses = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];

  // TODO: Replace with actual API call to fetch products from MongoDB
  // Example: const fetchProducts = async () => {
  //   try {
  //     const response = await fetch('/api/products');
  //     const data = await response.json();
  //     setProducts(data);
  //   } catch (error) {
  //     console.error('Error fetching products:', error);
  //   }
  // };

  // TODO: Replace with actual API call to fetch orders from database
  // Example: const fetchOrders = async () => {
  //   try {
  //     const response = await fetch('/api/orders');
  //     const data = await response.json();
  //     setOrders(data);
  //   } catch (error) {
  //     console.error('Error fetching orders:', error);
  //   }
  // };

  // PRODUCT CRUD OPERATIONS - Replace with actual API calls

  // Handle product form submission (CREATE/UPDATE product in database)
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: Number(productForm.price),
      stock: Number(productForm.stock),
      images: productForm.images.filter(img => img.trim() !== '')
    };

    try {
      if (editingProduct) {
        // TODO: Replace with actual API call to update product in MongoDB
        // Example: await fetch(`/api/products/${editingProduct._id}`, {
        //   method: 'PUT',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(productData)
        // });
        
        // Mock update for demo
        setProducts(prev => prev.map(p => 
          p._id === editingProduct._id 
            ? { ...p, ...productData }
            : p
        ));
        console.log('UPDATE PRODUCT API CALL:', { id: editingProduct._id, data: productData });
      } else {
        // TODO: Replace with actual API call to create product in MongoDB
        // Example: const response = await fetch('/api/products', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(productData)
        // });
        // const newProduct = await response.json();
        
        // Mock create for demo
        const newProduct = {          
          ...productData,
          createdAt: new Date()
        };
        try{
          const res = await addProduct(productData);
          console.log('Product added:', res);
          setProducts(prev => [...prev, newProduct]);
          console.log('CREATE PRODUCT API CALL:', productData);
        }
        catch(error){
          console.error('Error adding product:', error);
        }
      }

      resetProductForm();
      alert(editingProduct ? 'Product updated successfully!' : 'Product added successfully!');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Error saving product. Please try again.');
    }
  };

  // Reset product form to initial state
  const resetProductForm = () => {
    setProductForm({
      name: '',
      brand: '',
      price: '',
      images: [''],
      stock: '',
      description: '',
      category: 'sneakers'
    });
    setEditingProduct(null);
    setShowProductModal(false);
  };

  // Set form data for editing existing product
  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      images: product.images.length > 0 ? product.images : [''],
      stock: product.stock.toString(),
      description: product.description || '',
      category: product.category
    });
    setShowProductModal(true);
  };

  // Delete product from database
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        // TODO: Replace with actual API call to delete product from MongoDB
        // Example: await fetch(`/api/products/${productId}`, {
        //   method: 'DELETE'
        // });
        
        // Mock delete for demo
        setProducts(prev => prev.filter(p => p._id !== productId));
        console.log('DELETE PRODUCT API CALL:', { id: productId });
        alert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Error deleting product. Please try again.');
      }
    }
  };

  // ORDER MANAGEMENT - Replace with actual API calls

  // Update order status in database
  const handleOrderStatusChange = async (orderId, newStatus) => {
    try {
      // TODO: Replace with actual API call to update order status in database
      // Example: await fetch(`/api/orders/${orderId}`, {
      //   method: 'PATCH',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ status: newStatus })
      // });
      
      // Mock update for demo
      setOrders(prev => prev.map(order =>
        order._id === orderId
          ? { ...order, status: newStatus }
          : order
      ));
      console.log('UPDATE ORDER STATUS API CALL:', { orderId, newStatus });
    } catch (error) {
      console.error('Error updating order status:', error);
      alert('Error updating order status. Please try again.');
    }
  };

  // IMAGE MANAGEMENT FUNCTIONS

  // Add new image URL field
  const addImageField = () => {
    setProductForm(prev => ({
      ...prev,
      images: [...prev.images, '']
    }));
  };

  // Remove image URL field
  const removeImageField = (index) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Update specific image URL
  const updateImageField = (index, value) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => i === index ? value : img)
    }));
  };

  // FILTERING AND SEARCH

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // UTILITY FUNCTIONS

  // Get status color for order status badges
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#f59e0b';
      case 'processing': return '#3b82f6';
      case 'shipped': return '#8b5cf6';
      case 'delivered': return '#10b981';
      case 'cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  // Get status icon for order status badges
  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock size={16} />;
      case 'processing': return <AlertCircle size={16} />;
      case 'shipped': return <Package size={16} />;
      case 'delivered': return <CheckCircle size={16} />;
      case 'cancelled': return <X size={16} />;
      default: return <Clock size={16} />;
    }
  };

  // TODO: Add useEffect to fetch initial data when component mounts
  // useEffect(() => {
  //   fetchProducts();
  //   fetchOrders();
  // }, []);

  return (
    <div className="admin-container">
      {/* Header */}
      

      {/* Navigation */}
      <div className="navigation">
        <div className="nav-tabs">
          {[
            { id: 'overview', label: 'Overview', icon: TrendingUp },
            { id: 'products', label: 'Products', icon: Package },
            { id: 'orders', label: 'Orders', icon: ShoppingCart },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`nav-tab ${activeTab === id ? 'active' : ''}`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="main-content">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div>
            <h2 className="page-title">Dashboard Overview</h2>
            
            <div className="stats-grid">
              {[
                { label: 'Total Products', value: products.length, icon: Package, color: '#3b82f6' },
                { label: 'Total Orders', value: orders.length, icon: ShoppingCart, color: '#10b981' },
                { label: 'Revenue', value: `$${orders.reduce((sum, order) => sum + order.totalAmount, 0)}`, icon: DollarSign, color: '#f59e0b' },
                { label: 'Low Stock', value: products.filter(p => p.stock < 15).length, icon: AlertCircle, color: '#ef4444' }
              ].map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-content">
                    <div>
                      <p className="stat-label">{stat.label}</p>
                      <p className="stat-value">{stat.value}</p>
                    </div>
                    <div className="stat-icon" style={{ backgroundColor: stat.color }}>
                      <stat.icon color="white" size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div className="recent-orders">
              <h3 className="section-title">Recent Orders</h3>
              <div className="table-container">
                <table className="orders-table">
                  <thead>
                    <tr>
                      <th>Customer</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map((order) => (
                      <tr key={order._id}>
                        <td className="customer-cell">{order.customerName}</td>
                        <td className="amount-cell">${order.totalAmount}</td>
                        <td>
                          <span className="status-badge" style={{ backgroundColor: getStatusColor(order.status) }}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td className="date-cell">{order.createdAt.toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div>
            <div className="page-header">
              <h2 className="page-title">Products Management</h2>
              <button onClick={() => setShowProductModal(true)} className="add-btn">
                <Plus size={18} />
                Add Product
              </button>
            </div>

            {/* Filters */}
            <div className="filters">
              <div className="search-container">
                <Search className="search-icon" size={18} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </div>
              
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="category-filter"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</option>
                ))}
              </select>
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <div key={product._id} className="product-card">
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="product-image"
                    />
                  )}
                  
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-brand">{product.brand} • {product.category}</p>
                  
                  <div className="product-info">
                    <span className="product-price">${product.price}</span>
                    <span className={`product-stock ${product.stock < 15 ? 'low' : 'normal'}`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  
                  <div className="product-actions">
                    <button onClick={() => handleEditProduct(product)} className="edit-btn">
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button onClick={() => handleDeleteProduct(product._id)} className="delete-btn">
                      <Trash2 size={14} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <h2 className="page-title">Orders Management</h2>
            
            <div className="orders-section">
              <div className="table-container">
                <table className="full-orders-table">
                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Customer</th>
                      <th>Products</th>
                      <th>Amount</th>
                      <th>Status</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td className="order-id">#{order._id}</td>
                        <td>
                          <div className="customer-info">
                            <div className="customer-name">{order.customerName}</div>
                            <div className="customer-email">{order.email}</div>
                          </div>
                        </td>
                        <td className="products-count">{order.products.length} item(s)</td>
                        <td className="order-amount">${order.totalAmount}</td>
                        <td>
                          <select
                            value={order.status}
                            onChange={(e) => handleOrderStatusChange(order._id, e.target.value)}
                            className="status-select"
                            style={{ backgroundColor: getStatusColor(order.status) }}
                          >
                            {orderStatuses.map(status => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="order-date">{order.createdAt.toLocaleDateString()}</td>
                        <td>
                          <button className="view-btn">
                            <Eye size={12} />
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Product Modal */}
      {showProductModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={resetProductForm} className="close-btn">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="product-form">
              <div className="form-field">
                <label className="form-label">Product Name</label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                  required
                  className="form-input"
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Brand</label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm(prev => ({ ...prev, brand: e.target.value }))}
                    required
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="form-select"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Price ($)</label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                    required
                    min="0"
                    step="0.01"
                    className="form-input"
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Stock</label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                    required
                    min="0"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Description</label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  className="form-textarea"
                />
              </div>

              <div className="form-field">
                <div className="images-header">
                  <label className="form-label">Product Images (URLs)</label>
                  <button type="button" onClick={addImageField} className="add-image-btn">
                    <Plus size={12} />
                    Add Image
                  </button>
                </div>
                
                {productForm.images.map((image, index) => (
                  <div key={index} className="image-input-row">
                    <input
                      type="url"
                      value={image}
                      onChange={(e) => updateImageField(index, e.target.value)}
                      placeholder="Enter image URL"
                      className="form-input"
                    />
                    {productForm.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        className="remove-image-btn"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div className="form-actions">
                <button type="button" onClick={resetProductForm} className="cancel-btn">
                  Cancel
                </button>
                <button type="submit" className="submit-btn">
                  <Save size={16} />
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;