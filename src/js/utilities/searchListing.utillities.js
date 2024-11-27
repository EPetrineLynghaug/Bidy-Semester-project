export async function searchListing() {
  console.log("searchListing initialized");

  const searchInput = document.querySelector("#search-input");
  const searchButton = document.querySelector("#search-button");
  const resultsContainer = document.querySelector("#results-container");

  if (!searchInput || !searchButton || !resultsContainer) {
    console.error(
      "Search input, search button, or results container not found."
    );
    return;
  }

  // Mock data for testing
  const mockListings = [
    { id: 1, title: "Auction 1", description: "Description for auction 1" },
    { id: 2, title: "Special Auction", description: "Limited time only" },
    { id: 3, title: "Rare Item", description: "This is a rare item" },
  ];

  // Tømmer søkefeltet og resultatene
  const clearResults = () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
    resultsContainer.classList.add("hidden");
  };

  // Render resultater fra mock-data
  const renderResults = (searchTerm) => {
    clearResults();

    if (!searchTerm) {
      resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
      resultsContainer.classList.remove("hidden");
      return;
    }

    const filteredListings = mockListings.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        searchTerm
          .split("")
          .some((char) => item.title.toLowerCase().includes(char))
    );

    if (filteredListings.length === 0) {
      resultsContainer.innerHTML = "<p>No results found</p>";
      resultsContainer.classList.remove("hidden");
      return;
    }

    // Legger til close-knapp
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "bg-red-500 text-white px-4 py-2 rounded-md mb-4";
    closeButton.addEventListener("click", clearResults);
    resultsContainer.appendChild(closeButton);

    // Render listings
    filteredListings.forEach((item) => {
      const itemElement = document.createElement("div");
      itemElement.className =
        "listing border rounded-lg p-4 mb-2 cursor-pointer hover:bg-gray-100";
      itemElement.innerHTML = `
        <h3 class="font-bold text-lg">${item.title}</h3>
        <p class="text-gray-600">${item.description}</p>
      `;
      itemElement.addEventListener("click", () => {
        alert(`Clicked on: ${item.title}`);
      });
      resultsContainer.appendChild(itemElement);
    });

    resultsContainer.classList.remove("hidden");
  };

  //  søk med Enter
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      renderResults(searchInput.value.trim().toLowerCase());
    }
  });

  searchButton.addEventListener("click", () => {
    renderResults(searchInput.value.trim().toLowerCase());
  });
}
