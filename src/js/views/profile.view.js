import { fetchProfile, getAllProfileAuction } from "../api/profile.api.js";
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
      alert("No username found. Redirecting to home...");
      location.href = "/";
      return;
    }

    if (!localStorageUsername) {
      alert("You need to log in to access this page. Redirecting...");
      location.href = "/auth/login";
      return;
    }

    if (username === localStorageUsername) {
      isMyProfile = true;
    }

    // Fetch Profile
    let profile;
    try {
      profile = await fetchProfile(username);
      if (!profile) {
        throw new Error("Profile data is missing.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error.message);
      alert("Failed to fetch profile data. Please try again later.");
      return;
    }

    // Fetch Auctions
    let updatedAuction = [];
    try {
      updatedAuction = (await getAllProfileAuction(username)) || [];
    } catch (error) {
      console.error("Error fetching auctions:", error.message);
      alert("Failed to fetch auction data. Showing available data only.");
    }

    // Render Auctions
    const container = document.querySelector("#my-auctions-container");
    if (!container) {
      console.error("#my-auctions-container not found in DOM");
      return;
    }

    if (updatedAuction.length > 0) {
      updatedAuction.forEach((listing) => {
        const listIthem = myAuctions(listing, isMyProfile);
        container.appendChild(listIthem);
      });
      console.log("Updated Auction Data:", updatedAuction);
    } else {
      container.innerHTML =
        "<p class='text-gray-500 text-center'>No auctions found.</p>";
    }

    // Render Profile Details
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
    document.querySelector("#profile-coins").textContent =
      profile.credits || "Unknown";

    // Modal Buttons
    const openModalButtonProfile = document.querySelector(
      "#open-modal-profile"
    );
    if (openModalButtonProfile && isMyProfile) {
      openModalButtonProfile.addEventListener("click", () => {
        updateProfileModal(profile);
      });
    } else if (openModalButtonProfile) {
      openModalButtonProfile.classList.add("hidden");
    }

    const openModalButton = document.querySelector("#open-modal");
    if (openModalButton && isMyProfile) {
      openModalButton.addEventListener("click", () => {
        createNewAuction();
        window.location.reload();
      });
    } else if (openModalButton) {
      openModalButton.classList.add("hidden");
    }

    const openModalButtonPurchases = document.querySelector(
      "#open-modal-purchases"
    );
    if (openModalButtonPurchases && isMyProfile) {
      openModalButtonPurchases.addEventListener("click", () => {
        purchasedAuctionModal(username);
      });
    } else if (openModalButtonPurchases) {
      openModalButtonPurchases.classList.add("hidden");
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
    alert("An unexpected error occurred. Please try again later.");
  }
});
