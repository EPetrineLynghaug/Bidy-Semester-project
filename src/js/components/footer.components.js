export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export function renderFooter() {
  const footerHTML = `
<footer class="footer">
  <!-- Back to Top Arrow -->
  <div class="back-to-top" role="button" aria-label="Scroll to top">
    <i class="ph ph-caret-up"></i>
  </div>

  <!-- Footer Image -->
  <div class="footer-image">
    <img src="/src/media/processed_mobile-removebg-preview.png" alt="Footer Image">
  </div>

  <!-- Footer Content -->
  <div class="footer-content">
    <!-- Icons Row -->
    <div class="icons-container">
      <!-- Mail Icon -->
      <a href="mailto:youremail@example.com">
        <i class="ph ph-envelope"></i>
      </a>

      <!-- Facebook Icon -->
      <a href="https://facebook.com">
        <i class="ph ph-facebook-logo"></i>
      </a>
    </div>

    <p>&copy; 2024 Petrine. All rights reserved.</p>
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

    // Last inn Phosphor Icons dynamisk hvis ikke allerede inkludert
    if (
      !document.querySelector('script[src="https://unpkg.com/phosphor-icons"]')
    ) {
      const script = document.createElement("script");
      script.src = "https://unpkg.com/phosphor-icons";
      script.defer = true;
      document.body.appendChild(script);
    }
  }
}

renderFooter();
