import { createNewAuction } from "./newauction-modal.component.js";

export function myAuctions(listing) {
  const { bids = [], seller = {}, media = [] } = listing;

  let currentBid = 0;
  if (bids.length > 0) {
    currentBid = bids[bids.length - 1].amount;
  }

  const listIthem = document.createElement("div");
  listIthem.className =
    "auction-card   p-4  flex flex-row gap-4 border-b-2 border-blue-800 ";

  listIthem.innerHTML = `
  <div class ="w-1/3 max-w-60">
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
  <button class="details-btn bg-yellow-500 text-white px-2 py-2 sm:px-3 sm:text-sm rounded hover:bg-yellow-600">Details</button>
  <button class="delete-btn bg-red-500 text-white  px-2 py-1 sm:px- 3 sm:text-sm rounded hover:bg-red-600">Delete</button>
  </div >
  </div >
    `;

  console.log(listing.id, listing);

  // edit btn til en event l, skal skrives som om du vil lage en ny post.

  const editBtn = listIthem.querySelector(".edit-btn");
  editBtn.addEventListener("click", () => {
    createNewAuction(listing);
  });

  return listIthem;
}
