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

    const myAuctionsContainer = document.getElementById(
      "my-auctions-container"
    );
    if (!myAuctionsContainer) throw new Error("myAuctions container not found");

    const listings = await fetchAuctionListings(18, 1);
    renderAuctionListings(myAuctionsContainer, listings);

    const searchInput = document.querySelector("#search-input");
    const searchButton = document.querySelector("#search-button");

    searchButton.addEventListener("click", (e) => {
      e.preventDefault();
      openSearchModal(searchInput.value);
    });

    // const myAuctionsContainer = document.querySelectorAll(
    //   "#my-auctions-container"
    // );
    // console.log("myAuctionsContainer:", myAuctionsContainer);
  } catch (error) {
    console.error("Error during initialization:", error.message);
  }
});
