import { API_BASE, createHeaders } from "./apiConfig.js";
import { createSingleCard } from "./ui/createSingleCard.js";

export async function fetchSingleCardDetails(id) {
  try {
    const url = `${API_BASE}/auction/listings/${id}`;
    console.log(`Fetching details for card ID: ${id}`);
    const response = await fetch(url, {
      method: "GET",
      headers: createHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching auction details (status: ${response.status})`
      );
    }

    const details = await response.json();
    console.log("Auction details fetched successfully:", details);
    return details;
  } catch (error) {
    console.error("Error fetching details:", error.message);
    alert(
      "Something went wrong. Could not fetch auction details. Please try again later."
    );
    return null;
  }
}

// Funksjon for å vise kortdetaljer i HTML-en
export function renderSingleCardDetails(details) {
  const container = document.getElementById("single-card-container");

  if (!details) {
    container.innerHTML = "<p>Details not available.</p>";
    return;
  }

  // Lag HTML-innhold for kortdetaljene
  container.innerHTML = `
    <h2 class="text-2xl font-bold mb-4">${details.title}</h2>
    <div class="flex gap-4">
      <img 
        src="${
          (details.media && details.media[0]?.url) ||
          "https://via.placeholder.com/400"
        }" 
        alt="${details.title}" 
        class="w-48 h-48 object-cover rounded-md"
      />
      <div class="flex flex-col">
        <p class="text-lg font-semibold">Seller: ${
          details.seller?.name || "Unknown"
        }</p>
        <p class="text-sm text-gray-500">Posted on: ${new Date(
          details.created
        ).toLocaleDateString()}</p>
        <p class="text-sm text-gray-500">Expires: ${new Date(
          details.endsAt
        ).toLocaleDateString()}</p>
        <p class="mt-4">${
          details.description || "No description available."
        }</p>
      </div>
    </div>
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
      Place Bid
    </button>
  `;
}

// Hent ID-en fra URL-en og vis detaljer for kortet
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  if (!id) {
    alert("No auction ID provided.");
    return;
  }

  const details = await fetchSingleCardDetails(id);
  renderSingleCardDetails(details);
});
