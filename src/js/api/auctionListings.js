import { API_AUCTION_LISTINGS, createHeaders } from "../apiConfig.js";

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
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");

    const imageUrl =
      listing.media?.[0]?.url || "https://via.placeholder.com/150";

    listingCard.innerHTML = `
      <h2>${listing.title}</h2>
      <p>${listing.description}</p>
      <small>Slutter: ${new Date(listing.endsAt).toLocaleDateString()}</small>
      <div>
        <img src="${imageUrl}" alt="${
      listing.media?.[0]?.alt || "Bilde av auksjon"
    }" />
      </div>
      <small>Antall bud: ${listing._count?.bids || 0}</small>
    `;

    listingsContainer.appendChild(listingCard);
  });

  console.log("Auksjonsoppføringer vist.");
}
