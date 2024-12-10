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

  // Check if the auction is active or expired
  const isActive = new Date(listing.endsAt) > new Date(); // Auction is active if the end date is in the future

  // Create a container for the auction card
  const listIthem = document.createElement("div");
  // Funksjon for å begrense antall ord i beskrivelsen
  function truncateWords(text, wordLimit) {
    const words = text.split(" ");
    return words.length > wordLimit
      ? words.slice(0, wordLimit).join(" ") + "..."
      : text;
  }

  // Forkort beskrivelsen basert på skjermstørrelse
  const mobileDescription = listing.description
    ? truncateWords(listing.description, 5) // Mobil: Maks 5 ord
    : "No description available.";
  const tabletDescription = listing.description
    ? truncateWords(listing.description, 10) // Tablet: Maks 10 ord
    : "No description available.";
  const desktopDescription = listing.description || "No description available.";

  // Legg inn styling og responsiv beskrivelse
  listIthem.className =
    "auction-card p-4 flex flex-row gap-4 border-b-2 border-blue-800 max-w-screen ";
  listIthem.innerHTML = `
    <div class="w-1/3  md:max-w-[200px]   aspect-[16/9] relative flex-shrink-0">
      <img src="${
        media[0] ? media[0].url : "https://via.placeholder.com/400x300"
      }"
      alt="${media[0] ? media[0].alt : "Auction image"}"
      class="w-full h-full object-cover rounded-lg shadow-lg ${
        isActive ? "" : "opacity-50"
      }">
      ${
        isActive
          ? ""
          : '<div class="absolute inset-0 bg-black/50 flex items-center justify-center text-white text-lg font-bold">UNACTIVE</div>'
      }
    </div>
    <div class="flex flex-col justify-between flex-1">
      <div class="flex flex-col gap-2 text-sm">
        <h1 class="font-regular text-gray-800 truncate">${
          listing.title || "Untitled Auction"
        }</h1>
        <!-- Bruk Tailwind sin responsive klasser for tekst -->
        <p class="text-sm text-gray-700 sm:hidden">${mobileDescription}</p> <!-- Mobil -->
        <p class="hidden sm:block md:hidden text-sm text-gray-700">${tabletDescription}</p> <!-- Tablet -->
        <p class="hidden md:block text-sm text-gray-700 lg:line-clamp-3">${desktopDescription}</p> <!-- Desktop -->
        <p class="text-sm text-gray-700">Bids: ${
          currentBid || "No bids available."
        }</p>
      </div>
      <div class="flex gap-2 mt-2">
        <!-- Show buttons based on the auction's status -->
        ${
          isActive && editAllowed
            ? `<button class="edit-btn bg-blue-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-blue-600">Edit</button>`
            : ""
        }
        <a href="/listing?id=${
          listing.id
        }" class="bg-green-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-green-600">View</a>
        ${
          editAllowed
            ? `<button class="delete-btn bg-red-500 text-white px-2 py-1 sm:px-3 sm:text-sm rounded hover:bg-red-600">Delete</button>`
            : ""
        }
      </div>
    </div>
  `;

  // Add event listener for edit button
  const editBtn = listIthem.querySelector(".edit-btn");
  if (editBtn) {
    editBtn.addEventListener("click", () => {
      createNewAuction(listing, (updatedListing) => {
        const updatedCard = myAuctions(updatedListing, true);
        listIthem.replaceWith(updatedCard);
        location.reload();
      });
    });
  }

  // Add event listener for delete button
  const deleteBtn = listIthem.querySelector(".delete-btn");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete this Auction?"
      );
      if (confirmDelete) {
        deleteAuction(listing.id);
        listIthem.remove();
      }
    });
  }

  // Return the auction card
  return listIthem;
}
