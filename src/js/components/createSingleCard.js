export function renderAuctionDetails(auctionData) {
  if (!auctionData) {
    console.error("No auction data provided to render.");
    return;
  }

  const sellerAvatar = document.querySelector("#seller-avatar");
  const sellerName = document.querySelector("#seller-name");

  if (auctionData.seller) {
    sellerAvatar.src =
      auctionData.seller.avatar?.url || "https://via.placeholder.com/50";
    sellerName.textContent = auctionData.seller.name || "Unknown Seller";
  } else {
    sellerName.textContent = "Unknown Seller";
  }
 
  const auctionTitle = document.querySelector("#auction-title");
  if (auctionTitle) {
    auctionTitle.textContent = auctionData.title || "Untitled Auction";
  }

 
  const auctionDescription = document.querySelector("#auction-description");
  if (auctionDescription) {
    auctionDescription.textContent =
      auctionData.description || "No description available.";
  }

 
  const postedDate = document.querySelector("#auction-posted-date");
  if (postedDate) {
    postedDate.textContent = `Posted: ${new Date(
      auctionData.created
    ).toLocaleDateString()}`;
  }

  const expiryDate = document.querySelector("#auction-expiry-date");
  if (expiryDate) {
    expiryDate.textContent = `Expires: ${new Date(
      auctionData.endsAt
    ).toLocaleDateString()}`;
  }


  const currentBid = document.querySelector("#current-bid");
  if (currentBid) {
    currentBid.textContent = `Current bid: ${
      auctionData.highestBid || "0 Coins"
    }`;
  }


  const auctionImage = document.querySelector("#auction-image");
  if (auctionImage) {
    auctionImage.src =
      auctionData.media?.[0]?.url || "https://via.placeholder.com/400x300";
    auctionImage.alt = auctionData.media?.[0]?.alt || "Auction image";
  }
  const bidHistoryBody = document.querySelector("#bid-history-body");
  if (bidHistoryBody) {
    bidHistoryBody.innerHTML = "";

    if (auctionData.bids && auctionData.bids.length > 0) {
      const sortedBids = auctionData.bids.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      // Siste tre bud vises som standard
      const latestBids = sortedBids.slice(-3).reverse(); // Nyeste øverst
      const olderBids = sortedBids.slice(0, -3).reverse();

      // Funksjon for å generere bud-rader
      const generateBidRow = (bid) => {
        const bidDate = bid.created ? new Date(bid.created) : null;

        const isValidDate = bidDate && !isNaN(bidDate);

        return `
          <tr>
            <td class="border px-4 py-2">${bid.amount} Coins</td>
            <td class="border px-4 py-2">${bid.bidder?.name || "Anonymous"}</td>
            <td class="border px-4 py-2">${
              isValidDate ? bidDate.toLocaleDateString() : "Unknown Date"
            }</td>
            <td class="border px-4 py-2">${
              isValidDate ? bidDate.toLocaleTimeString() : "Unknown Time"
            }</td>
          </tr>
        `;
      };
      latestBids.forEach((bid) => {
        bidHistoryBody.innerHTML += generateBidRow(bid);
      });

      if (olderBids.length > 0) {
        const toggleContainer = document.createElement("div");
        toggleContainer.className = "text-center mt-4";

        const toggleButton = document.createElement("button");
        toggleButton.innerHTML = "View More ↓";
        toggleButton.className =
          "text-blue-500 hover:underline text-sm cursor-pointer";

        // Håndter visning av resterende bud
        let isExpanded = false;
        toggleButton.addEventListener("click", () => {
          if (isExpanded) {
            const rows = bidHistoryBody.querySelectorAll(".extra-bid-row");
            rows.forEach((row) => row.remove());
            toggleButton.innerHTML = "View More ↓";
          } else {
            olderBids.forEach((bid) => {
              const row = document.createElement("tr");
              row.className = "extra-bid-row";
              row.innerHTML = generateBidRow(bid);
              bidHistoryBody.appendChild(row);
            });
            toggleButton.innerHTML = "View Less ↑";
          }
          isExpanded = !isExpanded;
        });

        toggleContainer.appendChild(toggleButton);
        bidHistoryBody.parentElement.appendChild(toggleContainer);
      }
    } else {
      bidHistoryBody.innerHTML = `<tr><td colspan="4" class="text-center p-4">No bids available</td></tr>`;
    }
  }
}
