import axios from "axios";
import API from "../config/api";

export const addProduct = async (productData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.post(`${API}/products`, productData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};

export const deleteProduct = async (productId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.delete(`${API}/products/${productId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${API}/products`);
    return res.data;
  } catch (err) { 
    throw err.response?.data || { message: "Server error" };
  }
};

export const updateProduct = async (productId, updatedData) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API}/products/${productId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};
