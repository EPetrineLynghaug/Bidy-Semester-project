import { searchAuctionListings } from "../api/auctionListings.api.js";
import { listingCardComponent } from "./listingCard.components.js";

const urlParams = {
  searchTerm: undefined,
  page: 1,
  total: 12,
};

function createPaginationButton(pagenumber, callback) {
  const btn = document.createElement("button");
  // Endrer klassen for aktiv og inaktiv knapp
  btn.className =
    pagenumber === urlParams.page
      ? "bg-[#1565C0] text-white font-medium rounded-md py-2 px-3 shadow-md" // Aktiv knapp
      : "bg-gray-300 text-gray-600 font-medium rounded-md py-2 px-3 hover:bg-gray-400 transition duration-300"; // Inaktiv knapp

  btn.innerText = pagenumber;

  btn.addEventListener("click", async (e) => {
    e.preventDefault();
    callback(pagenumber);
  });

  return btn;
}

function renderPaginationButtons(pagination, callback) {
  const { current, previous, next, total } = pagination;
  const paginationButtonDiv = document.querySelector("#dynamicPagination");
  paginationButtonDiv.innerHTML = "";

  if (previous && previous > 0) {
    paginationButtonDiv.append(createPaginationButton(previous, callback));
  }

  const currentDiv = document.createElement("div");
  currentDiv.className =
    "bg-[#1565C0] text-white font-medium py-2 px-3 rounded-md shadow-md";
  currentDiv.innerText = current;
  paginationButtonDiv.append(currentDiv);

  if (next && next <= total) {
    paginationButtonDiv.append(createPaginationButton(next, callback));
  }
}

async function renderSearchResults() {
  try {
    const result = await searchAuctionListings(
      urlParams.searchTerm,
      urlParams.page,
      urlParams.total
    );

    const searchResultDiv = document.querySelector("#searchResult");
    searchResultDiv.innerHTML = "";

    if (result.listings.length > 0) {
      result.listings.forEach((listing) => {
        const newListingCard = listingCardComponent(listing);
        newListingCard.classList.add(
          "flex",
          "flex-col",
          "justify-between",
          "rounded-lg",
          "border",
          "shadow-sm",
          "p-4",
          "bg-white",
          "hover:shadow-lg",
          "transition-shadow"
        );
        searchResultDiv.append(newListingCard);
      });

      const searchResultSummary = document.querySelector(
        "#searchResultSummary"
      );
      searchResultSummary.innerText = `Showing ${result.listings.length} results on page ${urlParams.page} of ${result.pagination.total} pages`;

      renderPaginationButtons(result.pagination, async (pagenumber) => {
        urlParams.page = pagenumber;
        await renderSearchResults();
      });
    } else {
      searchResultDiv.innerHTML =
        '<p class="text-gray-600 text-center">No results found for your search.</p>';
    }
  } catch (error) {
    console.error("Error fetching search results: ", error.message);
    document.querySelector("#searchResult").innerHTML =
      "<p class='text-red-600 text-center'>Error loading search results. Please try again later.</p>";
  }
}

export async function openSearchModal(searchTerm) {
  urlParams.searchTerm = searchTerm;

  const searchModal = document.createElement("div");
  searchModal.id = "searchModalBackdrop";
  searchModal.className =
    "fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50";

  searchModal.innerHTML = `
    <div
      id="searchModalCard"
      class="bg-white flex flex-col rounded-lg shadow-lg w-11/12 h-5/6 max-w-lg md:max-w-2xl lg:max-w-3xl relative"
    >
      <div class="flex justify-between flex-wrap w-full p-4 border-b relative">
        <h2 class="text-xl font-bold text-gray-700">Search results for: <span class="text-blue-500">${searchTerm}</span></h2>
        <button
          id="closeSearchModal"
          class="absolute top-4 right-4 bg-[#E53935] text-white w-10 h-10 max-h-12 max-w-12 rounded-full shadow-[0_4px_8px_rgba(0,0,0,0.2)] flex items-center justify-center border border-[#D32F2F] hover:bg-[#D32F2F] hover:shadow-[0_6px_12px_rgba(0,0,0,0.3)] hover:scale-105 active:scale-95 active:shadow-[0_2px_4px_rgba(0,0,0,0.2)] transition-all duration-200 ease-in-out md:top-6 md:right-6 md:w-12 md:h-12 lg:top-8 lg:right-8 lg:w-14 lg:h-14"
          style="max-height: 48px; max-width: 48px;"
          title="Close"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            role="img"
            aria-hidden="true"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div class="w-full mt-2 text-sm text-gray-500">
          <p id="searchResultSummary"></p>
        </div>
      </div>

      <div id="searchResult" 
           class="flex-1 overflow-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 p-4">
      </div>

      <div id="searchPagination" class="flex gap-4 items-center justify-center p-4 border-t bg-gray-50">
        <button id="previousPage" class="bg-[#1E88E5] text-white rounded-md py-2 px-4 hover:bg-[#1565C0] transition duration-300">
          Prev
        </button>

        <div id="dynamicPagination" class="flex align-center justify-center gap-2">
        </div>

        <button id="nextPage" class="bg-[#1E88E5] text-white rounded-md py-2 px-4 hover:bg-[#1565C0] transition duration-300">
          Next
        </button>
      </div>
    </div>
  `;
  document.body.append(searchModal);

  await renderSearchResults();

  setupModalNavigation();
}

function setupModalNavigation() {
  const previousPageButton = document.querySelector("#previousPage");
  const nextPageButton = document.querySelector("#nextPage");
  const closeSearchModal = document.querySelector("#closeSearchModal");

  closeSearchModal.addEventListener("click", () => {
    document.querySelector("#searchModalBackdrop").remove();
    document.getElementById("search-input").value = ""; // Clears search input field
  });

  previousPageButton.addEventListener("click", async (e) => {
    e.preventDefault();
    if (urlParams.page > 1) {
      urlParams.page--;
      await renderSearchResults();
    }
  });

  nextPageButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const { total } = await getTotalPages();
    if (urlParams.page < total) {
      urlParams.page++;
      await renderSearchResults();
    }
  });
}

async function getTotalPages() {
  const result = await searchAuctionListings(
    urlParams.searchTerm,
    1,
    urlParams.total
  );
  return { total: result.pagination.total };
}

// Function for triggering search
function handleSearch() {
  const searchTerm = document.getElementById("#search-input").value;
  console.log("Searching for:", searchTerm);
}
// document
//   .getElementById("#search-input")
//   .addEventListener("keydown", function (event) {
//     if (event.key === "Enter") {
//       event.preventDefault(); // Prevent form submission or other default behavior
//       handleSearch();
//     }
//   });
// Add event listener for Enter key pr
