
import { getAccessToken } from "./tokenStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

async function apiRequest(endpoint, options = {}) {
  const headers = new Headers(options.headers);

  // Automatically attach the JWT access token when available.
  // Explicit Authorization headers take priority.
  const token = getAccessToken();

  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  // Set JSON content type when sending a JSON request body.
  if (
    options.body != null &&
    !(options.body instanceof FormData)
  ) {
    if (!headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
  }

  const response = await fetch(
    `${API_BASE_URL}${endpoint}`,
    {
      ...options,
      headers
    }
  );

  // Handle backend errors.
  if (!response.ok) {
    let message = `Request failed: ${response.status}`;

    try {
      const error = await response.json();

      message =
        error.detail ||
        error.message ||
        message;
    } catch {
      // Keep the default error message.
    }

    throw new Error(
      typeof message === "string"
        ? message
        : JSON.stringify(message)
    );
  }

  // Handle successful responses without a body.
  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export { apiRequest, API_BASE_URL };
