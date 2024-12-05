import { renderAuthLinks } from "../components/authLinks.js";
import { fetchSingleCardDetails, Bid } from "../api/single.api.js";
import { renderAuctionDetails } from "../components/createSingleCard.js";
import { initializeCarousel } from "../utilities/carouseCardUtils.js";
import { getStoredUserName } from "../utilities/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  const cardId = new URLSearchParams(window.location.search).get("id");

  if (!cardId) {
    displayError("Invalid Auction ID.");
    return;
  }

  const isLoggedIn = checkUserLogin();
  toggleBidSectionsVisibility(isLoggedIn);

  try {
    renderAuthLinks();

    const auctionData = await fetchSingleCardDetails(cardId);
    if (!auctionData) throw new Error("Failed to fetch auction details");

    initializeCarousel(formatMedia(auctionData.media));
    renderAuctionDetails(auctionData, isLoggedIn);

    if (isLoggedIn) setupBidForm(cardId);
  } catch (error) {
    handleError(error);
  }
});

// Helper Functions

function checkUserLogin() {
  const username = getStoredUserName();
  return !!username;
}

function toggleBidSectionsVisibility(isLoggedIn) {
  const bidSections = document.querySelectorAll(
    ".info-card, .bid-history-section"
  );
  bidSections.forEach((section) => {
    section.style.display = isLoggedIn ? "block" : "none";
  });

  if (!isLoggedIn) {
    const auctionDetailsContainer = document.querySelector(".details-section");
    if (auctionDetailsContainer) {
      const loginPrompt = document.createElement("p");
      loginPrompt.className =
        "text-center mt-4 p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-700 font-medium";
      loginPrompt.textContent =
        "Log in or register to bid, view profiles, or see bid history.";
      auctionDetailsContainer.appendChild(loginPrompt);
    }
  }
}

function formatMedia(media) {
  return (
    media?.map((item) => ({
      url: item.url || "https://via.placeholder.com/800x300",
      alt: item.alt || "Auction Image",
    })) || [
      {
        url: "https://via.placeholder.com/800x300",
        alt: "Default Image",
      },
    ]
  );
}

function displayError(message) {
  document.querySelector(
    "#auction-details"
  ).innerHTML = `<p class="text-red-500">${message}</p>`;
}

function handleError(error) {
  console.error("Error during initialization:", error.message);
  document.querySelector(
    ".container"
  ).innerHTML = `<p class="text-red-500">Error loading page: ${error.message}</p>`;
}

function setupBidForm(cardId) {
  const bidForm = document.querySelector("#bid-form");
  const customBidInput = document.querySelector("#custom-bid");

  if (!bidForm || !customBidInput) {
    console.error("Bid form or custom bid input not found.");
    return;
  }

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bidAmount = getBidAmount(customBidInput);
    if (bidAmount === null) return;

    try {
      const result = await Bid(cardId, { amount: bidAmount });
      if (result) {
        alert("Bid submitted successfully!");
        const updatedAuctionData = await fetchSingleCardDetails(cardId);
        renderAuctionDetails(updatedAuctionData, true);
      } else {
        alert("Failed to submit bid. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting bid:", error.message);
      alert("An error occurred while submitting your bid.");
    }
  });
}

function getBidAmount(customBidInput) {
  const selectedBid = document.querySelector(
    'input[name="bid-amount"]:checked'
  );
  const bidAmount =
    customBidInput.value.trim() || (selectedBid && selectedBid.value);

  if (!bidAmount) {
    alert("Please select a bid amount or enter a custom bid.");
    return null;
  }

  const amount = Number(bidAmount);
  if (isNaN(amount) || amount <= 0) {
    alert("Please enter a valid bid amount greater than 0.");
    return null;
  }

  return amount;
}
