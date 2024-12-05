export function initializeCarousel(images) {
  const carouselContainer = document.querySelector("#carousel-images");
  const carouselLabel = document.querySelector("#carousel-label");

  if (!carouselContainer || !carouselLabel) {
    console.error("Carousel elements are missing.");
    return;
  }

  // Dynamically add images
  carouselContainer.innerHTML = "";
  images.forEach((image, index) => {
    const img = document.createElement("img");
    img.src = image.url;
    img.alt = image.alt || `Image ${index + 1}`;
    img.className = "w-full h-full object-cover flex-shrink-0";
    carouselContainer.appendChild(img);
  });

  let currentIndex = 0;

  function updateCarousel() {
    const totalImages = images.length;
    const translateX = -currentIndex * 100;
    carouselContainer.style.transform = `translateX(${translateX}%)`;
    carouselLabel.textContent = `${currentIndex + 1}/${totalImages}`;
  }

  // Add click event to switch images on click
  carouselContainer.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateCarousel();
  });

  // Add swipe functionality for touch devices
  let startX = 0;
  carouselContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
  });

  carouselContainer.addEventListener("touchend", (e) => {
    const endX = e.changedTouches[0].clientX;
    if (endX - startX > 50) {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
    } else if (startX - endX > 50) {
      currentIndex = (currentIndex + 1) % images.length;
    }
    updateCarousel();
  });

  updateCarousel();
}
