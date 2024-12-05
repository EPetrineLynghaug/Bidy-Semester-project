// Hjelpefunksjon for å oppdatere DOM-elementer
const updateElement = (selector, value, isHTML = false) => {
  const element = document.querySelector(selector);
  if (element) {
    element[isHTML ? "innerHTML" : "textContent"] = value || "";
  }
};

// Funksjon for å generere budrader
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

// Funksjon for å håndtere visning og skjuling av eldre bud
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
      // Skjul eldre bud
      const rows = bidHistoryBody.querySelectorAll(".extra-bid-row");
      rows.forEach((row) => row.remove());
      toggleButton.innerHTML = "View More ↓";
    } else {
      // Vis eldre bud
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

// Funksjon for å oppdatere auksjonsdetaljer og budhistorikk
export function renderAuctionDetails(auctionData) {
  if (!auctionData) {
    console.error("No auction data provided to render.");
    return;
  }
  let currentBid = 0;
  if (auctionData.bids.length > 0) {
    currentBid = auctionData.bids[auctionData.bids.length - 1].amount;
  }

  // Oppdater grensesnittet med auksjonsdata
  updateElement("#seller-name", auctionData.seller?.name || "Unknown Seller");
  const sellerAvatar = document.querySelector("#seller-avatar");
  if (sellerAvatar) {
    sellerAvatar.src =
      auctionData.seller?.avatar?.url || "https://via.placeholder.com/50";
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
  updateElement(
    "#auction-image",
    auctionData.media?.[0]?.url || "https://via.placeholder.com/400x300"
  );

  // Håndtere budhistorikk
  const bidHistoryBody = document.querySelector("#bid-history-body");
  const toggleContainer = document.querySelector(".toggle-container");
  if (toggleContainer) toggleContainer.remove();

  bidHistoryBody.innerHTML = "";

  if (auctionData.bids && auctionData.bids.length > 0) {
    const sortedBids = auctionData.bids.sort((a, b) => b.amount - a.amount);
    const topBids = sortedBids.slice(0, 3);
    const remainingBids = sortedBids.slice(3);

    // Legg til de tre høyeste budene
    topBids.forEach((bid) => {
      bidHistoryBody.innerHTML += generateBidRow(bid);
    });

    // Legg til toggle-knapp for eldre bud
    if (remainingBids.length > 0) {
      createToggleForOlderBids(bidHistoryBody, remainingBids);
    }
  } else {
    bidHistoryBody.innerHTML = `<tr><td colspan="4" class="text-center p-4">No bids available</td></tr>`;
  }
}
