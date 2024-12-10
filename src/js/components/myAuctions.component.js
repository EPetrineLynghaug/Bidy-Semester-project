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

  listIthem.className =
    "auction-card p-4 flex flex-row gap-6 border-b-2 border-blue-800 max-w-screen-lg font-sans";
  listIthem.dataset.id = listing.id;
  listIthem.innerHTML = `
  <!-- Bildeseksjon -->
  <div class="w-1/3 md:w-1/4 lg:w-1/2 aspect-[16/9] relative flex-shrink-0">
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
  <div class="flex flex-col justify-between flex-1 max-w-md lg:max-w-lg gap-4">
    <div class="flex flex-col gap-2 text-sm lg:text-base flex-grow">
      <h1 class="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-800 leading-snug truncate">
        ${listing.title || "Untitled Auction"}
      </h1>
      <p class="text-base sm:text-lg lg:text-xl text-gray-700 leading-snug font-normal line-clamp-2 sm:line-clamp-none">
        ${
          mobileDescription
            ? mobileDescription.split(" ").slice(0, 5).join(" ") + "..."
            : "No description available."
        }
      </p>
      <p class="text-sm sm:text-base lg:text-lg text-gray-800 font-medium">
        $${currentBid.toFixed(
          2
        )} <span class="text-gray-500">/ Current bid</span>
      </p>
    </div>

    <!-- Knappeseksjon -->
    <div class="flex gap-2 md:gap-4 mt-auto md:ml-auto md:justify-end">
      ${
        isActive && editAllowed
          ? `<button class="edit-btn px-4 py-2 lg:px-5 lg:py-2.5 bg-[#5C9DED] text-white text-sm sm:text-base lg:text-base font-medium rounded-md hover:bg-[#3B82F6] transition-all duration-200 shadow-md">
              Edit
            </button>`
          : ""
      }
      <a href="/listing?id=${
        listing.id
      }" class="px-4 py-2 lg:px-5 lg:py-2.5 bg-[#28A745] text-white text-sm sm:text-base lg:text-base font-medium rounded-md hover:bg-[#1e7e34] transition-all duration-200 shadow-md">
        View
      </a>
      ${
        editAllowed
          ? `<button id="delete-btn" class="delete-btn px-4 py-2 lg:px-5 lg:py-2.5 bg-[#E53935] text-white text-sm sm:text-base lg:text-base font-medium rounded-md hover:bg-[#D32F2F] transition-all duration-200 shadow-md">
              Delete
            </button>`
          : ""
      }
    </div>
  </div>
`;
  // Returner auksjonskortet
  return listIthem;
}
