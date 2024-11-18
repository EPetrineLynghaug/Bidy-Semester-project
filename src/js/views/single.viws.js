import { renderAuthLinks } from "../components/authLinks.js";
import { fetchSingleCardDetails } from "../api/single.api.js";
import { createSingleCard } from "../components/createSingleCard.js";

function renderSingleCard(container, listing) {
  container.innerHTML = "";

  if (!listing) {
    container.innerHTML = "<p>No auction listing available.</p>";
    return;
  }

  const card = createSingleCard(listing);
  container.appendChild(card);
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    const listingsContainer = document.getElementById("single-card-container");
    if (!listingsContainer) throw new Error("single-card-container not found");

    const cardId = new URLSearchParams(window.location.search).get("id");
    if (!cardId) throw new Error("No card ID provided in URL");

    const listing = await fetchSingleCardDetails(cardId);
    if (!listing) throw new Error("No listing data returned from API");

    renderSingleCard(listingsContainer, listing);
  } catch (error) {
    console.error("Error during initialization:", error.message);

    const listingsContainer = document.getElementById("single-card-container");
    if (listingsContainer) {
      listingsContainer.innerHTML = `<p>Error loading auction details: ${error.message}</p>`;
    }
  }
});
