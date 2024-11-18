import { renderAuthLinks } from "../components/authLinks.js";
import { fetchSingleCardDetails } from "../api/single.api.js";
import { renderAuctionDetails } from "../components/createSingleCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    const cardId = new URLSearchParams(window.location.search).get("id");

    if (!cardId) {
      throw new Error("No auction ID provided in URL");
    }

    const auctionData = await fetchSingleCardDetails(cardId);

    renderAuctionDetails(auctionData);
  } catch (error) {
    console.error("Error during initialization:", error.message);

    const container = document.querySelector(".container");
    if (container) {
      container.innerHTML = `<p class="text-red-500">Error loading page: ${error.message}</p>`;
    }
  }
});
