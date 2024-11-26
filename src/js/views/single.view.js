import { renderAuthLinks } from "../components/authLinks.js";
import { fetchSingleCardDetails, Bid } from "../api/single.api.js";
import { renderAuctionDetails } from "../components/createSingleCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    const cardId = new URLSearchParams(window.location.search).get("id");
    bidNow(cardId);
    if (!cardId) {
      throw new Error("No auction ID provided in URL");
    }

    const auctionData = await fetchSingleCardDetails(cardId);
    renderAuctionDetails(auctionData);
  } catch (error) {
    console.error("Error during initialization:", error.message);

    const container = document.querySelector(".container");
    if (container) {
      container.innerHTML = `<p class="text-red-500">Error loading page: ${error.message}</p>`;
    }
  }
});
function bidNow(id) {
  const bidForm = document.querySelector("#bid-form");
  const customBidInput = document.querySelector("#custom-bid");
  console.log(bidForm);
  console.log(customBidInput);
  if (!bidForm || !customBidInput) {
    console.error("Bid form or custom bid input not found.");
    return;
  }
  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const selectedBid = document.querySelector(
      'input[name="bid-amount"]:checked'
    );

    let bidAmount = customBidInput.value || selectedBid.value;

    let formData = {
      amount: Number(bidAmount),
    };

    if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please select a valid bid amount.");
      return;
    }

    let result = await Bid(id, formData);
    console.log(result);
    const updatedBid = result.bids;

    if (result) {
      alert("Bid submitted successfully!");
    } else {
      alert("Failed to submit bid. Please try again.");
    }
    const bidHistoryTable = document.querySelector("#bid-history-body");
    bidHistoryTable.innerHTML = "";

    updatedBid.map((bid) => {
      const bidDate = bid.created ? new Date(bid.created) : null;

      const isValidDate = bidDate && !isNaN(bidDate);

      const row = document.createElement("tr");
      row.className = "extra-bid-row";

      row.innerHTML = `
         
            <td class="border px-4 py-2">${bid.amount} Coins</td>
            <td class="border px-4 py-2">${bid.bidder?.name || "Anonymous"}</td>
            <td class="border px-4 py-2">${
              isValidDate ? bidDate.toLocaleDateString() : "Unknown Date"
            }</td>
            <td class="border px-4 py-2">${
              isValidDate ? bidDate.toLocaleTimeString() : "Unknown Time"
            }</td>
         
        `;
      bidHistoryTable.appendChild(row);
    });
  });
}
