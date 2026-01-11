import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000", // backend server URL
  headers: {
    "Content-Type": "application/json"
  }
});

// Optional: Add a response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

export default api;
