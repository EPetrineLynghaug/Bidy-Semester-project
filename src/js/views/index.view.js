// src/js/index.js
import { renderAuthLinks } from "../components/authLinks.js";
import { listingCardComponent } from "../components/listingCard.components.js";
import { fetchAuctionListings } from "../api/auctionListings.api.js";
import { openSearchModal } from "../components/search-modal.component.js";

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

    const listingsContainer = document.getElementById("listings-container");
    if (!listingsContainer) throw new Error("Listings container not found");

    const listings = await fetchAuctionListings(18, 1);
    renderAuctionListings(listingsContainer, listings);

    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");

    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      openSearchModal(searchInput.value);
    });
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
});
