import { renderAuthLinks } from "../components/authLinks.js";
import { fetchSingleCardDetails, Bid } from "../api/single.api.js";
import { renderAuctionDetails } from "../components/createSingleCard.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    renderAuthLinks();

    const cardId = new URLSearchParams(window.location.search).get("id");
    if (!cardId) {
      throw new Error("No auction ID provided in URL");
    }

    const auctionData = await fetchSingleCardDetails(cardId);
    if (!auctionData) {
      throw new Error("Failed to fetch auction details");
    }

    renderAuctionDetails(auctionData);
    bidNow(cardId);
  } catch (error) {
    console.error("Error during initialization:", error.message);
    document.querySelector(
      ".container"
    ).innerHTML = `<p class="text-red-500">Error loading page: ${error.message}</p>`;
  }
});

function bidNow(id) {
  const bidForm = document.querySelector("#bid-form");
  const customBidInput = document.querySelector("#custom-bid");

  if (!bidForm || !customBidInput) {
    console.error("Bid form or custom bid input not found.");
    return;
  }

  bidForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const selectedBid = document.querySelector(
      'input[name="bid-amount"]:checked'
    );
    let bidAmount;

    if (customBidInput.value) {
      bidAmount = customBidInput.value.trim();
    } else if (selectedBid) {
      bidAmount = selectedBid.value;
    } else {
      alert("Please select a bid amount or enter a custom bid.");
      return;
    }

    bidAmount = Number(bidAmount);
    if (isNaN(bidAmount) || bidAmount <= 0) {
      alert("Please enter a valid bid amount greater than 0.");
      return;
    }

    const formData = { amount: bidAmount };

    try {
      const result = await Bid(id, formData);

      if (result) {
        alert("Bid submitted successfully!");
        const auctionData = await fetchSingleCardDetails(id); 
        renderAuctionDetails(auctionData); 
      } else {
        alert("Failed to submit bid. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting bid:", error.message);
      alert("An error occurred while submitting your bid.");
    }
  });
}

// import { renderAuthLinks } from "../components/authLinks.js";
// import { fetchSingleCardDetails, Bid } from "../api/single.api.js";
// import { renderAuctionDetails } from "../components/createSingleCard.js";

// document.addEventListener("DOMContentLoaded", async () => {
//   try {
//     renderAuthLinks();

//     const cardId = new URLSearchParams(window.location.search).get("id");
//     bidNow(cardId);
//     if (!cardId) {
//       throw new Error("No auction ID provided in URL");
//     }

//     const auctionData = await fetchSingleCardDetails(cardId);
//     renderAuctionDetails(auctionData);
//   } catch (error) {
//     console.error("Error during initialization:", error.message);

//     const container = document.querySelector(".container");
//     if (container) {
//       container.innerHTML = `<p class="text-red-500">Error loading page: ${error.message}</p>`;
//     }
//   }
// });
// function bidNow(id) {
//   const bidForm = document.querySelector("#bid-form");
//   const customBidInput = document.querySelector("#custom-bid");
//   console.log(bidForm);
//   console.log(customBidInput);
//   if (!bidForm || !customBidInput) {
//     console.error("Bid form or custom bid input not found.");
//     return;
//   }
//   bidForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const selectedBid = document.querySelector(
//       'input[name="bid-amount"]:checked'
//     );

//     let bidAmount = customBidInput.value || selectedBid.value;

//     let formData = {
//       amount: Number(bidAmount),
//     };

//     if (!bidAmount || isNaN(bidAmount) || bidAmount <= 0) {
//       alert("Please select a valid bid amount.");
//       return;
//     }

//     let result = await Bid(id, formData);

//     if (result) {
//       alert("Bid submitted successfully!");
//     } else {
//       alert("Failed to submit bid. Please try again.");
//     }
//     console.log(result);
//   });
// }
