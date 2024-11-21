import { API_AUCTION_LISTINGS, API_PROFILE } from "../api/constants.js";
import { createHeaders } from "../utilities/header.utillities.js";

//Get my  profile//
export async function fetchProfile(name) {
  try {
    if (!name) throw new Error("Username is required to fetch profile.");

    const url = `${API_PROFILE}/${name}`;
    console.log(`Fetching profile for user: ${url}`);
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(true),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const result = await response.json();

    const profile = result.data;

    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}

//Make new aution//

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
// update auction post//
export async function updateAuction(name) {
  try {
    const response = await fetch(`${API_PROFILE}/${name}/listings`, {
      method: "GET",
      headers: createHeaders(true),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.status}`);
    }

    const result = await response.json();
    console.log("API response:", result);
    const updatedAuction = result.data;

    return updatedAuction;
  } catch (error) {
    console.log("error updating profile", error.message);
  }
}

export async function upateprofile() {}
