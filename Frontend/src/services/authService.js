// src/services/authService.js
import axios from "axios";
import API from "../config/api";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return { headers: { Authorization: `Bearer ${token}` } };
};


export const register = async (username, email, password) => {
  try {
    const res = await axios.post(`${API}/auth/register`, {
      username,
      email,
      password,
    });
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};

export const login = async (email, password) => {
  try {
    const res = await axios.post(`${API}/auth/login`, { email, password });
    localStorage.setItem("token", res.data.token); // token save
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: "Server error" };
  }
};

export const getMe = async () => {
  const res = await axios.get(`${API}/auth/me`, getAuthHeader());
  return res.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
