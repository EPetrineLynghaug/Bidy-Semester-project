export function listingCardComponent(listing, context = "home") {
  const { bids = [], seller = {}, media = [] } = listing;
  const card = document.createElement("div");

  // Bruk forskjellige klasser basert på konteksten
  const cardClass =
    context === "home"
      ? "auction-card border shadow-lg p-4 bg-white flex flex-col gap-4"
      : "auction-card border-b-2 p-4 bg-gray-100";

  card.className = cardClass;

  let currentBid = bids.length > 0 ? bids[bids.length - 1].amount : 0;

  card.innerHTML = `
    <div class="carousel relative w-full h-48 flex items-center justify-center overflow-hidden">
      <img src="${
        media[0] ? media[0].url : "https://via.placeholder.com/400x300"
      }"
        alt="${media[0]?.alt || "Auction image"}"
        class="w-full h-full object-cover rounded">
    </div>
    <h1 class="text-lg font-bold text-gray-800 truncate">${
      listing.title || "Untitled Auction"
    }</h1>
    <p class="text-sm text-gray-700 line-clamp-3">${
      listing.description || "No description available."
    }</p>
    <div class="auction-card__author flex items-center gap-2">
      <img src="${seller.avatar?.url || "https://via.placeholder.com/50"}"
        alt="${seller.avatar?.alt || ""}"
        class="w-8 h-8 rounded-full">
      <a href="/profile?name=${seller?.name || ""}"
        class="text-sm text-blue-500 hover:underline">
        ${seller.name || "Unknown Author"}
      </a>
    </div>
    <div class="text-sm text-gray-500">
      <p>Posted: ${new Date(listing.created).toLocaleDateString()}</p>
      <p>Expires: ${new Date(listing.endsAt).toLocaleDateString()}</p>
    </div>
    <p class="text-sm text-gray-500">Current bid: ${currentBid}</p>
    <a href="/listing?id=${listing.id}"
      class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 text-center">
      View Details
    </a>`;
  return card;
}
