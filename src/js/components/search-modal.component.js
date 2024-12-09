import { searchAuctionListings } from "../api/auctionListings.api.js";
import { listingCardComponent } from "./listingCard.components.js";

const urlParams = {
  searchTerm: undefined,
  page: 1,
  total: 12,
};

function createPaginationButton(pagenumber, callback) {
  const btn = document.createElement("button");
  btn.className =
    pagenumber === urlParams.page
      ? "bg-[#1565C0] text-white font-medium rounded-md py-2 px-3 shadow-md"
      : "bg-gray-300 text-gray-600 font-medium rounded-md py-2 px-3 hover:bg-gray-400 transition duration-300";
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
    paginationButtonDiv.append(
      createPaginationButton(previous, async (pagenumber) => {
        callback(pagenumber);
        setTimeout(scrollToTop, 50); // Ensure scroll after rendering
      })
    );
  }

  const currentDiv = document.createElement("div");
  currentDiv.className =
    "bg-[#1565C0] text-white font-medium py-2 px-3 rounded-md shadow-md";
  currentDiv.innerText = current;
  paginationButtonDiv.append(currentDiv);

  if (next && next <= total) {
    paginationButtonDiv.append(
      createPaginationButton(next, async (pagenumber) => {
        callback(pagenumber);
        setTimeout(scrollToTop, 50);
      })
    );
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
        const newListingCard = listingCardComponent(listing, "search");
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
        setTimeout(scrollToTop, 50);
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
  // Reset til side 1 for nytt søk
  urlParams.searchTerm = searchTerm;
  urlParams.page = 1;

  const searchModal = document.createElement("div");
  searchModal.id = "searchModalBackdrop";
  searchModal.className =
    "fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-50";

  searchModal.innerHTML = `
    <div
      id="searchModalCard"
      class="bg-white flex flex-col rounded-lg shadow-lg w-11/12 h-5/6 max-w-lg md:max-w-2xl lg:max-w-3xl relative"
      role="dialog" aria-labelledby="searchResultSummary" aria-modal="true"
    >
      <div class="flex justify-between flex-wrap w-full p-4 border-b relative">
        <h2 class="text-xl font-bold text-gray-700">Search results for: <span class="text-blue-500">${searchTerm}</span></h2>
        <button
          id="closeSearchModal"
          class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full border border-red-600 shadow-md hover:bg-red-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          title="Close Modal"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
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
      setTimeout(scrollToTop, 50); // Ensure scroll after rendering
    }
  });

  nextPageButton.addEventListener("click", async (e) => {
    e.preventDefault();
    const { total } = await getTotalPages();
    if (urlParams.page < total) {
      urlParams.page++;
      await renderSearchResults();
      setTimeout(scrollToTop, 50); // Ensure scroll after rendering
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

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth", // Smooth scrolling
  });
}

// Legg til støtte for Enter-tast i søkefeltet
document
  .getElementById("search-input")
  .addEventListener("keypress", async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const searchTerm = e.target.value.trim();
      if (searchTerm) {
        await openSearchModal(searchTerm);
      }
    }
  });
