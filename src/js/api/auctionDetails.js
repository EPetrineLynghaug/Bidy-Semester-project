import { API_BASE, createHeaders } from "./apiConfig.js";

export async function fetchAuctionDetails(id) {
  try {
    const url = `${API_BASE}/auction/listings/${id}`;
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Feil ved henting av auksjonsdetaljer: ${response.status}`
      );
    }

    const details = await response.json();
    return details;
  } catch (error) {
    console.error("Feil ved henting av detaljer:", error.message);
    return null;
  }
}
