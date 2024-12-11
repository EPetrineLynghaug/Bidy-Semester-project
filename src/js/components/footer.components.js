export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function renderFooter() {
  const footerHTML = `
<footer class="footer bg-gray-800 text-white py-8 font-sans">
<!-- Back to Top Arrow -->
<div class="back-to-top" role="button" aria-label="Scroll to top">
  <i class="ph ph-caret-up text-white text-5xl sm:text-6xl mx-auto mb-4 transform transition-transform duration-200 ease-in-out hover:scale-110"></i>
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
