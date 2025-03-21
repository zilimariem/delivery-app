import axios from "axios";

// Create an Axios instance with base configuration
const apiClient = axios.create({
  baseURL: "http://localhost:3000", // Replace with your backend URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor to add the authentication token if available
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle authentication errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors (expired token or not authenticated)
    if (error.response && error.response.status === 401) {
      // Clear the invalid token
      localStorage.removeItem("token");

      // Redirect to login page
      // Using window.location instead of navigate because this code might run outside of React components
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
