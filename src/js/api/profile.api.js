import { API_AUCTION, API_PROFILE } from "../api/constants.js";
import { createHeaders } from "../utilities/header.utillities.js";

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
    console.log(" result:", result);
    const profile = result.data;

    return profile;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
}

export async function upateprofile() {}
