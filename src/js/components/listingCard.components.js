// import { openModal } from "../components/DetailModal.js";

// // Funksjon for å lage auksjonskort
// export function createAuctionCard(listing) {
//   const card = document.createElement("div");
//   card.className =
//     "auction-card border rounded-lg shadow-lg p-4 bg-white flex flex-col gap-4";

//   // --- Karusell for bilder ---
//   const carousel = createImageCarousel(listing.media || []);
//   card.appendChild(carousel);

//   // --- Tittel ---
//   const title = document.createElement("h1");
//   title.textContent = listing.title || "Untitled Auction";
//   title.className =
//     "auction-card__title text-lg font-bold text-gray-800 truncate";
//   card.appendChild(title);

//   // --- Forfatterseksjon (Selger) ---
//   const authorSection = createAuthorSection(listing.seller);
//   card.appendChild(authorSection);

//   // --- Datoer ---
//   const dateSection = createDateSection(listing.created, listing.endsAt);
//   card.appendChild(dateSection);

//   // --- Beskrivelse ---
//   const description = document.createElement("p");
//   description.textContent = listing.description || "No description available.";
//   description.className =
//     "auction-card__description text-sm text-gray-700 line-clamp-3";
//   card.appendChild(description);

//   // --- Siste bud ---
//   const bidSection = createBidSection(listing);
//   card.appendChild(bidSection);

//   // --- "Bid Now"-knapp ---
//   const bidButton = document.createElement("button");
//   bidButton.textContent = "Bid Now";
//   bidButton.className =
//     "auction-card__button mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition";
//   bidButton.dataset.cardId = listing.id;
//   bidButton.addEventListener("click", () => {
//     openModal(`Details for Auction ID: ${listing.id}`); // Dynamisk modal (eller annen logikk)
//   });
//   card.appendChild(bidButton);

//   return card;
// }

// // --- Hjelpefunksjoner ---

// // Karusell for bilder
// function createImageCarousel(images) {
//   const carousel = document.createElement("div");
//   carousel.className =
//     "carousel relative w-full h-48 flex items-center justify-center overflow-hidden";

//   let currentIndex = 0;

//   const image = document.createElement("img");
//   image.src =
//     images[currentIndex]?.url || "https://via.placeholder.com/400x300";
//   image.alt = images[currentIndex]?.alt || "Auction image";
//   image.className = "w-full h-full object-cover rounded";
//   carousel.appendChild(image);

//   const prevButton = document.createElement("button");
//   prevButton.textContent = "❮";
//   prevButton.className =
//     "absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700";
//   prevButton.addEventListener("click", () => {
//     currentIndex = (currentIndex - 1 + images.length) % images.length;
//     image.src =
//       images[currentIndex]?.url || "https://via.placeholder.com/400x300";
//     image.alt = images[currentIndex]?.alt || "Auction image";
//   });

//   const nextButton = document.createElement("button");
//   nextButton.textContent = "❯";
//   nextButton.className =
//     "absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded hover:bg-gray-700";
//   nextButton.addEventListener("click", () => {
//     currentIndex = (currentIndex + 1) % images.length;
//     image.src =
//       images[currentIndex]?.url || "https://via.placeholder.com/400x300";
//     image.alt = images[currentIndex]?.alt || "Auction image";
//   });

//   carousel.appendChild(prevButton);
//   carousel.appendChild(nextButton);

//   return carousel;
// }

// // Forfatterseksjon (Selger)
// function createAuthorSection(seller) {
//   const authorSection = document.createElement("div");
//   authorSection.className = "auction-card__author flex items-center gap-2";

//   // Bruker avatar for bilde, fall tilbake til en plassholder om den ikke finnes
//   const authorImage = document.createElement("img");
//   authorImage.src = seller?.avatar?.url || "https://via.placeholder.com/50";
//   authorImage.alt = seller?.name || "Unknown Author";
//   authorImage.className = "auction-card__author-image w-8 h-8 rounded-full";

//   const authorLink = document.createElement("a");
//   authorLink.href = `/profile/?name=${seller?.name || ""}`;
//   authorLink.textContent = seller?.name || "Unknown Author";
//   authorLink.className =
//     "auction-card__author-name text-sm text-blue-500 hover:underline";

//   // Legg til bilde og navn til seksjonen
//   authorSection.appendChild(authorImage);
//   authorSection.appendChild(authorLink);

//   return authorSection;
// }

// // Datoer
// function createDateSection(created, endsAt) {
//   const dateSection = document.createElement("div");
//   dateSection.className = "auction-card__dates text-sm text-gray-500";

//   const createdDate = created
//     ? new Date(created).toLocaleDateString()
//     : "Unknown date";
//   const endsDate = endsAt
//     ? new Date(endsAt).toLocaleDateString()
//     : "Unknown end date";

//   const postedDate = document.createElement("p");
//   postedDate.textContent = `Posted: ${createdDate}`;
//   postedDate.className = "auction-card__date-posted";

//   const expiresDate = document.createElement("p");
//   expiresDate.textContent = `Expires: ${endsDate}`;
//   expiresDate.className = "auction-card__date-expires";

//   dateSection.appendChild(postedDate);
//   dateSection.appendChild(expiresDate);

//   return dateSection;
// }

// // Siste budseksjon
// function createBidSection(listing) {
//   const bidSection = document.createElement("div");
//   bidSection.className = "auction-card__bid-section text-sm text-gray-500";

//   // Hvis det er bud, vis det siste budet
//   const currentBid =
//     listing.bids && listing.bids.length > 0
//       ? `Current bid: $${listing.bids[listing.bids.length - 1].amount}`
//       : "No bids yet";

//   const bidText = document.createElement("p");
//   bidText.textContent = currentBid;
//   bidText.className = "auction-card__current-bid";

//   bidSection.appendChild(bidText);

//   return bidSection;
// }
// src/js/ui/createAuctionCard.js

export function listingCardComponent(listing) {
  const { bids, seller, media } = listing;

  const card = document.createElement("div");
  card.className =
    "auction-card border rounded-lg shadow-lg p-4 bg-white flex flex-col gap-4";

  let currentBid = 0;
  if (bids.length > 0) {
    currentBid = bids[bids.length - 1].amount;
  }
  console.log(listing.media);
  console.log(listing);
  card.innerHTML = `
    <div class="carousel relative w-full h-48 flex items-center justify-center overflow-hidden">
      <img src="${
        media[0] ? media[0].url : "https://via.placeholder.com/400x300"
      }"
           alt="${media[0] ? media[0].alt : "Auction image"}"
           class="w-full h-full object-cover rounded">
    </div>
    <h1 class="text-lg font-bold text-gray-800 truncate">${
      listing.title || "Untitled Auction"
    }</h1>
    <p class="text-sm text-gray-700 line-clamp-3">${
      listing.description || "No description available."
    }</p>
    <div class="text-sm text-gray-500">
      <p>Posted: ${new Date(listing.created).toLocaleDateString()}</p>
      <p>Expires: ${new Date(listing.endsAt).toLocaleDateString()}</p>
    </div>
    <p class="text-sm text-gray-500">
      Current bid: ${currentBid}
    </p>
    <a href="/src/views/singleCard.html?id=${listing.id}"
       class="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition block text-center">
      View Details
    </a>
  `;

  return card;
}

// index.html
// => src/js/views/index.view.js (kjøres auto)
// ==> Hent fra API => src/js/api/listings.api.js
// ==> Lag kort     => src/js/components/listingCard.component.js
// Rendre ut i HTML
// addEventListener

// index.html
// script => index.js
//            hent kort fra API => getAllListings.api.js
//            lage html kort med info fra API => createListingCards.component.js
//
// index.html
// => index.js !AUTO
// => createAuctionCard.js

//
// about.html
// => about.js
//
// index.html
// auth/
//  login/
//  index.html
// src
//  - js
//    - api
//      - login.api.js
//      - register.api.js
//    - views
//      - login.view.js
//      - register.view.js
//    - components
//      - card.component.js
//  - views
//    - singleCard.html => domene.com/src/views/singleCard.html
//
// index.html
// auth/
//    login/
//        index.html
//        login.js
