
const TOKEN_KEY = "booknest_access_token";

export function getAccessToken() {
  return sessionStorage.getItem(TOKEN_KEY);
}

export function saveAccessToken(token) {
  if (typeof token !== "string" || !token.trim()) {
    throw new Error("A valid access token is required.");
  }

  sessionStorage.setItem(TOKEN_KEY, token);
}

export function clearAccessToken() {
  sessionStorage.removeItem(TOKEN_KEY);
}
