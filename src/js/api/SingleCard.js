import { API_BASE, createHeaders } from "./apiConfig.js";
import { API_BASE, createHeaders } from "./apiConfig.js";

export async function fetchSingleCardDetails(id) {
  try {
    const url = `${API_BASE}/auction/listings/${id}`;
    console.log(`Fetching details for card ID: ${id}`);
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching auction details (status: ${response.status})`
      );
    }

    const details = await response.json();
    console.log("Auction details fetched successfully:", details);
    return details;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    alert(
      "Something went wrong. Could not fetch auction details. Please try again later."
    );
    return null;
  }
}
