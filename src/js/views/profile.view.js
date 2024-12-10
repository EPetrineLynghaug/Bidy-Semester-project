import { fetchProfile, getAllProfileAuction } from "../api/profile.api.js";
import { deleteAuction } from "../api/profile.api.js";
import { renderAuthLinks } from "../components/authLinks.js";
import { myAuctions } from "../components/myAuctions.component.js";
import { createNewAuction } from "../components/newauction-modal.component.js";
import { purchasedAuctionModal } from "../components/purchasedAuc.modal.component.js";
import { updateProfileModal } from "../components/updateProfile-modal.component.js";
import { getStoredUserName } from "../utilities/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    let isMyProfile = false;
    let username = new URLSearchParams(window.location.search).get("name");
    const localStorageUsername = getStoredUserName();

    if (!username) {
      location.href = "/";
    }

    if (!localStorageUsername) {
      location.href = "/auth/login";
    }

    if (username === localStorageUsername) {
      isMyProfile = true;
    }

    const profile = await fetchProfile(username);
    const updatedAuction = await getAllProfileAuction(username);

    updatedAuction.map((listing) => {
      const listIthem = myAuctions(listing, isMyProfile);

      const container = document.querySelector("#my-auctions-container");
      container.appendChild(listIthem);
      console.log("Updated Auction Data:", updatedAuction);
    });

    console.log(updatedAuction);
    if (!profile) {
      alert("Failed to fetch profile data!");
    }
    if (!updatedAuction) {
      alert("Failed to update post data!");
    }

    const bannerElement = document.querySelector("#banner-image");
    if (bannerElement) {
      bannerElement.src =
        profile.banner.url || "https://via.placeholder.com/800x300";
      bannerElement.alt = profile.banner.alt || "Banner image";
      // Bruker onerror for å håndtere feil ved bildeinnlasting
      bannerElement.onerror = () => {
        bannerElement.src = "https://via.placeholder.com/800x300";
        bannerElement.alt = "Failed to load banner image";
      };
    }

    const avatarElement = document.querySelector("#profile-avatar");
    if (avatarElement) {
      avatarElement.src =
        profile.avatar.url || "https://via.placeholder.com/100";
      avatarElement.alt = profile.avatar.alt || "Profile Avatar";

      // Bruker onerror for å håndtere feil hvis avataren ikke kan lastes
      avatarElement.onerror = () => {
        avatarElement.src = "https://via.placeholder.com/100";
        avatarElement.alt = "Failed to load profile avatar";
      };
    }
    const nameElement = document.querySelector("#profile-name");
    nameElement.textContent = profile.name || "Unknown User";

    const bioElement = document.querySelector("#profile-bio");
    bioElement.textContent =
      profile.bio ||
      "Passionate about finding unique deals and rare items. Experienced in online auctions, with a focus on quality and customer satisfaction.";

    const coinsElement = document.querySelector("#profile-coins");
    coinsElement.textContent = `${profile.credits || "0"} coins`;
    // Modal buttons
    const openModalButtonProfile = document.querySelector(
      "#open-modal-profile"
    );
    if (isMyProfile) {
      openModalButtonProfile.addEventListener("click", () => {
        console.log("Open modal button clicked");
        updateProfileModal(profile);
        console.log("Modal opened with profile data:", profile);
      });
    } else {
      openModalButtonProfile.classList.add("hidden");
    }

    const openModalButton = document.querySelector("#open-modal");
    if (isMyProfile) {
      openModalButton.addEventListener("click", () => {
        createNewAuction();
      });
    } else {
      openModalButton.classList.add("hidden");
    }

    const openModalButtonPurchases = document.querySelector(
      "#open-modal-purchases"
    );

    if (isMyProfile) {
      openModalButtonPurchases.addEventListener("click", () => {
        console.log("Opening Purchased Auctions modal...");
        purchasedAuctionModal(username);
      });
    } else {
      openModalButtonPurchases.classList.add("hidden");
    }
    // Event delegation for dynamically added buttons
    // Event delegation for dynamically added buttons
    document
      .querySelector("#my-auctions-container")
      .addEventListener("click", (event) => {
        // Handle Edit button
        if (event.target.classList.contains("edit-btn")) {
          const auctionCard = event.target.closest(".auction-card");
          const auctionId = auctionCard.dataset.id;
          const listing = updatedAuction.find((item) => item.id === auctionId);
          createNewAuction(listing, (updatedListing) => {
            const updatedCard = myAuctions(updatedListing, true);
            auctionCard.replaceWith(updatedCard);
          });
        }

        // Handle Delete button
        if (event.target.classList.contains("delete-btn")) {
          const auctionCard = event.target.closest(".auction-card");
          const auctionId = auctionCard.dataset.id;

          // Show confirmation dialog
          const confirmDelete = confirm(
            "Are you sure you want to delete this Auction?"
          );
          if (confirmDelete) {
            deleteAuction(auctionId)
              .then(() => {
                auctionCard.remove(); // Remove the card from DOM
                const container = document.querySelector(
                  "#my-auctions-container"
                );
                if (!container.querySelector(".auction-card")) {
                  // If no more auctions, show a message
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
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }
});
