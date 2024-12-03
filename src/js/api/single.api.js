import { createHeaders } from "../utilities/header.utillities.js";
import { API_AUCTION_LISTINGS } from "./constants.js";

export async function fetchSingleCardDetails(id) {
  try {
    const url = `${API_AUCTION_LISTINGS}/${id}?_seller=true&_bids=true`;
    console.log(`Fetching details for card ID: ${id}`);
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(true),
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
//bids//
export async function Bid(id, Bid) {
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}/${id}/bids?_bids=true`,
      {
        method: "POST",
        headers: createHeaders(true),
        body: JSON.stringify(Bid),
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to create auction listing: ${response.status}`);
    }

    const result = await response.json();

    const data = result.data;

    return data;
  } catch (error) {
    console.log("error creating auction listings", error.message);
  }
}
