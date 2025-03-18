import axios from 'axios';

// Create an Axios instance with a base URL for the backend API
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000/api',  // Adjust the base URL to match your backend
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
