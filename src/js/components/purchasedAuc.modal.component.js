import { getProfileAuctionWins } from "../api/profile.api.js";

export function purchasedAuctionModal(name) {
  const modalContainer = document.createElement("section");
  modalContainer.className =
    "modal-container fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center";

  modalContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-md p-6 max-h-screen w-11/12 md:max-w-2xl lg:max-w-3xl overflow-y-auto relative">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <h2 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">Purchased Auctions</h2>
        <button id="close-modal" class="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <!-- Content -->
      <div id="purchased-auctions-content" class="space-y-6">
        <p class="text-gray-500 text-center">Loading purchased auctions...</p>
      </div>
    </div>
  `;

  document.body.appendChild(modalContainer);

  const closeModal = () => {
    modalContainer.remove();
  };
  modalContainer
    .querySelector("#close-modal")
    .addEventListener("click", closeModal);

  getProfileAuctionWins(name)
    .then((wins) => {
      console.log("Auction Wins in Frontend:", wins);

      const contentContainer = modalContainer.querySelector(
        "#purchased-auctions-content"
      );

      if (!contentContainer) {
        console.error("Content container not found!");
        return;
      }

      if (wins.length > 0) {
        console.log("Displaying auction wins:", wins);
        const auctionContent = wins
          .map(
            (win) => `
          <li class="border-b pb-4 mb-4">
            <div class="flex justify-between items-center mb-2">
              <p class="text-sm text-gray-600">
                <span class="font-medium">Title:</span> ${win.title || "N/A"}
              </p>
              <p class="text-sm text-gray-600">
                <span class="font-medium">Date:</span> ${
                  win.endsAt
                    ? new Date(win.endsAt).toLocaleDateString()
                    : "Unknown"
                }
              </p>
            </div>
            <p class="text-sm text-gray-600 truncate max-w-full sm:max-w-xs">
              ${win.description || "No description available..."}
            </p>
            <div class="flex justify-end mt-2">
              <a href="/listing?id=${
                win.id
              }" class="view-details-btn text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded-md focus:outline-none">
                View Details
              </a>
            </div>
          </li>`
          )
          .join("");

        contentContainer.innerHTML = `<ul class="purchased-auctions-list space-y-4">${auctionContent}</ul>`;
      } else {
        console.log("No auction wins found.");
        contentContainer.innerHTML = `<p class="text-gray-500 text-center">No purchased auctions found.</p>`;
      }
    })
    .catch((error) => {
      console.error("Error displaying purchased auctions:", error.message);
      const contentContainer = modalContainer.querySelector(
        "#purchased-auctions-content"
      );
      contentContainer.innerHTML = `<p class="text-red-500 text-center">Failed to load purchased auctions. Please try again later.</p>`;
    });
}
