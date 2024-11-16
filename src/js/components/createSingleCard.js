import { generateBidRows } from "../utilities/renderBidHistory.js";
export function createSingleCard(listing) {
  const { bids, seller, media } = listing;

  const card = document.createElement("div");
  card.className =
    "detail-card border rounded-lg shadow-lg p-6 bg-gray-50 flex flex-col gap-6";

  let currentBid = 0;
  if (bids.length > 0) {
    currentBid = bids[bids.length - 1].amount;
  }

  card.innerHTML = `
    <div class="carousel relative w-full h-48 flex items-center justify-center overflow-hidden">
      <img src="${
        media[0] ? media[0].url : "https://via.placeholder.com/400x300"
      }"
           alt="${media[0] ? media[0].alt : "Auction image"}"
           class="w-full h-full object-cover rounded">
    </div>
    <h1 class="text-lg font-bold text-gray-800 truncate">${
      listing.title || "Untitled Auction"
    }</h1>
    <p class="text-sm text-gray-700 line-clamp-3">${
      listing.description || "No description available."
    }</p>
    <div class="auction-card__author flex items-center gap-2">
      <img src="${seller.avatar.url || "https://via.placeholder.com/50"}"
           alt="${seller.name || "Unknown Author"}"
           class="auction-card__author-image w-8 h-8 rounded-full">
      <a href="/src/views/profile.html?name=${seller?.name || ""}"
         class="auction-card__author-name text-sm text-blue-500 hover:underline">
        ${seller.name || "Unknown Author"}
      </a>
    </div>
    <div class="text-sm text-gray-500">
      <p>Posted: ${new Date(listing.created).toLocaleDateString()}</p>
      <p>Expires: ${new Date(listing.endsAt).toLocaleDateString()}</p>
    </div>
    <p class="text-sm text-gray-500">
      Current bid: ${currentBid}
    </p>
  `;

  // Bud-seksjonen
  const bidSection = document.createElement("div");
  bidSection.className = "info-card mt-4 border rounded-lg p-4 bg-gray-50";

  bidSection.innerHTML = `
    <h2 class="text-lg font-bold mb-4">Place Your Bid</h2>
    <form action="#" method="post">
      <div class="info-card-options mb-4">
        <div class="flex items-center gap-2">
          <input type="radio" id="bid-5" name="bid-amount" value="5">
          <label for="bid-5" class="text-sm">5 Coins</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="radio" id="bid-10" name="bid-amount" value="10">
          <label for="bid-10" class="text-sm">10 Coins</label>
        </div>
        <div class="flex items-center gap-2">
          <input type="radio" id="bid-15" name="bid-amount" value="15">
          <label for="bid-15" class="text-sm">15 Coins</label>
        </div>
      </div>
      <div class="divider divider-lg light mb-4"></div>
      <div class="info-card-actions">
        <label for="custom-bid" class="text-sm block mb-2">Or Enter Custom Bid:</label>
        <div class="info-card-actions-input flex gap-2 items-center">
          <input
            type="text"
            class="input border rounded-lg p-2 flex-1"
            id="custom-bid"
            name="custom-bid"
            placeholder="Enter custom amount"
          >
          <button
            type="submit"
            class="btn btn-basic form-submit-btn px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Place Bid
          </button>
        </div>
      </div>
    </form>
  `;

  card.appendChild(bidSection);

  // Budhistorikk
  const bidHistorySection = document.createElement("div");
  bidHistorySection.className = "bid-history mt-4 border-t pt-4";

  const initialBids = bids.slice(0, 3);
  const remainingBids = bids.slice(3);

  bidHistorySection.innerHTML = `
    <h3 class="text-lg font-bold text-gray-800 mb-2">Bid History</h3>
    <table class="w-full border-collapse border border-gray-300 text-sm text-left">
      <thead>
        <tr class="bg-gray-100">
          <th class="border border-gray-300 px-2 py-1">Bid Amount</th>
          <th class="border border-gray-300 px-2 py-1">Bidder</th>
          <th class="border border-gray-300 px-2 py-1">Date</th>
          <th class="border border-gray-300 px-2 py-1">Time</th>
        </tr>
      </thead>
      <tbody class="bid-history__body">
        ${generateBidRows(initialBids)}
      </tbody>
    </table>
    ${
      remainingBids.length > 0
        ? `<button class="toggle-btn mt-2 text-blue-500 hover:underline text-sm">Show More</button>`
        : ""
    }
  `;

  if (remainingBids.length > 0) {
    const toggleButton = bidHistorySection.querySelector(".toggle-btn");
    const bidBody = bidHistorySection.querySelector(".bid-history__body");
    let isExpanded = false;

    toggleButton.addEventListener("click", () => {
      isExpanded = !isExpanded;

      bidBody.innerHTML = isExpanded
        ? generateBidRows([...initialBids, ...remainingBids])
        : generateBidRows(initialBids);

      toggleButton.textContent = isExpanded ? "Show Less" : "Show More";
    });
  }

  card.appendChild(bidSection);
  card.appendChild(bidHistorySection);

  return card;
}
