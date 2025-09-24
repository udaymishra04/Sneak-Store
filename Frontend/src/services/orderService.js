import axios from "axios";
import API from "../config/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};

export const createOrder = async (orderData) => {
  const res = await axios.post(`${API}/orders`, orderData, getAuthHeader());
  return res.data;
};

export const getMyOrders = async (userId) => {
  const res = await axios.get(`${API}/orders/user/${userId}`, getAuthHeader());
  return res.data;
};

export const getAllOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${API}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(`${API}/orders/${orderId}`, { status }, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};
