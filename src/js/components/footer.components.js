export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function renderFooter() {
  const footerHTML = `
<footer class="footer bg-gray-800 text-white py-8 font-sans">
  <!-- Back to Top Arrow -->
  <div class="back-to-top" role="button" aria-label="Scroll to top">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="arrow-icon w-12 h-12 mx-auto mb-4">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  </div>

  <!-- Footer Image -->
  <div class="footer-image w-full flex justify-center mb-4">
    <img src="/src/media/processed_mobile-removebg-preview.png" alt="Footer Image" class="max-w-full h-auto">
  </div>

  <!-- Footer Content -->
  <div class="footer-content text-center">
    <!-- Icons Row -->
    <div class="icons-container flex justify-center space-x-8 mb-6">
      <!-- Mail Icon -->
      <a href="mailto:youremail@example.com" class="text-[#FAFAFA] hover:text-gray-200 transition-colors duration-300 block">
        <i class="ph ph-envelope text-3xl sm:text-4xl"></i>
      </a>

      <!-- Facebook Icon -->
      <a href="https://facebook.com" class="text-[#FAFAFA] hover:text-gray-200 transition-colors duration-300 block">
        <i class="ph ph-facebook-logo text-3xl sm:text-4xl"></i>
      </a>
    </div>

  
   <p class="text-[#FAFAFA] text-sm sm:text-lg md:text-xl lg:text-xl font-light leading-relaxed mb-6">
      &copy; 2024 Petrine. All rights reserved.
    </p>
  </div>
</footer>
  `;

  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;

    const backToTopButton = footerContainer.querySelector(".back-to-top");
    if (backToTopButton) {
      backToTopButton.addEventListener("click", scrollToTop);
    }
  }
}
