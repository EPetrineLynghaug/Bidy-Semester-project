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
        `Error fetching auction details (status: ${response.status})`,
      );
    }

    const res = await response.json();
    return res.data;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    alert(
      "Something went wrong. Could not fetch auction details. Please try again later.",
    );
    return null;
  }
}

// Extract the ID from the URL query string (assuming the URL is like /singleCard.html?id=123)
const urlParams = new URLSearchParams(window.location.search);
const cardId = urlParams.get("id");

if (cardId) {
  // Fetch the auction details and then render it
  const listing = await fetchSingleCardDetails(cardId);

  console.log(listing);

  createSingleCard(listing);

  // .then((details) => {
  //   if (details) {
  //     // Call your UI function to render the details
  //     createSingleCard(details);
  //   }
  // })
  // .catch((error) => {
  //   console.error("Error:", error);
  //   alert("Could not fetch the card details. Please try again later.");
  // });
} else {
  console.log("No card ID provided in the URL");
  alert("Invalid request. No card ID found.");
}
