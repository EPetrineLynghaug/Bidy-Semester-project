import { searchAuctionListings } from "../api/auctionListings.api.js";
import { listingCardComponent } from "./listingCard.components.js";

const urlParams = {
  searchTerm: undefined,
  page: 1,
  total: 12,
};

function createPaginationButton(pagenumber, callback) {
  const btn = document.createElement("button");
  btn.className = "bg-blue-400 py-2 px-4";
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
  currentDiv.className = "bg-gray-200 py-2 px-4";
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
        newListingCard.classList.add("flex", "flex-col", "justify-between");
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
        '<p class="text-gray-600">No results found for your search.</p>';
    }
  } catch (error) {
    console.error("Error fetching search results: ", error.message);
    document.querySelector("#searchResult").innerHTML =
      "<p>Error loading search results. Please try again later.</p>";
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
      <div class="flex justify-between flex-wrap w-full p-4">
        <h2 class="text-xl">Search results for: ${searchTerm}</h2>
        <button id="closeSearchModal" class="bg-red-400 py-2 px-4">
          Close
        </button>
        <div class="w-full">
          <p id="searchResultSummary"></p>
        </div>
      </div>

      <div id="searchResult" 
           class="flex-1 overflow-auto grid gap-4 grid-cols-1 sm:grid-cols-1 md:grid-cols-2">
      </div>

      <div id="searchPagination" class="flex gap-4 p-4">
        <button id="previousPage" class="bg-gray-300 py-2 px-4">
          Prev
        </button>

        <div id="dynamicPagination" class="flex-1 flex align-center justify-center gap-4">
        </div>

        <button id="nextPage" class="bg-gray-300 py-2 px-4">
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

//TODO: sette opp en sjekk for om de har bilde med eller ikke
