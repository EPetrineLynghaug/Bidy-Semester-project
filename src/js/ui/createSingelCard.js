export function createSingleCard(details) {
  return `
    <h1 class="text-2xl font-bold text-gray-800">${details.title}</h1>
    <div class="flex items-center gap-4">
      <img src="${
        details.seller?.image || "https://via.placeholder.com/50"
      }" alt="Seller" class="w-12 h-12 rounded-full">
      <span class="text-gray-600">By: ${
        details.seller?.name || "Unknown Author"
      }</span>
    </div>
    <p class="text-sm text-gray-500">Posted: ${new Date(
      details.created
    ).toLocaleString()}</p>
    <p class="text-sm text-gray-500">Expires: ${new Date(
      details.endsAt
    ).toLocaleString()}</p>
    <div class="carousel w-full h-48 flex overflow-hidden">
      ${details.media
        .map(
          (mediaItem) =>
            `<img src="${mediaItem.url}" alt="${
              mediaItem.alt || "Auction image"
            }" class="w-full h-full object-cover rounded">`
        )
        .join("")}
    </div>
    <p class="text-gray-700">${
      details.description || "No description available."
    }</p>
  `;
}
