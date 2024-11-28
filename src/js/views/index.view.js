// src/js/index.js
import { renderAuthLinks } from "../components/authLinks.js";
import { listingCardComponent } from "../components/listingCard.components.js";
import { fetchAuctionListings } from "../api/auctionListings.api.js";
import { searchListing } from "../utilities/searchListing.utillities.js";

function renderAuctionListings(container, listings) {
  container.innerHTML = "";
  if (!listings || listings.length === 0) {
    container.innerHTML = "<p>No auction listings available.</p>";
    return;
  }

  listings.forEach((listing) => {
    const card = listingCardComponent(listing);
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    searchListing();

    const listingsContainer = document.getElementById("listings-container");
    if (!listingsContainer) throw new Error("Listings container not found");

    const listings = await fetchAuctionListings(18, 1);
    console.log("Fetched Listings:", listings);
    renderAuctionListings(listingsContainer, listings);
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
});
