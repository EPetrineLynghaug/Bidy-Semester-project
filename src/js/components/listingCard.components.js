export function listingCardComponent(listing, context = "home") {
  const { bids = [], seller = {}, media = [] } = listing;
  const card = document.createElement("div");

  const cardClass =
    context === "home"
      ? "auction-card border shadow-lg bg-white flex flex-col gap-3 rounded-lg overflow-hidden w-full" // Kompakte kort på forsiden
      : "auction-card border-b-2 p-3 bg-gray-100 max-w-xs mx-auto"; // Redusert padding for modalen

  card.className = cardClass;

  let currentBid = bids.length > 0 ? bids[bids.length - 1].amount : 0;
  card.innerHTML = `
  <!-- Image Section -->
  <div class="relative h-60 w-full overflow-hidden">
    <img
      src="${media[0] ? media[0].url : "https://via.placeholder.com/400x300"}"
      alt="${media[0]?.alt || "Auction image"}"
      class="w-full h-full object-cover">
  </div>

  <!-- Content Section -->
  <div class="relative bg-white p-3 flex flex-col h-auto"> 
    <!-- Avatar, Name, Created Date, and Expiry Section -->
    <div class="flex justify-between items-center text-base">
      <div class="flex items-center gap-2">
        <img src="${seller.avatar?.url || "https://via.placeholder.com/50"}"
          alt="${seller.avatar?.alt || "User avatar"}"
          class="w-10 h-10 rounded-full border-2 border-white shadow-md">
        <div>
          <a href="/profile?name=${seller?.name || ""}"
            class="text-sm font-normal text-blue-500 hover:underline">
            ${seller.name || "Unknown Author"}
          </a>
          <p class="text-sm text-gray-500 leading-tight font-normal">Posted: ${new Date(
            listing.created
          ).toLocaleDateString()}</p>
        </div>
      </div>
      <div class="flex items-center gap-1 mt-7 ">
  
       <i class="ph ph-clock text-gray-700 w-5 h-5"></i>
          <p class="text-sm text-gray-500 leading-tight font-normal">Expires: ${new Date(
            listing.endsAt
          ).toLocaleDateString()}</p>
      </div>
    </div>
    <hr class="my-1 border-t-1" style="border-color: #42A5F5;">
    <div class="flex flex-col gap-1"> <!-- Fjernet flex-grow -->
      <h1 class="text-lg font-semibold text-gray-800 leading-snug truncate">
        ${listing.title || "Untitled Auction"}
      </h1>
      <p class="text-base text-gray-700 leading-snug line-clamp-2 font-normal">
        ${listing.description || "No description available."}
      </p>
    </div>
    <hr class="my-1 border-t-1" style="border-color: #42A5F5;">
    <div class="flex items-center justify-between">
      <a href="/listing?id=${listing.id}"
        class="px-4 py-2 bg-[#28A745] text-white text-sm font-medium rounded-md hover:bg-[#1e7e34] transition-all duration-200 shadow-md">
        Bid Now
      </a>
      <p class="text-lg font-normal text-gray-800">
        $${currentBid.toFixed(
          2
        )} <span class="text-xs text-gray-500">/ Current bid</span>
      </p>
  
    </div>
  </div>
`; // Legg til event listener for delete-knappen

  return card;
}
