import { API_AUCTION_LISTINGS } from "./constants.js";
import { createHeaders } from "../utilities/header.utillities.js";

// Funksjon for å hente auksjonsoppføringer fra API

export async function fetchAuctionListings(limit = 18, page = 1) {
  const url = `${API_AUCTION_LISTINGS}?limit=${limit}&page=${page}&_seller=true&_bids=true`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });
    if (!response.ok)
      throw new Error(`Failed to fetch listings: ${response.status}`);
    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Error fetching auction listings:", error.message);
    return [];
  }
}
console.log("auctionListings.js lastet!");
