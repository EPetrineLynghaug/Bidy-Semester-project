export function listingCardComponent(listing, context = "home") {
  const { bids = [], seller = {}, media = [] } = listing;
  const card = document.createElement("div");

  // Bruk forskjellige klasser basert på konteksten
  const cardClass =
    context === "home"
      ? "auction-card border shadow-lg bg-white flex flex-col gap-4 rounded-lg overflow-hidden"
      : "auction-card border-b-2 p-4 bg-gray-100";

  card.className = cardClass;

  let currentBid = bids.length > 0 ? bids[bids.length - 1].amount : 0;

  card.innerHTML = `
    <!-- Image Section covering entire top -->
    <div class="relative h-48 w-full">
      <img
        src="${media[0] ? media[0].url : "https://via.placeholder.com/400x300"}"
        alt="${media[0]?.alt || "Auction image"}"
        class="absolute top-0 left-0 w-full h-full object-cover">
    </div>

    <!-- Content Section -->
    <div class="relative bg-white p-4">
  <!-- Avatar, Name, Created Date, and Expiry Section -->
<div class="flex justify-between items-center">
  <!-- Left: Avatar and Name -->
  <div class="flex items-center gap-3">
    <img src="${seller.avatar?.url || "https://via.placeholder.com/50"}"
      alt="${seller.avatar?.alt || "User avatar"}"
      class="w-10 h-10 rounded-full border-2 border-white shadow-md">
    <div>
      <a href="/profile?name=${seller?.name || ""}"
        class="text-sm font-semibold text-blue-500 hover:underline">
        ${seller.name || "Unknown Author"}
      </a>
      <p class="text-xs text-gray-500">Posted: ${new Date(
        listing.created
      ).toLocaleDateString()}</p>
    </div>
  </div>

  <!-- Right: Timeglass Icon and Expiry Date -->
  <div class="flex items-center gap-2">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="w-5 h-5 text-gray-500"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7V3h8v4M8 17v4h8v-4M7 3h10M7 21h10M12 8v8M10 8h4v8h-4z"/>
    </svg>
    <p class="text-sm text-gray-500">Expires: ${new Date(
      listing.endsAt
    ).toLocaleDateString()}</p>
  </div>
</div>

      <!-- Divider -->
      <hr class="my-4">

<!-- Text Content -->
<div class="flex flex-col gap-4">
  <!-- Title -->
  <h1 class="text-lg font-bold text-gray-800 truncate">${
    listing.title || "Untitled Auction"
  }</h1>
  
  <!-- Description with consistent height -->
<p class="text-sm text-gray-700 line-clamp-2">${
    listing.description || "No description available."
  }</p>

  <!-- Divider -->
  <hr class="my-4 border-t-2 border-gray-200">

  <!-- Current Bid and Button -->
  <div class="flex items-center justify-between mt-2">
    <!-- Styled Button -->
    <a href="/listing?id=${listing.id}"
      class="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition-all duration-200 shadow-sm">
      View Details
    </a>
    <!-- Bid Info -->
    <p class="text-sm text-gray-500">
      $${currentBid.toFixed(2)} / Current bid
    </p>
  </div>
</div>
  `;

  return card;
}
