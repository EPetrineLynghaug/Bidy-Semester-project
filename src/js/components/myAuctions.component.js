export function myAuctions() {
  const { bids = [], seller = {}, media = [] } = listing;

  let currentBid = 0;
  if (bids.length > 0) {
    currentBid = bids[bids.length - 1].amount;
  }

  const listIthem = document.createElement("div");
  listIthem.className =
    "auction-card border rounded-lg shadow-lg p-4 bg-white flex flex-col gap-4";

  listIthem.innerHTML = `
   <div class =" w-full h-48 overflow-hidden roundet.lg">
     <img src="${
       media[0] ? media[0].url : "https://via.placeholder.com/400x300"
     }"
          alt="${media[0] ? media[0].alt : "Auction image"}"
          class="w-full h-full object-cover rounded-lg shadow-lg">
   </div>
   <h1 class="text-lg font-bold text-gray-800 truncate">${
     listing.title || "Untitled Auction"
   }</h1>
   <p class="text-sm text-gray-700 line-clamp-3">${
     listing.description || "No description available."
   }</p>
   <p class="text-sm text-gray-700 line-clamp-3">${
     currentBid || "No bids available."
   }</p>
   <div class="flex gap-4">
      <button id="edit-btn bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
        Edit Details
      </button>
      <button id="details-btn bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600">
        Delete
      </button>
      <button id="delete-button bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
        Delete
      </button>
    </div>
    <hr class="my-4 border-gray-300" />
    `;

  const editButton = listIthem.querySelector("#edit-btn");
  const detailsButton = listIthem("#details-btn");
  const deliteButton = listIthem.querySelector("#delite-btn");

  return listIthem;
}
