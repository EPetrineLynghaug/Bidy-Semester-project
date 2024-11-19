import { fetchProfile } from "../api/profile.api.js";

import { renderAuthLinks } from "../components/authLinks.js";
import { getStoredUserName } from "../utilities/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    let username = new URLSearchParams(window.location.search).get("name");

    if (!username) {
      username = getStoredUserName();
    }

    const profile = await fetchProfile(username);
    console.log("profile", profile);

    if (!profile) {
      alert("Failed to fetch profile data!");
      return;
    }

    // document.getElementById("profile-avatar").src =
    //   profile.avatar || "https://via.placeholder.com/100";
    // document.getElementById("profile-name").textContent =
    //   profile.name || "Unknown User";
    // document.getElementById("profile-email").textContent =
    //   profile.email || "No email available";
    // document.getElementById("profile-bio").textContent =
    //   profile.bio || "No bio provided.";

    // const auctionsList = document.getElementById("auctions-list");
    // if (profile.auctions && profile.auctions.length > 0) {
    //   auctionsList.innerHTML = "";
    //   profile.auctions.forEach((auction) => {
    //     const auctionCard = document.createElement("div");
    //     auctionCard.className = "border rounded-lg shadow p-4 bg-white";
    //     auctionCard.innerHTML = `
    //     <h3 class="text-lg font-bold">${
    //       auction.title || "Untitled Auction"
    //     }</h3>
    //     <p class="text-gray-600">${
    //       auction.description || "No description available."
    //     }</p>
    //     <p class="text-sm text-gray-500">Ends: ${new Date(
    //       auction.endsAt
    //     ).toLocaleDateString()}</p>
    //   `;
    //     auctionsList.appendChild(auctionCard);
    //   });
    // } else {
    //   auctionsList.innerHTML = `<p class="text-center text-gray-500">No auctions found.</p>`;
    // }
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    alert(
      "Something went wrong. Could not fetch profile. Please try again later."
    );
  }
});
