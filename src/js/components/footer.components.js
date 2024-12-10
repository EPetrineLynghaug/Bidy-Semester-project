export function renderFooter() {
  const footerHTML = `
      <footer style="position: relative; background-color: #0D47A1; color: white; text-align: center; padding: 50px 20px 20px; margin-top: 50px;">
        <!-- Back to Top Arrow -->
        <div 
          style="position: absolute; top: -40px; left: 50%; transform: translateX(-50%);
                 width: 120px; height: 60px; background: #0D47A1; 
                 border-radius: 60px 60px 0 0; box-shadow: 0px -4px 6px rgba(0, 0, 0, 0.2); 
                 display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1;" 
          onclick="scrollToTop()">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" 
               style="width: 36px; height: 36px;">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </div>
  
        <!-- Footer Content -->
        <div style="margin-top: 60px;">
          <p style="font-size: 14px;">&copy; 2024 Your Name. All rights reserved.</p>
          <a href="mailto:youremail@example.com" 
             style="color: white; text-decoration: none; font-size: 14px; display: block; margin-top: 5px;" 
             onmouseover="this.style.textDecoration='underline';" 
             onmouseout="this.style.textDecoration='none';">
            youremail@example.com
          </a>
        </div>
      </footer>
    `;

  // Finn footer-container og sett inn innholdet
  const footerContainer = document.getElementById("footer-container");
  if (footerContainer) {
    footerContainer.innerHTML = footerHTML;
  }
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
