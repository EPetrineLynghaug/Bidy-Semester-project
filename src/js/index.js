import { renderAuthLinks } from "./components/authLinks.js";
import { fetchAuctionListings } from "./api/auctionListings.js";
import { renderAuctionListings } from "./ui/displayListings.js";
import { createAuctionCard } from "./ui/createAuctionCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  // Oppdater autentiseringslenker
  renderAuthLinks();

  // Hent og vis auksjonsoppføringer
  const listingsContainer = document.getElementById("listings-container");

  if (!listingsContainer) {
    console.error("Container for auksjonsoppføringer ikke funnet.");
    return;
  }

  const listings = await fetchAuctionListings(10, 1);
  renderAuctionListings(listingsContainer, listings, createAuctionCard);
});

console.log("index.js lastet og kjører");
