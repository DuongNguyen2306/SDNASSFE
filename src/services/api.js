import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // Đảm bảo backend đang chạy trên cổng này
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token vào tất cả request
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Lấy token từ localStorage
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default instance;
