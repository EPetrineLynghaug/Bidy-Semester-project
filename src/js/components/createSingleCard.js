// Assuming this function will create a card UI element dynamically
export function createSingleCard(details) {
  const container = document.getElementById("post-content");

  if (container) {
    // Example HTML rendering (You can adjust based on your API response structure)
    container.innerHTML = `
        <div class="auction-card">
          <h2>${details.title}</h2>
          <p>${details.description}</p>
          <p><strong>Starting Price:</strong> $${details.startingPrice}</p>
          <p><strong>End Time:</strong> ${new Date(
            details.endTime
          ).toLocaleString()}</p>
          <img src="${details.imageUrl}" alt="${details.title}" />
        </div>
      `;
  } else {
    console.error("Container element not found");
  }
}
