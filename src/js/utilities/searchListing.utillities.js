import { searchAuctionListings } from "../api/auctionListings.api.js";
import { listingCardComponent } from "../components/listingCard.components.js";

export async function searchListing() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const resultsContainer = document.querySelector("#results-container");
  const resultModal = document.querySelector("#results-modal");

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
      const listings = await searchAuctionListings(searchTerm);

      resultsContainer.innerHTML = "";

      if (listings.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
        return;
      }

      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.className = "bg-red-500 text-white px-4 py-2 rounded-md mb-4";
      closeButton.addEventListener("click", clearResults);
      resultsContainer.appendChild(closeButton);

      listings.forEach((listing) => {
        const card = listingCardComponent(listing);
        resultsContainer.appendChild(card);
      });
    } catch (error) {
      console.error("Error rendering results:", error);
      resultsContainer.innerHTML = `<p>An error occurred: ${error.message}</p>`;
    }
  };

  // Event listeners for search actions
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      renderResults(searchInput.value.trim());
    }
  });

  searchButton.addEventListener("click", () => {
    renderResults(searchInput.value.trim());
  });
}
