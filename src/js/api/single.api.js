import { createHeaders } from "../utilities/header.utillities.js";
import { API_AUCTION_LISTINGS } from "./constants.js";

export async function fetchSingleCardDetails(id) {
  try {
    const url = `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`;
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

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    alert(
      "Something went wrong. Could not fetch auction details. Please try again later."
    );
    return null;
  }
}
