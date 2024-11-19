import { TOKEN_STORAGE_KEY, API_KEY } from "../api/constants.js";

export function createHeaders(requireAuth = false) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  });

  if (requireAuth) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    console.log("Access token:", token);
    if (!token) throw new Error("Authorization required but no token found");
    headers.append("Authorization", `Bearer ${token}`);
  }

  return headers;
}
