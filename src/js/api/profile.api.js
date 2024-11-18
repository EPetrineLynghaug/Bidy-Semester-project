import { API_BASE } from "../api/constants.js"; 
import { createHeaders } from "../utilities/header.utilities.js"; 

export async function fetchProfile(username) {
  try {
    if (!username) throw new Error("Username is required to fetch profile.");

   const url = `${API_BASE}/auth/profile/${username}?_auctions=true&_followers=true`;
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch profile: ${response.status}`);
    }

    const result = await response.json();
    const profile = result.data;

    if (profile && profile.auctions) {
      
      console.log("Profile fetched with auctions:", profile.auctions);
    }

    return profile; 
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    return {}; 
  }
}
