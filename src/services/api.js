import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Đảm bảo base URL đúng
});

// Thêm token vào mỗi request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Lấy token từ localStorage

  if (token) {
    // Gửi token trong header "x-auth-token"
    config.headers['x-auth-token'] = token;
  }
  
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default API;
