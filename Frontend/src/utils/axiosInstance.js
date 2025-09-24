// src/utils/axiosInstance.js
import axios from "axios";
import API from "../config/api";

const instance = axios.create({
  baseURL: API,
});

instance.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default instance;
