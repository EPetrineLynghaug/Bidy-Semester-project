// Oppdatert `myAuctions`-funksjon med større bilder på tablet og desktop
export function myAuctions(listing, editAllowed) {
  const { bids = [], media = [] } = listing;

  // Beregn det nåværende høyeste budet
  let currentBid = 0;
  if (bids.length > 0) {
    currentBid = bids[bids.length - 1].amount;
  }

  // Sjekk om auksjonen er aktiv eller utløpt
  const isActive = new Date(listing.endsAt) > new Date();

  // Opprett container for auksjonskortet
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

  // Anvend styling og responsiv beskrivelse
  listIthem.className =
    "auction-card p-4 flex flex-row gap-4 border-b-2 border-blue-800 max-w-screen-lg font-sans";
  listIthem.innerHTML = `
    <!-- Bildeseksjon -->
    <div class="w-1/3 md:w-1/8 lg:w-2/1 aspect-[16/9] relative flex-shrink-0">
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
          : '<div class="absolute inset-0 bg-black/50 flex items-center justify-center rounded-lg shadow-lg text-white text-lg font-bold">INACTIVE</div>'
      }
    </div>
    
    <!-- Innholdssseksjon -->
    <div class="flex flex-col justify-between flex-1 max-w-md">
      <div class="flex flex-col gap-2 text-sm flex-grow">
        <h1 class="font-normal text-gray-800 truncate">${
          listing.title || "Untitled Auction"
        }</h1>
        <p class="text-sm text-gray-700 sm:hidden">${mobileDescription}</p>
        <p class="hidden sm:block md:hidden text-sm text-gray-700">${tabletDescription}</p> 
        <p class="hidden md:block text-sm text-gray-700 lg:line-clamp-2">${desktopDescription}</p> 
        <p class="text-sm text-gray-700">Bids: ${
          currentBid || "No bids available."
        }</p>
      </div>
      
      <!-- Knappeseksjon -->
      <div class="flex gap-2 mt-auto md:ml-auto md:justify-end">
        ${
          isActive && editAllowed
            ? `<button class="edit-btn px-4 py-2 bg-[#5C9DED] text-white text-sm font-medium rounded-md hover:bg-[#3B82F6] transition-all duration-200 shadow-md">
                Edit
              </button>`
            : ""
        }
        <a href="/listing?id=${
          listing.id
        }" class="px-4 py-2 bg-[#28A745] text-white text-sm font-medium rounded-md hover:bg-[#388E3C] transition-all duration-200 shadow-md">
          View
        </a>
        ${
          editAllowed
            ? `<button class="delete-btn px-4 py-2 bg-[#E53935] text-white text-sm font-medium rounded-md hover:bg-[#D32F2F] transition-all duration-200 shadow-md">
                Delete
              </button>`
            : ""
        }
      </div>
    </div>
  `;

  // Legg til event listener for edit-knappen
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

  // Legg til event listener for delete-knappen
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

  // Returner auksjonskortet
  return listIthem;
}
