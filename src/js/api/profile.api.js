import { API_AUCTION_LISTINGS, API_PROFILE } from "../api/constants.js";
import { createHeaders } from "../utilities/header.utillities.js";

//Get my  profile//
export async function fetchProfile(name) {
  try {
    if (!name) throw new Error("Username is required to fetch profile.");

    const url = `${API_PROFILE}/${name}`;

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

// update auction post//
export async function getAllProfileAuction(name) {
  try {
    const response = await fetch(
      `${API_PROFILE}/${name}/listings?&_bids=true`,
      {
        method: "GET",
        headers: createHeaders(true),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.status}`);
    }

    const result = await response.json();

    const updatedAuction = result.data;

    return updatedAuction;
  } catch (error) {}
}

//Make new aution//
export async function createauction(formData) {
  try {
    const response = await fetch(
      `${API_AUCTION_LISTINGS}?_bids=true&_seller=true`,
      {
        method: "POST",
        headers: createHeaders(true),
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to create auction listing: ${response.status}`);
    }

    const result = await response.json();

    const data = result.data;

    return data;
  } catch (error) {}
}

//edit auction
export async function editAuction(id, formData) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
      method: "PUT",
      headers: createHeaders(true),
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update auction listing: ${response.status}`);
    }

    const result = await response.json();

    const data = result.data;

    return data;
  } catch (error) {
    console.error("error editing auction listings", error.message);
  }
}

export async function deleteAuction(id) {
  try {
    const response = await fetch(`${API_AUCTION_LISTINGS}/${id}`, {
      method: "DELETE",
      headers: createHeaders(true),
    });

    if (!response.ok) {
      throw new Error(`Failed to delete auction listing: ${response.status}`);
    }
    if (response.status === 204) {
      return true;
    }
    return false;
  } catch (error) {
    if (error.name === "TypeError") {
      console.error("Network error or request failed:", error.message);
    } else if (error.message.includes("Response Status")) {
      console.error(`Failed to delete post (ID: ${id}):`, error.message);
    } else {
      console.error(
        "An unexpected error occurred while deleting the post:",
        error.message
      );
    }
    throw error;
  }
}

//update profile
export async function upDateProfil(name, profile) {
  try {
    const response = await fetch(`${API_PROFILE}/${name}`, {
      method: "PUT",
      headers: createHeaders(true),
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      throw new Error(`Failed to update profile: ${response.status}`);
    }

    const result = await response.json();

    const profileData = result.data;

    return profileData;
  } catch (error) {
    console.error("Error updating profile:", error.message);
    throw error;
  }
}

export async function getProfileAuctionWins(name) {
  try {
    const response = await fetch(
      `${API_PROFILE}/${name}/wins?_bids=true&_active=true`,
      {
        method: "GET",
        headers: createHeaders(true),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const result = await response.json();

    const auctionWins = result.data;

    return auctionWins;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}
