import { API_AUCTION_LISTINGS } from "../api/constants.js";
import { createHeaders } from "../utilities/header.utillities.js";

// Funksjon for å hente auksjonsoppføringer fra API
export async function fetchAuctionListings(limit = 18, page = 1) {
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}?sort=created&sortOrder=desc&limit=${limit}&page=${page}&_seller=true&_bids=true&_active=true`,
      {
        method: "GET",
        headers: createHeaders(),
      }
    );
    console.log(response);
    if (!response.ok) {
      const errorMessage = `Failed to fetch listings: ${response.status} ${response.statusText}`;
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching auction listings:", error.message);
  }
}
// export async function fetchAuctionListings(limit = 18, page = 1) {
//   const url = `${API_AUCTION_LISTINGS}?sort=created&sortOrder=desc&limit=${limit}&page=${page}&_seller=true&_bids=true&_active=true`;
//   try {
//     const response = await fetch(url, {
//       method: "GET",
//       headers: createHeaders(),
//     });
//     if (!response.ok)
//       throw new Error(`Failed to fetch listings: ${response.status}`);
//     const result = await response.json();
//     return result.data;
//   } catch (error) {
//     console.error("Error fetching auction listings:", error.message);
//   }
// }

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
export async function searchAuctionListings(searchQuery, page = 1, limit = 12) {
  const encodedSearchQuery = encodeURIComponent(searchQuery);

  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}/search?sort=created&sortOrder=desc&limit=${limit}&page=${page}&_seller=true&_bids=true&q=${encodedSearchQuery}`,
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
    return {
      listings: result.data,
      pagination: {
        current: result.meta.currentPage,
        total: result.meta.pageCount,
        next: result.meta.nextPage,
        previous: result.meta.previousPage,
      },
    };
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    throw error;
  }
}
