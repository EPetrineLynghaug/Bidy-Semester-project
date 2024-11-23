import { deleteAuction } from "../api/profile.api.js";
import { createNewAuction } from "./newauction-modal.component.js";

export function myAuctions(listing) {
  const { bids = [], media = [] } = listing;

  let currentBid = 0;
  if (bids.length > 0) {
    currentBid = bids[bids.length - 1].amount;
  }

  const listIthem = document.createElement("div");
  listIthem.className =
    "auction-card   p-4  flex flex-row gap-4 border-b-2 border-blue-800 ";

  listIthem.innerHTML = `
  <div class ="w-1/3 max-w-60 aspect-[16/9]">
    <img src="${
      media[0] ? media[0].url : "https://via.placeholder.com/400x300"
    }"
    alt="${media[0] ? media[0].alt : "Auction image"}"
    class="w-full h-full object-cover rounded-lg shadow-lg">
  </div>
  <div class=" flex flex-col justify-between ">
  <div class="flex flex-col gap-2 text-sm">
    <h1 class=""font-regular text-gray-800 truncate">${
      listing.title || "Untitled Auction"
    }</h1>
    <p class="text-sm text-gray-700 line-clamp-3">${
      listing.description || "No description available."
    }</p>
    <p class="text-sm text-gray-700 line-clamp-3">${
      currentBid || "No bids available."
    }</p>
  </div>
  <div class="flex gap-2 ">
  <button class="edit-btn bg-blue-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-blue-600 ">Edit </button>
  <a href="/listing?id=${
    listing.id
  }" class="bg-green-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-green-600">View</a>
  <button class="delete-btn bg-red-500 text-white  px-2 py-1 sm:px- 3 sm:text-sm rounded hover:bg-red-600">Delete</button>
  </div >
  </div >
    `;

  const editBtn = listIthem.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    createNewAuction(listing);
  });
  const deleteBtn = listIthem.querySelector(".delete-btn");

  deleteBtn.addEventListener("click", (event) => {
    let deliteAuctionPost = confirm(
      "Are you sure you want to delete this Auction?",
    );
    if (deliteAuctionPost) {
      deleteAuction(listing.id);
      listIthem.remove();
    }
  });

  return listIthem;
}
