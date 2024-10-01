//src/axiosInstance.js
import axios from 'axios';

// Create an axios instance
const axiosInstance = axios.create({
  baseURL: 'https://localhost:7175/api', // Replace with your API base URL
});

// Add a request interceptor to include the Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Assuming you store the token in localStorage
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;