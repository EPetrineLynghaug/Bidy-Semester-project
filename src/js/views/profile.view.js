import { fetchProfile, getAllProfileAuction } from "../api/profile.api.js";
import { deleteAuction } from "../api/profile.api.js";
import { renderAuthLinks } from "../components/authLinks.js";
import { myAuctions } from "../components/myAuctions.component.js";
import { createNewAuction } from "../components/newauction-modal.component.js";
import { purchasedAuctionModal } from "../components/purchasedAuc.modal.component.js";
import { updateProfileModal } from "../components/updateProfile-modal.component.js";
import { getStoredUserName } from "../utilities/storage.js";
import { renderFooter } from "../components/footer.components.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();
    renderFooter();

    const localStorageUsername = getStoredUserName();
    if (!localStorageUsername) {
      location.href = "/";
      return;
    }

    const username = new URLSearchParams(window.location.search).get("name");
    if (!username) {
      location.href = "/"; // Redirect to home if no username is provided
      return;
    }

    // Determine if this is the logged-in user's profile
    const isMyProfile = username === localStorageUsername;

    // Fetch profile data
    const profile = await fetchProfile(username);
    if (!profile) {
      location.href = "/"; // Redirect to home if profile does not exist
      return;
    }

    // Fetch user's auctions
    const updatedAuction = await getAllProfileAuction(username);
    updatedAuction.forEach((listing) => {
      const listItem = myAuctions(listing, isMyProfile);
      const container = document.querySelector("#my-auctions-container");
      container.appendChild(listItem);
    });

    // Update profile details
    updateProfileUI(profile, isMyProfile);

    // Setup modal buttons and auction actions
    setupModalButtons(isMyProfile, profile, username);
    handleAuctionActions(updatedAuction, isMyProfile);
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    location.href = "/"; // Redirect to home on error
  }
});

// Helper function to update profile UI
function updateProfileUI(profile, isMyProfile) {
  const bannerElement = document.querySelector("#banner-image");
  if (bannerElement) {
    bannerElement.src =
      profile.banner?.url || "https://via.placeholder.com/800x300";
    bannerElement.alt = profile.banner?.alt || "Banner image";
    bannerElement.onerror = () => {
      bannerElement.src = "https://via.placeholder.com/800x300";
      bannerElement.alt = "Failed to load banner image";
    };
  }

  const avatarElement = document.querySelector("#profile-avatar");
  if (avatarElement) {
    avatarElement.src =
      profile.avatar?.url || "https://via.placeholder.com/100";
    avatarElement.alt = profile.avatar?.alt || "Profile Avatar";
    avatarElement.onerror = () => {
      avatarElement.src = "https://via.placeholder.com/100";
      avatarElement.alt = "Failed to load profile avatar";
    };
  }

  document.querySelector("#profile-name").textContent =
    profile.name || "Unknown User";
  document.querySelector("#profile-bio").textContent =
    profile.bio ||
    "Passionate about finding unique deals and rare items. Experienced in online auctions, with a focus on quality and customer satisfaction.";

  const coinsElement = document.querySelector("#profile-coins");
  if (isMyProfile) {
    coinsElement.innerHTML = `
      <div class="flex items-center gap-2 justify-end mt-4 text-gray-800 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-thin">
        <i class="ph ph-currency-circle-dollar"></i>
        <span>${profile.credits || 0} coins</span>
      </div>
    `;
  } else {
    coinsElement.classList.add("hidden");
  }
}

// Helper function to handle modal button functionality
function setupModalButtons(isMyProfile, profile, username) {
  const openModalButtonProfile = document.querySelector("#open-modal-profile");
  const openModalButton = document.querySelector("#open-modal");
  const openModalButtonPurchases = document.querySelector(
    "#open-modal-purchases"
  );

  if (isMyProfile) {
    openModalButtonProfile.addEventListener("click", () => {
      updateProfileModal(profile);
    });

    openModalButton.addEventListener("click", () => {
      createNewAuction();
    });

    openModalButtonPurchases.addEventListener("click", () => {
      purchasedAuctionModal(username);
    });
  } else {
    openModalButtonProfile.classList.add("hidden");
    openModalButton.classList.add("hidden");
    openModalButtonPurchases.classList.add("hidden");
  }
}

// Helper function to handle auction actions
function handleAuctionActions(updatedAuction, isMyProfile) {
  document
    .querySelector("#my-auctions-container")
    .addEventListener("click", (event) => {
      const auctionCard = event.target.closest(".auction-card");
      const auctionId = auctionCard?.dataset.id;

      if (event.target.classList.contains("edit-btn")) {
        const listing = updatedAuction.find((item) => item.id === auctionId);
        createNewAuction(listing, (updatedListing) => {
          const updatedCard = myAuctions(updatedListing, true);
          auctionCard.replaceWith(updatedCard);
        });
      }

      if (event.target.classList.contains("delete-btn")) {
        if (confirm("Are you sure you want to delete this Auction?")) {
          deleteAuction(auctionId)
            .then(() => {
              auctionCard.remove();
              const container = document.querySelector(
                "#my-auctions-container"
              );
              if (!container.querySelector(".auction-card")) {
                container.innerHTML = "<p>No auctions available.</p>";
              }
            })
            .catch((error) => {
              console.error("Error deleting auction:", error);
              alert("Failed to delete the auction. Please try again.");
            });
        }
      }
    });
}
