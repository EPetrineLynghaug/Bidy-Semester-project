// src/js/index.js
import { renderAuthLinks } from "../components/authLinks.js";
import { listingCardComponent } from "../components/listingCard.components.js";
import { fetchAuctionListings } from "../api/auctionListings.api.js";

function renderAuctionListings(container, listings) {
  container.innerHTML = ""; // Fjern tidligere oppføringer

  if (!listings || listings.length === 0) {
    container.innerHTML = "<p>No auction listings available.</p>";
    return;
  }

  listings.forEach((listing) => {
    const card = listingCardComponent(listing); // Opprett DOM-element
    container.appendChild(card); // Legg til elementet i containeren
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    const listingsContainer = document.getElementById("listings-container");
    if (!listingsContainer) throw new Error("Listings container not found");

    const listings = await fetchAuctionListings(10, 1);
    renderAuctionListings(listingsContainer, listings);
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
});

console.log("index.js initialized.");
