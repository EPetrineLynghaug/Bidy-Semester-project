import { API_AUCTION_LISTINGS } from "../api/constants.js";
import { createHeaders } from "../utilities/header.utillities.js";

// Funksjon for å hente auksjonsoppføringer fra API

export async function fetchAuctionListings(limit = 18, page = 1) {
  const url = `${API_AUCTION_LISTINGS}?sort=created&sortOrder=desc&limit=${limit}&page=${page}&_seller=true&_bids=true&_active=true`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });
    if (!response.ok)
      throw new Error(`Failed to fetch listings: ${response.status}`);
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching auction listings:", error.message);
  }
}
console.log("auctionListings.js lastet!");
