import { renderAuthLinks } from "../components/authLinks.js";
import { fetchSingleCardDetails, Bid } from "../api/single.api.js";
import { renderAuctionDetails } from "../components/createSingleCard.js";
import { initializeCarousel } from "../utilities/carouseCardUtils.js";
import { getStoredUserName } from "../utilities/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cardId = new URLSearchParams(window.location.search).get("id");
  let isLoggedIn = false;
  const localStorageUsername = getStoredUserName();
  if (localStorageUsername) {
    isLoggedIn = true;
    console.log("user is logged in", localStorageUsername);
  }
  if (!isLoggedIn) {
    document.querySelectorAll(".info-card").forEach((section) => {
      section.style.display = "none";
    });
    document.querySelectorAll(".bid-history-section").forEach((section) => {
      section.style.display = "none";
    });
  }

  if (!cardId) {
    document.querySelector("#auction-details").innerHTML =
      "Invalid Auction ID.";
    return;
  }
  try {
    renderAuthLinks();

    // Hent auksjonsdata
    const auctionData = await fetchSingleCardDetails(cardId, isLoggedIn);
    if (!auctionData) {
      throw new Error("Failed to fetch auction details");
    }
    let currentBid = 0;
    if (auctionData.bids.length > 0) {
      currentBid = auctionData.bids[auctionData.bids.length - 1].amount;
    }
    console.log("Current bid:", currentBid);

    // Initialiser bildekarusellen
    const images = auctionData.media?.map((media) => ({
      url: media.url || "https://via.placeholder.com/800x300",
      alt: media.alt || "Auction Image",
    })) || [
      {
        url: "https://via.placeholder.com/800x300",
        alt: "Default Image",
      },
    ];
    initializeCarousel(images);

    renderAuctionDetails(auctionData);
    if (isLoggedIn) {
      bidNow(cardId, auctionData);
    }
  } catch (error) {
    console.error("Error during initialization:", error.message);
    document.querySelector(
      ".container"
    ).innerHTML = `<p class="text-red-500">Error loading page: ${error.message}</p>`;
  }
});

// Funksjon for å håndtere bud
function bidNow(id, auctionData) {
  const bidForm = document.querySelector("#bid-form");
  const customBidInput = document.querySelector("#custom-bid");

  if (!bidForm || !customBidInput) {
    console.error("Bid form or custom bid input not found.");
    return;
  }

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedBid = document.querySelector(
      'input[name="bid-amount"]:checked'
    );
    let bidAmount;

    // Prioriterer custom-bid dersom det er utfylt
    if (customBidInput.value) {
      bidAmount = customBidInput.value.trim();
    } else if (selectedBid) {
      bidAmount = selectedBid.value;
    } else {
      alert("Please select a bid amount or enter a custom bid.");
      return;
    }

    bidAmount = Number(bidAmount);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount greater than 0.");
      return;
    }

    const formData = { amount: bidAmount };

    try {
      const result = await Bid(id, formData);

      if (result) {
        alert("Bid submitted successfully!");

        const updatedAuctionData = await fetchSingleCardDetails(id);

        renderAuctionDetails(updatedAuctionData);
      } else {
        alert("Failed to submit bid. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting bid:", error.message);
      alert("An error occurred while submitting your bid.");
    }
  });
}
