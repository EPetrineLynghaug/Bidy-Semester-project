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
function bidNow(id, auctionData) {
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
    try {
      let result = await Bid(id, formData);

      if (result) {
        alert("Bid submitted successfully!");

        if (!auctionData.bids) {
          auctionData.bids = [];
        }
        auctionData.bids.push(result);

        console.log(result);

        renderAuctionDetails(auctionData);
      } else {
        alert("Failed to submit bid. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("An error occurred while submitting your bid. Please try again.");
    }
  });
}
