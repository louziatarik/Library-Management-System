
import { apiRequest } from "./api";

// Provisional authentication endpoints.
// Confirm paths and request formats with Nada.
const AUTH_ENDPOINTS = {
  login: "/auth/login",
  register: "/auth/register",
  me: "/auth/me",
  logout: "/auth/logout"
};

// Log in with user credentials.
// Response format depends on the backend.
export async function login(credentials) {
  return apiRequest(AUTH_ENDPOINTS.login, {
    method: "POST",
    body: JSON.stringify(credentials)
  });
}

// Register a new student account.
export async function register(userData) {
  return apiRequest(AUTH_ENDPOINTS.register, {
    method: "POST",
    body: JSON.stringify(userData)
  });
}

// Retrieve the authenticated user's profile.
export async function getCurrentUser() {
  return apiRequest(AUTH_ENDPOINTS.me, {
    method: "GET"
  });
}

// Log out the authenticated user.
export async function logout() {
  return apiRequest(AUTH_ENDPOINTS.logout, {
    method: "POST"
  });
}
