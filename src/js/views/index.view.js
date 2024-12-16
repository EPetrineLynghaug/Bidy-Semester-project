// src/js/index.js
import { renderAuthLinks } from "../components/authLinks.js";
import { listingCardComponent } from "../components/listingCard.components.js";
import { fetchAuctionListings } from "../api/auctionListings.api.js";
import { openSearchModal } from "../components/search-modal.component.js";
import { renderFooter } from "../components/footer.components.js";

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

function setupSearchFunctionality() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");

  if (!searchInput || !searchButton) return;

  searchButton.addEventListener("click", (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (query) {
      openSearchModal(query);
    }
  });
}

async function loadAuctionListings() {
  const container = document.getElementById("my-auctions-container");
  if (!container) {
    console.error("Auction container element not found.");
    return;
  }

  try {
    const listings = await fetchAuctionListings(18, 1);
    renderAuctionListings(container, listings);
  } catch (error) {
    console.error("Error fetching auction listings:", error.message);
    container.innerHTML =
      "<p>Failed to load auction listings. Please try again later.</p>";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderAuthLinks(); 

  setupSearchFunctionality();

  loadAuctionListings(); 
  renderFooter();
});
