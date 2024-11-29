export function purchasedAuctionModal() {
  const modalContainer = document.createElement("section");

  modalContainer.className =
    "modal-container fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center";

  modalContainer.innerHTML = `
        <div class="bg-white rounded-md shadow-md p-10 px-16 max-h-screen overflow-y-auto relative">
          <button id="close-modal" class="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex justify-center items-center">&times;</button>
          <h2 class="text-2xl font-bold mb-4">Purchased Auctions</h2>
        <ul class="purchased-auctions-list space-y-4">
    <li class="border-b pb-2">
      <div class="flex justify-between items-center mb-2">
        <p class="text-sm text-gray-600">
          <span class="font-medium">Seller:</span> John Doe
        </p>
        <p class="text-sm text-gray-600">
          <span class="font-medium">Date:</span> 2023-06-01
        </p>
      </div>
      <h3 class="text-lg font-semibold my-2">
        Title 1 <span class="text-gray-500 text-sm">(total: 3)</span>
      </h3>
         <p class="text-sm text-gray-600 truncate max-w-full sm:max-w-xs">
        description: Lorem ipsum dolor sit amet, consectetur adipiscing elit...
      </p>
      <div class="flex justify-end">
        <button class="view-details-btn text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded-md focus:outline-none">
          View Details
        </button>
      </div>
    </li>
  </ul>
</div>
    `;
  document.body.append(modalContainer);

  // Lukk modalen
  modalContainer.querySelector("#close-modal").addEventListener("click", () => {
    modalContainer.remove();
  });
}
// ${purchased
//     .map(
//       (auction) => `
//         <li class="border-b pb-2">
//           <h3 class="font-semibold">${auction.title}</h3>
//           <p class="text-sm text-gray-600">Ends: ${new Date(
//             auction.endsAt
//           ).toLocaleDateString()}</p>
//           <button class="view-details-btn bg-blue-500 text-white px-4 py-1 rounded">View Details</button>
//         </li>
// `
// )
// .join("")}
// </ul>
// </div>
