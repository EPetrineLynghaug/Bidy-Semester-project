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

// Update user balance dynamically
function updateBalance(bidAmount) {
  const balanceElement = document.querySelector("#profile-coins");
  if (balanceElement) {
    const currentBalance = parseInt(balanceElement.textContent, 10);
    if (!isNaN(currentBalance) && currentBalance >= bidAmount) {
      balanceElement.textContent = `${currentBalance - bidAmount} coins`;
    } else {
      showCustomAlert(
        "Insufficient balance to place this bid.",
        "error",
        document.querySelector("#bid-form")
      );
    }
  }
}

// Set up bid form to handle submissions
function setupBidForm(cardId) {
  const bidForm = document.querySelector("#bid-form");
  const customBidInput = document.querySelector("#custom-bid");
  const bidNowButton = document.querySelector(".btn-basic");

  if (!bidForm || !customBidInput || !bidNowButton) return;

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const bidAmount = getBidAmount(customBidInput);
    if (bidAmount === null) return;

    // Disable button and update text
    bidNowButton.disabled = true;
    const originalText = bidNowButton.textContent;
    bidNowButton.textContent = "Processing...";

    try {
      const result = await Bid(cardId, { amount: bidAmount });
      if (result) {
        showCustomAlert(
          "Your bid has been received successfully!",
          "success",
          bidForm
        );
        updateBalance(bidAmount);

        // Clear form inputs
        clearFormInputs(bidForm);

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
    } finally {
      // Re-enable button and reset text
      bidNowButton.disabled = false;
      bidNowButton.textContent = originalText;
    }
  });
}

// Clear form inputs after successful submission
function clearFormInputs(form) {
  const radioButtons = form.querySelectorAll('input[name="bid-amount"]');
  const customBidInput = form.querySelector("#custom-bid");

  // Reset radio buttons
  radioButtons.forEach((radio) => (radio.checked = false));

  // Reset custom bid input
  if (customBidInput) {
    customBidInput.value = "";
  }
}

// Get the bid amount from the form
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
