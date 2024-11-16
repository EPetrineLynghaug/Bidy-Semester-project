export function generateBidRows(bids) {
  return bids
    .map(
      (bid) => `
        <tr>
          <td class="border border-gray-300 px-2 py-1">${bid.amount} Coins</td>
          <td class="border border-gray-300 px-2 py-1">${
            bid.bidder?.name || "Anonymous"
          }</td>
          <td class="border border-gray-300 px-2 py-1">${new Date(
            bid.created
          ).toLocaleDateString()}</td>
          <td class="border border-gray-300 px-2 py-1">${new Date(
            bid.created
          ).toLocaleTimeString()}</td>
        </tr>
      `
    )
    .join("");
}
