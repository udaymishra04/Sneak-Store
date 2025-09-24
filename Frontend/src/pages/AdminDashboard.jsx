import React, { useState, useEffect } from "react";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  updateProduct
} from "../services/adminService";
import {
  getAllOrders,
  updateOrderStatus
} from "../services/orderService";
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
} from "lucide-react";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    console.log(orders)
  }, []);

  // Fetching all the products from the DB
  const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res);
    } catch (error) {
      console.error("Failed to fetch products", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await getAllOrders();
      setOrders(res);
    } catch (error) {
      console.error("Failed to fetch orders", error);
    }
  };


  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  const [productForm, setProductForm] = useState({
    name: "",
    brand: "",
    price: "",
    images: [""],
    rating: "",
    category: "sneakers"
  });

  const categories = ["sneakers", "running", "casual"];
  const orderStatuses = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled"
  ];

  // Handle product form submission
  const handleProductSubmit = async e => {
    e.preventDefault();
    const productData = {
      ...productForm,
      price: Number(productForm.price),
      rating: Number(productForm.rating),
      images: productForm.images.filter(img => img.trim() !== "")
    };

    // If editing, update the product; else, add a new product
    if (editingProduct) {
      try {
        const res = await updateProduct(editingProduct._id, productData);
        setProducts(prev =>
          prev.map(p =>
            p._id === editingProduct._id
              ? { ...p, ...productData }
              : p
          )
        );
        console.log("editingProduct._id", editingProduct._id);
      } catch (err) {
        console.error("Error updating product:", err);
      }
    } else {
      try {
        const res = await addProduct(productData);
        // Use the product returned from backend (with valid _id)
        setProducts(prev => [...prev, res]);
      } catch (err) {
        console.error("Error adding product:", err);
      }
    }

    resetProductForm();
  };

  const resetProductForm = () => {
    setProductForm({
      name: "",
      brand: "",
      price: "",
      images: [""],
      rating: "",      
      category: "sneakers"
    });
    setEditingProduct(null);
    setShowProductModal(false);
  };

  const handleEditProduct = product => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      images: product.images.length > 0 ? product.images : [""],
      rating: product.rating.toString(),
      category: product.category
    });
    setShowProductModal(true);
  };

  // Delete product
  const handleDeleteProduct = async productId => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await deleteProduct(productId);
        setProducts(prev => prev.filter(p => p._id !== productId));
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleOrderStatusChange = async (orderId, newStatus) => {
    try{
      const res = await updateOrderStatus(orderId, newStatus);
      setOrders(prev =>
        prev.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      console.error("Error updating order status:", err);
    }
  };

  const addImageField = () => {
    setProductForm(prev => ({
      ...prev,
      images: [...prev.images, ""]
    }));
  };

  const removeImageField = index => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const updateImageField = (index, value) => {
    setProductForm(prev => ({
      ...prev,
      images: prev.images.map((img, i) => (i === index ? value : img))
    }));
  };

  // const filteredProducts = products.filter(product => {
  //   const matchesSearch =
  //     product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     product.brand.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesCategory =
  //     filterCategory === "all" || product.category === filterCategory;
  //   return matchesSearch && matchesCategory;
  // });

  const getStatusColor = status => {
    switch (status) {
      case "pending":
        return "#f59e0b";
      case "processing":
        return "#3b82f6";
      case "shipped":
        return "#8b5cf6";
      case "delivered":
        return "#10b981";
      case "cancelled":
        return "#ef4444";
      default:
        return "#6b7280";
    }
  };

  const getStatusIcon = status => {
    switch (status) {
      case "pending":
        return <Clock size={16} />;
      case "processing":
        return <AlertCircle size={16} />;
      case "shipped":
        return <Package size={16} />;
      case "delivered":
        return <CheckCircle size={16} />;
      case "cancelled":
        return <X size={16} />;
      default:
        return <Clock size={16} />;
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
      {/* Header */}

      {/* Navigation */}
      <div
        style={{
          background: "rgba(255, 255, 255, 0.05)",
          padding: "1rem 2rem",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)"
        }}>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[
            { _id: "overview", label: "Overview", icon: TrendingUp },
            { _id: "products", label: "Products", icon: Package },
            { _id: "orders", label: "Orders", icon: ShoppingCart }
          ].map(({ _id, label, icon: Icon }) => (
            <button
              key={_id}
              onClick={() => setActiveTab(_id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.75rem 1.5rem",
                background:
                  activeTab === _id
                    ? "linear-gradient(135deg, #f97316, #dc2626)"
                    : "transparent",
                color: activeTab === _id ? "white" : "#d1d5db",
                border: "none",
                borderRadius: "0.75rem",
                cursor: "pointer",
                transition: "all 0.3s ease",
                fontWeight: activeTab === _id ? "600" : "400"
              }}>
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: "2rem" }}>
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div>
            <h2
              style={{
                color: "white",
                fontSize: "2rem",
                marginBottom: "2rem",
                fontWeight: "700"
              }}>
              Dashboard Overview
            </h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                gap: "1.5rem",
                marginBottom: "2rem"
              }}>
              {[
                {
                  label: "Total Products",
                  value: products.length,
                  icon: Package,
                  color: "#3b82f6"
                },
                {
                  label: "Total Orders",
                  value: orders.length,
                  icon: ShoppingCart,
                  color: "#10b981"
                },
                {
                  label: "Revenue",
                  value: `$${orders.reduce(
                    (sum, order) => sum + order.totalPrice,
                    0
                  )}`,
                  icon: DollarSign,
                  color: "#f59e0b"
                }
              ].map((stat, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between"
                    }}>
                    <div>
                      <p
                        style={{
                          color: "#9ca3af",
                          margin: "0 0 0.5rem 0",
                          fontSize: "0.875rem"
                        }}>
                        {stat.label}
                      </p>
                      <p
                        style={{
                          color: "white",
                          margin: 0,
                          fontSize: "2rem",
                          fontWeight: "700"
                        }}>
                        {stat.value}
                      </p>
                    </div>
                    <div
                      style={{
                        width: "3rem",
                        height: "3rem",
                        background: stat.color,
                        borderRadius: "0.75rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center"
                      }}>
                      <stat.icon color="white" size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Orders */}
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}>
              <h3
                style={{
                  color: "white",
                  marginBottom: "1rem",
                  fontWeight: "600"
                }}>
                Recent Orders
              </h3>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "0.75rem",
                          fontSize: "0.875rem"
                        }}>
                        Customer
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "0.75rem",
                          fontSize: "0.875rem"
                        }}>
                        Amount
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "0.75rem",
                          fontSize: "0.875rem"
                        }}>
                        Status
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "0.75rem",
                          fontSize: "0.875rem"
                        }}>
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.slice(0, 5).map(order => (
                      <tr key={order._id}>
                        <td style={{ color: "white", padding: "0.75rem" }}>
                          {order.user}
                        </td>
                        <td style={{ color: "white", padding: "0.75rem" }}>
                          ${order.totalPrice}
                        </td>
                        <td style={{ padding: "0.75rem" }}>
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "0.25rem",
                              padding: "0.25rem 0.75rem",
                              background: getStatusColor(order.status),
                              color: "white",
                              borderRadius: "1rem",
                              fontSize: "0.75rem",
                              fontWeight: "600"
                            }}>
                            {getStatusIcon(order.status)}
                            {order.status}
                          </span>
                        </td>
                        <td
                          style={{
                            color: "#9ca3af",
                            padding: "0.75rem",
                            fontSize: "0.875rem"
                          }}>
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "2rem"
              }}>
              <h2
                style={{
                  color: "white",
                  fontSize: "2rem",
                  margin: 0,
                  fontWeight: "700"
                }}>
                Products Management
              </h2>
              <button
                onClick={() => setShowProductModal(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.75rem 1.5rem",
                  background: "linear-gradient(135deg, #f97316, #dc2626)",
                  color: "white",
                  border: "none",
                  borderRadius: "0.75rem",
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "transform 0.2s ease"
                }}
                onMouseOver={e =>
                  (e.target.style.transform = "translateY(-2px)")
                }
                onMouseOut={e => (e.target.style.transform = "translateY(0)")}>
                <Plus size={18} />
                Add Product
              </button>
            </div>

            {/* Filters */}
           

            {/* Products Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1.5rem"
              }}>
              {products.map(product => (
                <div
                  key={product._id}
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(20px)",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)"
                  }}>
                  {product.images[0] && (
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "0.75rem",
                        marginBottom: "1rem"
                      }}
                    />
                  )}

                  <h3
                    style={{
                      color: "white",
                      margin: "0 0 0.5rem 0",
                      fontWeight: "600"
                    }}>
                    {product.name}
                  </h3>

                  <p
                    style={{
                      color: "#9ca3af",
                      margin: "0 0 0.5rem 0",
                      fontSize: "0.875rem"
                    }}>
                    {product.brand} • {product.category}
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "1rem"
                    }}>
                    <span
                      style={{
                        color: "white",
                        fontSize: "1.25rem",
                        fontWeight: "700"
                      }}>
                      ${product.price}
                    </span>
                    <span
                      style={{
                        color: product.rating < 1 ? "#ef4444" : "#10b981",
                        fontSize: "0.875rem",
                        fontWeight: "600"
                      }}>
                      {product.rating} in rating
                    </span>
                  </div>

                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => handleEditProduct(product)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.5rem",
                        background: "rgba(59, 130, 246, 0.2)",
                        color: "#60a5fa",
                        border: "1px solid rgba(59, 130, 246, 0.3)",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: "500"
                      }}>
                      <Edit3 size={14} />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product._id)}
                      style={{
                        flex: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "0.5rem",
                        padding: "0.5rem",
                        background: "rgba(239, 68, 68, 0.2)",
                        color: "#f87171",
                        border: "1px solid rgba(239, 68, 68, 0.3)",
                        borderRadius: "0.5rem",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: "500"
                      }}>
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
        {activeTab === "orders" && (
          <div>
            <h2
              style={{
                color: "white",
                fontSize: "2rem",
                marginBottom: "2rem",
                fontWeight: "700"
              }}>
              Orders Management
            </h2>

            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(20px)",
                borderRadius: "1rem",
                padding: "1.5rem",
                border: "1px solid rgba(255, 255, 255, 0.2)"
              }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          fontWeight: "600"
                        }}>
                        Order _id
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          fontWeight: "600"
                        }}>
                        Customer
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          fontWeight: "600"
                        }}>
                        Products
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          fontWeight: "600"
                        }}>
                        Amount
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          fontWeight: "600"
                        }}>
                        Status
                      </th>
                      <th
                        style={{
                          color: "#9ca3af",
                          textAlign: "left",
                          padding: "1rem",
                          fontSize: "0.875rem",
                          fontWeight: "600"
                        }}>
                        Date
                      </th>                      
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr
                        key={order._id}
                        style={{
                          borderTop: "1px solid rgba(255, 255, 255, 0.1)"
                        }}>
                        <td
                          style={{
                            color: "white",
                            padding: "1rem",
                            fontSize: "0.875rem"
                          }}>
                          #{order._id}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <div>
                            <div
                              style={{
                                color: "white",
                                fontSize: "0.875rem",
                                fontWeight: "500"
                              }}>
                              {order.user}
                            </div>
                            {/* <div
                              style={{ color: "#9ca3af", fontSize: "0.75rem" }}>
                              {order.email}
                            </div> */}
                          </div>
                        </td>
                        <td
                          style={{
                            color: "#9ca3af",
                            padding: "1rem",
                            fontSize: "0.875rem"
                          }}>
                          {Array.isArray(order.items) ? order.items.length : 0} item(s)
                        </td>
                        <td
                          style={{
                            color: "white",
                            padding: "1rem",
                            fontSize: "0.875rem",
                            fontWeight: "600"
                          }}>
                          ${order.totalPrice}
                        </td>
                        <td style={{ padding: "1rem" }}>
                          <select
                            value={order.status}
                            onChange={e =>
                              handleOrderStatusChange(order._id, e.target.value)
                            }
                            style={{
                              padding: "0.5rem",
                              background: getStatusColor(order.status),
                              color: "white",
                              border: "none",
                              borderRadius: "0.5rem",
                              fontSize: "0.75rem",
                              fontWeight: "600"
                            }}>
                            {orderStatuses.map(status => (
                              <option
                                key={status}
                                value={status}
                                style={{ background: "#1f2937" }}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td
                          style={{
                            color: "#9ca3af",
                            padding: "1rem",
                            fontSize: "0.875rem"
                          }}>
                          {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : ''}
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
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            padding: "1rem"
          }}>
          <div
            style={{
              background: "rgba(15, 23, 42, 0.95)",
              backdropFilter: "blur(20px)",
              borderRadius: "1rem",
              padding: "2rem",
              border: "1px solid rgba(255, 255, 255, 0.2)",
              maxWidth: "500px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto"
            }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1.5rem"
              }}>
              <h3
                style={{
                  color: "white",
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: "700"
                }}>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={resetProductForm}
                style={{
                  background: "none",
                  border: "none",
                  color: "#9ca3af",
                  cursor: "pointer",
                  padding: "0.5rem"
                }}>
                <X size={20} />
              </button>
            </div>

            <form
              onSubmit={handleProductSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <label
                  style={{
                    color: "#d1d5db",
                    fontSize: "0.875rem",
                    fontWeight: "500",
                    marginBottom: "0.5rem",
                    display: "block"
                  }}>
                  Product Name
                </label>
                <input
                  type="text"
                  value={productForm.name}
                  onChange={e =>
                    setProductForm(prev => ({ ...prev, name: e.target.value }))
                  }
                  required
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "0.5rem",
                    color: "white",
                    fontSize: "0.875rem"
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem"
                }}>
                <div>
                  <label
                    style={{
                      color: "#d1d5db",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      display: "block"
                    }}>
                    Brand
                  </label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={e =>
                      setProductForm(prev => ({
                        ...prev,
                        brand: e.target.value
                      }))
                    }
                    required
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      color: "white",
                      fontSize: "0.875rem"
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      color: "#d1d5db",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      display: "block"
                    }}>
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={e =>
                      setProductForm(prev => ({
                        ...prev,
                        category: e.target.value
                      }))
                    }
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      color: "white",
                      fontSize: "0.875rem"
                    }}>
                    {categories.map(cat => (
                      <option
                        key={cat}
                        value={cat}
                        style={{ background: "#1f2937" }}>
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "1rem"
                }}>
                <div>
                  <label
                    style={{
                      color: "#d1d5db",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      display: "block"
                    }}>
                    Price ($)
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={e =>
                      setProductForm(prev => ({
                        ...prev,
                        price: e.target.value
                      }))
                    }
                    required
                    min="0"
                    step="0.01"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      color: "white",
                      fontSize: "0.875rem"
                    }}
                  />
                </div>

                <div>
                  <label
                    style={{
                      color: "#d1d5db",
                      fontSize: "0.875rem",
                      fontWeight: "500",
                      marginBottom: "0.5rem",
                      display: "block"
                    }}>
                    Rating
                  </label>
                  <input
                    type="number"
                    value={productForm.rating}
                    onChange={e =>
                      setProductForm(prev => ({
                        ...prev,
                        rating: e.target.value
                      }))
                    }
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      background: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "0.5rem",
                      color: "white",
                      fontSize: "0.875rem"
                    }}
                  />
                </div>
              </div>              

              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "0.5rem"
                  }}>
                  <label
                    style={{
                      color: "#d1d5db",
                      fontSize: "0.875rem",
                      fontWeight: "500"
                    }}>
                    Product Images (URLs)
                  </label>
                  {/* <button
                    type="button"
                    onClick={addImageField}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                      padding: "0.5rem 0.75rem",
                      background: "rgba(34, 197, 94, 0.2)",
                      color: "#4ade80",
                      border: "1px solid rgba(34, 197, 94, 0.3)",
                      borderRadius: "0.5rem",
                      cursor: "pointer",
                      fontSize: "0.75rem",
                      fontWeight: "500"
                    }}>
                    <Plus size={12} />
                    Add Image
                  </button> */}
                </div>

                {productForm.images.map((image, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "0.5rem",
                      marginBottom: "0.5rem"
                    }}>
                    <input
                      type="url"
                      value={image}
                      onChange={e => updateImageField(index, e.target.value)}
                      placeholder="Enter image URL"
                      style={{
                        flex: 1,
                        padding: "0.75rem",
                        background: "rgba(255, 255, 255, 0.1)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        borderRadius: "0.5rem",
                        color: "white",
                        fontSize: "0.875rem"
                      }}
                    />
                    {productForm.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeImageField(index)}
                        style={{
                          padding: "0.75rem",
                          background: "rgba(239, 68, 68, 0.2)",
                          color: "#f87171",
                          border: "1px solid rgba(239, 68, 68, 0.3)",
                          borderRadius: "0.5rem",
                          cursor: "pointer"
                        }}>
                        <X size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
                <button
                  type="button"
                  onClick={resetProductForm}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    background: "rgba(107, 114, 128, 0.2)",
                    color: "#9ca3af",
                    border: "1px solid rgba(107, 114, 128, 0.3)",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "500"
                  }}>
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    padding: "0.75rem",
                    background: "linear-gradient(135deg, #f97316, #dc2626)",
                    color: "white",
                    border: "none",
                    borderRadius: "0.5rem",
                    cursor: "pointer",
                    fontSize: "0.875rem",
                    fontWeight: "600"
                  }}>
                  <Save size={16} />
                  {editingProduct ? "Update Product" : "Add Product"}
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
