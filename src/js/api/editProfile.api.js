import { API_AUCTION_LISTINGS } from "../api/constants.js";
import { createHeaders } from "../utilities/header.utillities.js";

export async function createauction(formData) {
  console.log("Data sent to API:", formData);
  try {
    const response = await fetch(API_AUCTION_LISTINGS, {
      method: "POST",
      headers: createHeaders(true),
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create auction listing: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);
    const data = result.data;

    return data;
  } catch (error) {
    console.log("error creating auction listings", error.message);
  }
}
