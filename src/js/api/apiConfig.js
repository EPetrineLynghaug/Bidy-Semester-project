export const API_KEY = "dfb248fb-4b53-482d-8014-45a16e62a1c5";
export const TOKEN_STORAGE_KEY = "token";
export const API_BASE = "https://v2.api.noroff.dev";

export const API_AUTH = `${API_BASE}/auth`;
export const API_AUTH_LOGIN = `${API_AUTH}/login`;
export const API_AUTH_REGISTER = `${API_AUTH}/register`;

export const API_AUCTION_LISTINGS = `${API_BASE}/auction/listings`;

export function createHeaders(requireAuth = false) {
  const headers = new Headers({
    "Content-Type": "application/json",
    "X-Noroff-API-Key": API_KEY,
  });

  if (requireAuth) {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (token) {
      headers.append("Authorization", `Bearer ${token}`);
    } else {
      console.error("Ingen token funnet. Brukeren er ikke logget inn.");
      throw new Error("Autorisering kreves, men ingen token funnet.");
    }
  }

  return headers;
}
