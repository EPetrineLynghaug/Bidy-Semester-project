import { API_AUCTION_LISTINGS, createHeaders } from "./apiConfig.js";

console.log("auctionListings.js lastet!");

// Funksjon for å hente auksjonsoppføringer fra API
export async function fetchAuctionListings(limit = 10, page = 1) {
  try {
    const url = `${API_AUCTION_LISTINGS}?limit=${limit}&page=${page}`;
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`API-feil med statuskode ${response.status}`);
    }

    const result = await response.json();
    console.log("API-respons for auksjonsoppføringer:", result);
    return result.data || [];
  } catch (error) {
    console.error("Feil ved henting av auksjoner:", error.message);
    alert("Kunne ikke hente auksjonsoppføringer. Prøv igjen senere.");
    return [];
  }
}
