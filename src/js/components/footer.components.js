export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function renderFooter() {
  const footerHTML = `
<footer class="footer">
  <!-- Back to Top Arrow -->
  <div class="back-to-top" role="button" aria-label="Scroll to top">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" class="arrow-icon">
      <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
    </svg>
  </div>

  <!-- Footer Content -->
  <div class="footer-content">
    <p>&copy; 2024 Your Name. All rights reserved.</p>
    <a href="mailto:youremail@example.com" class="email-link">
      youremail@example.com
    </a>
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
