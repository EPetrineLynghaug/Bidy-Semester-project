import { renderAuthLinks } from "../components/authLinks.js";
import { fetchSingleCardDetails, Bid } from "../api/single.api.js";
import { renderAuctionDetails } from "../components/createSingleCard.js";
import { initializeCarousel } from "../utilities/carouseCardUtils.js";
import { getStoredUserName } from "../utilities/storage.js";
import { showCustomAlert } from "../components/showCustomAlert.components.js";
import { fetchProfile } from "../api/profile.api.js";
import { renderFooter } from "../components/footer.components.js";

// Main logic - waiting for DOM to load
document.addEventListener("DOMContentLoaded", async () => {
  const cardId = new URLSearchParams(window.location.search).get("id");

  if (!cardId) {
    displayError("Invalid Auction ID.");
    return;
  }

  const isLoggedIn = checkUserLogin();
  toggleBidSectionsVisibility(isLoggedIn);

  const coinsElement = document.querySelector("#profile-coins");
  const balanceBox = document.querySelector("#balance-box");

  if (isLoggedIn) {
    const profile = await fetchProfile(getStoredUserName());
    if (profile?.credits !== undefined) {
      coinsElement.textContent = `${profile.credits} coins`;
      balanceBox.style.display = "block";
    }
  } else {
    balanceBox.style.display = "none";
  }

  try {
    renderAuthLinks();
    renderFooter();

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
  return !!getStoredUserName();
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
        "text-center mt-4 mb-20 p-4 bg-yellow-100 border border-yellow-400 rounded text-yellow-700 font-medium";
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

  if (!bidForm || !customBidInput) return;

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bidAmount = getBidAmount(customBidInput);
    if (bidAmount === null) return;

    try {
      const result = await Bid(cardId, { amount: bidAmount });
      if (result) {
        showCustomAlert(
          "Your bid has been received successfully!",
          "success",
          bidForm
        );
        const updatedAuctionData = await fetchSingleCardDetails(cardId);
        renderAuctionDetails(updatedAuctionData, true);
      } else {
        showCustomAlert(
          "Something went wrong. Please check your coin balance and try again.",
          "error",
          bidForm
        );
      }
    } catch (error) {
      console.error("Error submitting bid:", error.message);
      showCustomAlert(
        "An error occurred while submitting your bid. Please try again later.",
        "error",
        bidForm
      );
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
    showCustomAlert(
      "Please select a bid amount or enter a custom bid.",
      "error",
      document.querySelector("#bid-form")
    );
    return null;
  }

  const amount = Number(bidAmount);
  if (isNaN(amount) || amount <= 0) {
    showCustomAlert(
      "Please enter a valid bid amount greater than 0.",
      "error",
      document.querySelector("#bid-form")
    );
    return null;
  }

  return amount;
}

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
export function renderAuctionDetails(auctionData, isLoggedIn) {
  if (!auctionData) return;

  let currentBid =
    auctionData.bids.length > 0
      ? auctionData.bids[auctionData.bids.length - 1].amount
      : 0;

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

  if (auctionData.bids && auctionData.bids.length > 0) {
    const sortedBids = auctionData.bids.sort((a, b) => b.amount - a.amount);
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
