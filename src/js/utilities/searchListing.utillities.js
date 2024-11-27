import { searchAuctionListings } from "../api/auctionListings.api.js";

export async function searchListing() {
  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const resultsContainer = document.querySelector("#results-container");

  if (!searchInput || !searchButton || !resultsContainer) {
    console.error(
      "Search input, search button, or results container not found.",
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

      listings.forEach((item) => {
        const itemElement = document.createElement("div");
        itemElement.classList.add(
          "listing",
          "border",
          "rounded-lg",
          "p-4",
          "mb-2",
          "cursor-pointer",
          "hover:bg-gray-100",
        );

        itemElement.innerHTML = `
          <h3 class="font-bold text-lg">${item.title}</h3>
          <p class="text-gray-600">${item.description}</p>
          ${
            item.media && item.media[0]
              ? `<img src="${item.media[0].url}" alt="${
                  item.media[0].alt || "Listing image"
                }" class="mt-2 max-h-40 object-cover" />`
              : ""
          }
        `;

        itemElement.addEventListener("click", () => {
          alert(`Clicked on: ${item.title}`);
        });

        resultsContainer.appendChild(itemElement);
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
