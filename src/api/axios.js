import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api", // Use .env for deployment
  timeout: 5000, // Set timeout (optional)
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
