// // src/utilities/carouselUtils.js

// export function initializeCarousel(carouselElement, totalImages) {
//   const carouselInner = carouselElement.querySelector(".carousel-inner");
//   const prevBtn = carouselElement.querySelector(".prev");
//   const nextBtn = carouselElement.querySelector(".next");
//   let currentIndex = 0;

//   // Funksjon for å oppdatere karusellen
//   function updateCarousel() {
//     const translateX = -currentIndex * 100;
//     carouselInner.style.transform = `translateX(${translateX}%)`;
//   }

//   // Event listener for forrige knapp
//   prevBtn.addEventListener("click", () => {
//     if (currentIndex > 0) {
//       currentIndex--;
//       updateCarousel();
//     }
//   });

//   nextBtn.addEventListener("click", () => {
//     if (currentIndex < totalImages - 1) {
//       currentIndex++;
//       updateCarousel();
//     }
//   });

//   // Optional: Swipe gestures for mobile devices
//   let startX = 0;
//   let endX = 0;

//   carouselElement.addEventListener("touchstart", (e) => {
//     startX = e.changedTouches[0].screenX;
//   });

//   carouselElement.addEventListener("touchend", (e) => {
//     endX = e.changedTouches[0].screenX;
//     handleGesture();
//   });

//   function handleGesture() {
//     if (endX < startX - 50 && currentIndex < totalImages - 1) {
//       currentIndex++;
//       updateCarousel();
//     }
//     if (endX > startX + 50 && currentIndex > 0) {
//       currentIndex--;
//       updateCarousel();
//     }
//   }
// }
