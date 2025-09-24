import axios from "axios";
import API from "../config/api";

export const getAllProducts = async () => {
  try {
    const res = await axios.get(`${API}/products`);
    return res.data;
  } catch (err) { 
    throw err.response?.data || { message: "Server error" };
  }
};

export const getProductById = async (id) => {
  try {
    const res = await axios.get(`${API}/products/${id}`);
    return res.data;
  } catch (err) { 
    throw err.response?.data || { message: "Server error" };
  }
};