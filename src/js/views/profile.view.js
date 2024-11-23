import { fetchProfile, getAllProfileAuction } from "../api/profile.api.js";

import { renderAuthLinks } from "../components/authLinks.js";
import { myAuctions } from "../components/myAuctions.component.js";
import { createNewAuction } from "../components/newauction-modal.component.js";
import { getStoredUserName } from "../utilities/storage.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    let username = new URLSearchParams(window.location.search).get("name");

    if (!username) {
      username = getStoredUserName();
    }

    const profile = await fetchProfile(username);

    const updatedAuction = await getAllProfileAuction(username);

    updatedAuction.map((listing) => {
      const listIthem = myAuctions(listing);

      const container = document.querySelector("#my-auctions");
      container.appendChild(listIthem);
    });

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
    }

    const avatarElement = document.querySelector("#profile-avatar");
    if (avatarElement) {
      avatarElement.src =
        profile.avatar.url || "https://via.placeholder.com/100";
      avatarElement.alt = profile.avatar.alt || "Profile Avatar";
    }

    const nameElement = document.querySelector("#profile-name");
    nameElement.textContent = profile.name || "Unknown User";

    const bioElement = document.querySelector("#profile-bio");
    bioElement.textContent =
      profile.bio ||
      "Passionate about finding unique deals and rare items. Experienced in online auctions, with a focus on quality and customer satisfaction.";

    const coinsElement = document.querySelector("#profile-coins");
    coinsElement.textContent = profile.credits || "unkinown";

    //mobile menu//
    //   let menuIsOpen = false;
    //   const mobileMenu = document.querySelector("#mobile-menu");

    //   document.getElementById("toggle-menu").addEventListener("click", () => {
    //     if (menuIsOpen) {
    //       mobileMenu.classList.add("hidden");
    //       mobileMenu.classList.remove("flex");
    //     } else {
    //       mobileMenu.classList.remove("hidden");
    //       mobileMenu.classList.add("flex");
    //     }
    //     menuIsOpen = !menuIsOpen;
    //   });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
  }

  const openModalButton = document.querySelector("#open-modal");
  openModalButton.addEventListener("click", () => {
    createNewAuction();
  });
});
