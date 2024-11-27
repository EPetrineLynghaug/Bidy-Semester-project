import { searchAuctionListings } from "../api/auctionListings.api.js";
import { listingCardComponent } from "../components/listingCard.components.js";

export async function searchListing() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const resultsContainer = document.querySelector("#results-container");
  const resultModal = document.querySelector("#results-modal");
  const paginationContainer = document.querySelector("#pagination-container");

  const urlParams = {
    page: 1,
    limit: 12,
  };

  if (!searchInput || !searchButton || !resultsContainer) {
    console.error(
      "Search input, search button, or results container not found."
    );
    return;
  }

  const clearResults = () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    resultsContainer.classList.add("hidden");
  };

  const renderPagination = (currentPage, totalPages) => {
    paginationContainer.innerHTML = "";

    const createBtnPagination = (label, page, isDisabled) => {
      const paginationBtn = document.createElement("button");
      paginationBtn.textContent = label;
      paginationBtn.className = `bg-blue-500 text-white px-4 py-2 rounded-md ${
        isDisabled ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
      }`;
      paginationBtn.disabled = isDisabled;
      paginationBtn.addEventListener("click", () => {
        urlParams.page = page;
        renderResults(searchInput.value.trim());
      });
      return paginationBtn;
    };

    paginationContainer.appendChild(
      createBtnPagination("Previous", currentPage - 1, currentPage === 1)
    );

    const maxVisibleButtons = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, startPage + maxVisibleButtons - 1);

    if (startPage <= endPage) {
      let i = startPage;
      while (i <= endPage) {
        const isActive = i === currentPage;

        if (isActive) {
          paginationContainer.appendChild(
            createBtnPagination(i, i, false, true)
          );
        } else {
          paginationContainer.appendChild(
            createBtnPagination(i, i, false, false)
          );
        }

        i++;
      }
    }
    // "Next" Button
    paginationContainer.appendChild(
      createBtnPagination("Next", currentPage + 1, currentPage === totalPages)
    );
  };
  const renderResults = async (searchTerm) => {
    clearResults();

    if (!searchTerm) {
      resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
      resultsContainer.classList.remove("hidden");
      return;
    }

    try {
      resultsContainer.innerHTML = "<p>Loading...</p>";
      resultsContainer.classList.remove("hidden");

      resultModal.classList.remove("hidden");
      resultModal.classList.add("flex");

      const result = await searchAuctionListings(
        searchTerm,
        urlParams.page,
        urlParams.limit
      );

      // const listings = await searchAuctionListings(searchTerm);

      resultsContainer.innerHTML = "";

      if (result.listings.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
        return;
      }

      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.className = "bg-red-500 text-white px-4 py-2 rounded-md mb-4";
      closeButton.addEventListener("click", clearResults);
      resultsContainer.appendChild(closeButton);

      result.listings.forEach((listing) => {
        const card = listingCardComponent(listing);
        resultsContainer.appendChild(card);
      });

      renderPagination(urlParams.page, result.pagination.total);
    } catch (error) {
      console.error("Error rendering results:", error);
      resultsContainer.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
  };

  // Event listeners for search actions
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      urlParams.page = 1;
      renderResults(searchInput.value.trim());
    }
  });

  searchButton.addEventListener("click", () => {
    urlParams.page = 1;
    renderResults(searchInput.value.trim());
  });
}
