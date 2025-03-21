// import axios from "axios";

// // Create an Axios instance for API communication
// const apiClient = axios.create({
//   baseURL: "http://localhost:3000", // JSON server URL
//   headers: {
//     "Content-Type": "application/json", // Ensure content type is set to JSON
//   },
// });

// // Login user function
// export const loginUser = async (data: { email: string; password: string }) => {
//   const response = await apiClient.post("/login", data); // API endpoint for login
//   return response.data;
// };

// // Register user function (POST request to /users)
// export const registerUser = async (data: {
//   name: string;
//   email: string;
//   password: string;
// }) => {
//   const response = await apiClient.post("/users", data); // POST request to create a user in the /users endpoint
//   return response.data;
// };

import apiClient from "./apiClient";

// Types for authentication
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
    // Add other user properties as needed
  };
}

/**
 * Login user function
 * @param credentials User login credentials
 * @returns Authentication response with token and user data
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/login", credentials);
  return response.data;
};

/**
 * Register user function
 * @param userData User registration data
 * @returns Authentication response with token and user data
 */
export const registerUser = async (
  userData: RegisterData
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>("/users", userData);
  return response.data;
};

/**
 * Logout user function
 * Clears the authentication token and any user data
 */
export const logoutUser = (): void => {
  localStorage.removeItem("token");
  // You can add additional cleanup here if needed
  // For example, clearing user data from state management
};

/**
 * Check if user is authenticated
 * @returns Boolean indicating if user has a token
 */
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

/**
 * Get current user profile
 * @returns User profile data
 */
export const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
  const response = await apiClient.get<AuthResponse["user"]>("/me");
  return response.data;
};
