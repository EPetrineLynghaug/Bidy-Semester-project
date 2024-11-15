// Funksjon for å vise auksjonsoppføringer i en gitt container
export function renderAuctionListings(container, listings, createAuctionCard) {
  container.innerHTML = ""; // Rens container

  if (!listings || listings.length === 0) {
    container.innerHTML = "<p>Ingen auksjonsoppføringer tilgjengelig.</p>";
    console.log("Ingen oppføringer funnet eller tom respons.");
    return;
  }

  listings.forEach((listing) => {
    const listingCard = createAuctionCard(listing);
    container.appendChild(listingCard);
  });

  console.log("Auksjonsoppføringer vist.");
}
