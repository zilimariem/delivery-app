// import apiClient from "./apiClient";

// // Types for authentication
// export interface LoginCredentials {
//   email: string;
//   password: string;
// }

// export interface RegisterData {
//   name: string;
//   email: string;
//   password: string;
//   confirmPassword: string;
// }

// export interface AuthResponse {
//   token: string;
//   user: {
//     id: string;
//     name: string;
//     email: string;
//     // Add other user properties as needed
//   };
// }

// /**
//  * Login user function
//  * @param credentials User login credentials
//  * @returns Authentication response with token and user data
//  */
// export const loginUser = async (
//   credentials: LoginCredentials
// ): Promise<AuthResponse> => {
//   const response = await apiClient.post<AuthResponse>(
//     "/auth/login",
//     credentials
//   );
//   return response.data;
// };

// /**
//  * Register user function
//  * @param userData User registration data
//  * @returns Authentication response with token and user data
//  */
// export const registerUser = async (
//   userData: RegisterData
// ): Promise<AuthResponse> => {
//   const response = await apiClient.post<AuthResponse>(
//     "/users/client",
//     userData
//   );
//   return response.data;
// };

// /**
//  * Logout user function
//  * Clears the authentication token and any user data
//  */
// export const logoutUser = (): void => {
//   localStorage.removeItem("token");
//   // You can add additional cleanup here if needed
//   // For example, clearing user data from state management
// };

// /**
//  * Check if user is authenticated
//  * @returns Boolean indicating if user has a token
//  */
// export const isAuthenticated = (): boolean => {
//   return !!localStorage.getItem("token");
// };

// /**
//  * Get current user profile
//  * @returns User profile data
//  */
// export const getCurrentUser = async (): Promise<AuthResponse["user"]> => {
//   const response = await apiClient.get<AuthResponse["user"]>("/auth/me");
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
    role: string; // Ajoutez cette ligne
  };
}

export interface SetPasswordData {
  token: string;
  password: string;
}

/**
 * Login user function
 * @param credentials User login credentials
 * @returns Authentication response with token and user data
 */
export const loginUser = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials
  );
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
  const response = await apiClient.post<AuthResponse>(
    "/users/client",
    userData
  );
  return response.data;
};

/**
 * Set password after account activation
 * @param setPasswordData Token and new password
 * @returns Success message or error
 */
export const setPassword = async (
  setPasswordData: SetPasswordData
): Promise<{ message: string }> => {
  const response = await apiClient.post<{ message: string }>(
    "/auth/set-password",
    setPasswordData
  );
  return response.data;
};

/**
 * Logout user function
 * Clears the authentication token and any user data
 */
export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
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
  const response = await apiClient.get<AuthResponse["user"]>("/auth/me");
  return response.data;
};