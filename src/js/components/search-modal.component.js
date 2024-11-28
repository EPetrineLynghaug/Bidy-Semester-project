import { searchAuctionListings } from "../api/auctionListings.api.js";
import { listingCardComponent } from "./listingCard.components.js";

const urlParams = {
  searchTerm: undefined,
  page: 1,
  total: 12,
};

function createPaginationButton(pagenumber) {
  const btn = document.createElement("button");

  btn.className = "bg-blue-400 py-2 px-4";
  btn.innerText = pagenumber;

  btn.addEventListener("click", async (e) => {
    e.preventDefault();

    urlParams.page = pagenumber;
    await renderSearchResults();
  });

  return btn;
}

function renderPaginationButtons(pagination) {
  console.log("Pagination: ", pagination);
  const { current, previous, next, total } = pagination;
  const paginationButtonDiv = document.querySelector("#dynamicPagination"); // TODO: REMOVE
  paginationButtonDiv.innerHTML = ""; // TODO: REMOVE

  const buttons = [];

  if (previous && previous - 1 > 0) {
    const btn = createPaginationButton(previous - 1);
    buttons.push(btn);
    // paginationButtonDiv.append(btn);
  }

  if (previous) {
    const btn = createPaginationButton(previous);
    paginationButtonDiv.append(btn);
  }

  const currentDiv = document.createElement("div");
  currentDiv.className = "bg-gray-200 py-2 px-4";
  currentDiv.innerText = current;
  paginationButtonDiv.append(currentDiv);

  if (next) {
    const btn = createPaginationButton(next);
    paginationButtonDiv.append(btn);
  }

  if (next && next + 1 <= total) {
    const btn = createPaginationButton(next + 1);
    paginationButtonDiv.append(btn);
  }

  return buttons;
}

async function renderSearchResults() {
  // result = { listings, pagination }
  const result = await searchAuctionListings(
    urlParams.searchTerm,
    urlParams.page,
    urlParams.limit,
  );

  if (result.listings.length > 0) {
    const searchResultDiv = document.querySelector("#searchResult");
    searchResultDiv.innerHTML = "";

    result.listings.map((listing) => {
      const newListingCard = listingCardComponent(listing);
      searchResultDiv.append(newListingCard);
    });

    const searchResultSummary = document.querySelector("#searchResultSummary");
    searchResultSummary.innerText = `Showing ${urlParams.total} results on page ${urlParams.page} of ${result.pagination.total} pages`;
  } else {
    console.log("Found no posts with search term: " + urlParams.searchTerm);
    // TODO: make empty content state; whoops! no posts found..
  }

  // TODO: document.querySelector("#dynamicPagination");
  //       return buttons from renderPaginationButtons
  //       for loop, append buttons to dynamicPagination
  renderPaginationButtons(result.pagination); // => [ btn, btn, btn ]
  // ...
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
      class="bg-white flex flex-col rounded-lg shadow-lg w-8/8 h-5/6 max-w-lg md:max-w-2xl lg:max-w-3xl relative"
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

      <div id="searchResult" class="flex-1 overflow-auto overscroll-contain">
      </div>

      <div id="searchPagination" class="flex gap-4 p-4">
        <button id="previousPage">
          Prev
        </button>

        <div id="dynamicPagination" class="flex-1 flex align-center justify-center gap-4">
        </div>

        <button id="nextPage">
          Next
        </button>
      </div> <!-- #searchPagination end -->
    </div>
  `;
  document.body.append(searchModal);

  await renderSearchResults();

  const previousPageButton = document.querySelector("#previousPage");
  const nextPageButton = document.querySelector("#nextPage");

  previousPageButton.addEventListener("click", async (e) => {
    e.preventDefault();

    urlParams.page = urlParams.page - 1;
    await renderSearchResults();
  });

  nextPageButton.addEventListener("click", async (e) => {
    e.preventDefault();

    urlParams.page = urlParams.page + 1;
    await renderSearchResults();
  });
}
//TODO: REFACTORING: pagination Buttons- utillity fil med renderpaginationbutton. videre må buttons refactores til å heller pushes inn .
