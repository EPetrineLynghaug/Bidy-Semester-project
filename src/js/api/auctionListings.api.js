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

export async function readeProfiles(name, page = 1) {
  try {
    const url = `${API_AUCTION_LISTINGS}/${name}/listings?sort=created&sortOrder=desc&limit=18&page=${page}&_seller=true&_bids=true&_active=true`;

    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch profile listings: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching profile listings:", error.message);
    throw error;
  }
}
//search//
export async function searchAuctionListings(searchQuery) {
  const encodedSearchQuery = encodeURIComponent(searchQuery);
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}/search?q=${encodedSearchQuery}&sort=created`,
      {
        method: "GET",
        headers: createHeaders(),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch search results: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    throw error;
  }
}
