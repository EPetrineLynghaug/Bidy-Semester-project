import { API_AUCTION_LISTINGS, createHeaders } from "../apiConfig.js";
import { createAuctionCard } from "../ui/createAuctionCard.js";

console.log("auctionListings.js lastet!");

// Funksjon for å hente auksjonsoppføringer fra API
export async function fetchAuctionListings(limit = 10, page = 1) {
  try {
    const url = `${API_AUCTION_LISTINGS}?limit=${limit}&page=${page}`;
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Feil status fra API: ${response.status}`);
    }

    const result = await response.json();
    console.log("API-respons for auksjonsoppføringer:", result);
    return result.data;
  } catch (error) {
    console.error("Feil ved henting av auksjoner:", error.message);
    return null;
  }
}

// Funksjon for å vise auksjonsoppføringer på siden
export async function displayAuctions() {
  const listingsContainer = document.getElementById("listings-container");
  listingsContainer.innerHTML = "";

  const listings = await fetchAuctionListings(10, 1);

  if (!listings || listings.length === 0) {
    listingsContainer.innerHTML =
      "<p>Ingen auksjonsoppføringer tilgjengelig.</p>";
    console.log("Ingen oppføringer funnet eller tom respons.");
    return;
  }

  listings.forEach((listing) => {
    const listingCard = createAuctionCard(listing);
    listingsContainer.appendChild(listingCard);
  });

  console.log("Auksjonsoppføringer vist.");
}
displayAuctions();
