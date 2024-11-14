// Funksjon som lager et auksjonskort basert på data
export function createAuctionCard(listing) {
    const listingCard = document.createElement("div");
    listingCard.classList.add("listing-card");
  
    const imageUrl = listing.media?.[0]?.url || "https://via.placeholder.com/150";
  
    listingCard.innerHTML = `
      <h2>${listing.title}</h2>
      <p>${listing.description}</p>
      <small>Slutter: ${new Date(listing.endsAt).toLocaleDateString()}</small>
      <div>
        <img src="${imageUrl}" alt="${listing.media?.[0]?.alt || "Bilde av auksjon"}" />
      </div>
      <small>Antall bud: ${listing._count?.bids || 0}</small>
    `;
  
    return listingCard;
  }