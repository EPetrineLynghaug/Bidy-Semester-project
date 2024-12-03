export function initializeCarousel(images) {
  const carouselContainer = document.querySelector("#carousel-images");
  const carouselLabel = document.querySelector("#carousel-label");
  const prevButton = document.querySelector("#carousel-prev");
  const nextButton = document.querySelector("#carousel-next");

  if (!carouselContainer || !carouselLabel || !prevButton || !nextButton) {
    console.error("Carousel elements are missing.");
    return;
  }

  // Dynamisk legge til bilder i karusellen
  carouselContainer.innerHTML = "";
  images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.alt || `Image ${index + 1}`;
    img.className = "w-full h-full object-cover flex-shrink-0";
    carouselContainer.appendChild(img);
  });

  let currentIndex = 0;

  // Oppdater visningen av karusellen
  function updateCarousel() {
    const totalImages = images.length;
    const translateX = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${translateX}%)`;
    carouselLabel.textContent = `${currentIndex + 1}/${totalImages}`;
  }

  // Navigasjonsknapper
  prevButton.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateCarousel();
  });

  nextButton.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  // Initial oppdatering
  updateCarousel();
}
