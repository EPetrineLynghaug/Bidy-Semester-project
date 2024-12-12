// Helper function to update DOM elements
const updateElement = (selector, value, isHTML = false) => {
  const element = document.querySelector(selector);
  if (element) {
    element[isHTML ? "innerHTML" : "textContent"] = value || "";
  }
};

// Generate bid rows for the bid history
const generateBidRow = (bid) => {
  const bidDate = new Date(bid.created);
  return `
    <tr>
      <td class="border px-4 py-2">${bid.amount} Coins</td>
      <td class="border px-4 py-2">${bid.bidder?.name || "Anonymous"}</td>
      <td class="border px-4 py-2">${bidDate.toLocaleDateString()}</td>
      <td class="border px-4 py-2">${bidDate.toLocaleTimeString()}</td>
    </tr>`;
};

// Handle the visibility and toggling of older bids
const createToggleForOlderBids = (bidHistoryBody, remainingBids) => {
  const newToggleContainer = document.createElement("div");
  newToggleContainer.className = "text-center mt-4 toggle-container";

  const toggleButton = document.createElement("button");
  toggleButton.innerHTML = "View More ↓";
  toggleButton.className =
    "text-blue-500 hover:underline text-sm cursor-pointer";

  let isExpanded = false;

  toggleButton.addEventListener("click", () => {
    if (isExpanded) {
      const rows = bidHistoryBody.querySelectorAll(".extra-bid-row");
      rows.forEach((row) => row.remove());
      toggleButton.innerHTML = "View More ↓";
    } else {
      remainingBids.forEach((bid) => {
        const row = document.createElement("tr");
        row.className = "extra-bid-row";
        row.innerHTML = generateBidRow(bid);
        bidHistoryBody.appendChild(row);
      });
      toggleButton.innerHTML = "View Less ↑";
    }
    isExpanded = !isExpanded;
  });

  newToggleContainer.appendChild(toggleButton);
  bidHistoryBody.parentElement.appendChild(newToggleContainer);
};

// Render auction details and bid history
// Render auction details and bid history
export function renderAuctionDetails(auctionData) {
  if (!auctionData) return;

  // Sort bids by amount in descending order to get the highest bids
  const sortedBids = auctionData.bids.sort((a, b) => b.amount - a.amount);

  // Get the highest bid for the current bid display
  const currentBid = sortedBids.length > 0 ? sortedBids[0].amount : 0;

  // Update auction data elements
  updateElement("#seller-name", auctionData.seller?.name || "Unknown Seller");

  const sellerAvatar = document.querySelector("#seller-avatar");
  if (sellerAvatar) {
    sellerAvatar.src =
      auctionData.seller?.avatar?.url || "https://via.placeholder.com/50";
    sellerAvatar.alt = auctionData.seller?.name || "Seller Avatar";

    sellerAvatar.onerror = () => {
      sellerAvatar.src = "https://via.placeholder.com/50";
      sellerAvatar.alt = "Failed to load seller avatar";
    };
  }

  updateElement("#auction-title", auctionData.title || "Untitled Auction");
  updateElement(
    "#auction-description",
    auctionData.description || "No description available."
  );
  updateElement(
    "#auction-posted-date",
    `Posted: ${new Date(auctionData.created).toLocaleDateString()}`
  );
  updateElement(
    "#auction-expiry-date",
    `Expires: ${new Date(auctionData.endsAt).toLocaleDateString()}`
  );
  updateElement("#current-bid", `Current bid: ${currentBid || "0 Coins"}`);

  const auctionImage = document.querySelector("#auction-image");
  if (auctionImage) {
    auctionImage.src =
      auctionData.media?.[0]?.url || "https://via.placeholder.com/400x300";
    auctionImage.alt = auctionData.title || "Auction Image";

    auctionImage.onerror = () => {
      auctionImage.src = "https://via.placeholder.com/400x300";
      auctionImage.alt = "Failed to load auction image";
    };
  }

  // Handle bid history
  const bidHistoryBody = document.querySelector("#bid-history-body");
  const toggleContainer = document.querySelector(".toggle-container");
  if (toggleContainer) toggleContainer.remove();

  bidHistoryBody.innerHTML = "";

  if (sortedBids.length > 0) {
    const topBids = sortedBids.slice(0, 3);
    const remainingBids = sortedBids.slice(3);

    topBids.forEach((bid) => {
      bidHistoryBody.innerHTML += generateBidRow(bid);
    });

    if (remainingBids.length > 0) {
      createToggleForOlderBids(bidHistoryBody, remainingBids);
    }
  } else {
    bidHistoryBody.innerHTML = `<tr><td colspan="4" class="text-center p-4">No bids available</td></tr>`;
  }
}
