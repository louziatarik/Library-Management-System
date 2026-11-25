import { apiRequest } from "./api";
import { saveAccessToken, clearAccessToken } from "./tokenStorage";

export async function login(credentials) {
  const result = await apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials)
  });

  saveAccessToken(result.token);
  return result;
}

export async function register(userData) {
  const result = await apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(userData)
  });

  saveAccessToken(result.token);
  return result;
}

export async function getCurrentUser() {
  return apiRequest("/api/auth/me", {
    method: "GET"
  });
}

export async function forgotPassword(email) {
  return apiRequest("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email })
  });
}

export async function resetPassword(token, newPassword) {
  return apiRequest("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ token, newPassword })
  });
}

export function logout() {
  clearAccessToken();
}
