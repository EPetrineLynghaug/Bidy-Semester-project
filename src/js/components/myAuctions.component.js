import { deleteAuction } from "../api/profile.api.js";
import { createNewAuction } from "./newauction-modal.component.js";

// Function to generate auction card component
export function myAuctions(listing, editAllowed) {
  const { bids = [], media = [] } = listing;

  // Calculate the current highest bid
  let currentBid = 0;
  if (bids.length > 0) {
    currentBid = bids[bids.length - 1].amount;
  }

  // Create a container for the auction card
  const listIthem = document.createElement("div");
  listIthem.className =
    "auction-card p-4 flex flex-row gap-4 border-b-2 border-blue-800";

  // Populate the container with auction details
  listIthem.innerHTML = `
  <div class="w-1/3 max-w-60 aspect-[16/9]">
    <img src="${
      media[0] ? media[0].url : "https://via.placeholder.com/400x300"
    }"
    alt="${media[0] ? media[0].alt : "Auction image"}"
    class="w-full h-full object-cover rounded-lg shadow-lg">
  </div>
  <div class="flex flex-col justify-between">
    <div class="flex flex-col gap-2 text-sm">
      <h1 class="font-regular text-gray-800 truncate">${
        listing.title || "Untitled Auction"
      }</h1>
      <p class="text-sm text-gray-700 line-clamp-3">${
        listing.description || "No description available."
      }</p>
      <p class="text-sm text-gray-700 line-clamp-3">${
        currentBid || "No bids available."
      }</p>
    </div>
    <div class="flex gap-2">
      <!-- Show edit and delete buttons only if editAllowed is true -->
      <button class="${
        !editAllowed ? "hidden" : ""
      } edit-btn bg-blue-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-blue-600">Edit</button>
      <a href="/listing?id=${
        listing.id
      }" class="bg-green-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-green-600">View</a>
      <button class="${
        !editAllowed ? "hidden" : ""
      } delete-btn bg-red-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-red-600">Delete</button>
    </div>
  </div>
  `;

  // Add event listener for edit button
  const editBtn = listIthem.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    // Open the auction creation modal for editing
    createNewAuction(listing, (updatedListing) => {
      // Replace the old card with the updated one in the DOM
      const updatedCard = myAuctions(updatedListing, true);
      listIthem.replaceWith(updatedCard);

      // Reload the page to ensure changes are reflected
      location.reload();
    });
  });

  // Add event listener for delete button
  const deleteBtn = listIthem.querySelector(".delete-btn");
  deleteBtn.addEventListener("click", (event) => {
    // Ask for confirmation before deleting the auction
    let deliteAuctionPost = confirm(
      "Are you sure you want to delete this Auction?"
    );
    if (deliteAuctionPost) {
      // Call delete function and remove the card from the DOM
      deleteAuction(listing.id);
      listIthem.remove();
    }
  });

  // Return the auction card element
  return listIthem;
}
