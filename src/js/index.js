import { TOKEN_STORAGE_KEY } from "./apiConfig.js";
import { displayAuctions } from "./api/auctionListings.js";

document.addEventListener("DOMContentLoaded", () => {
  const authLinks = document.getElementById("auth-links");
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  function updateAuthLinks() {
    if (token) {
      // Hvis brukeren er logget inn, vis en logg ut-knapp
      authLinks.innerHTML = `<button id="logout">Logout</button>`;
      const logoutButton = document.getElementById("logout");
      logoutButton.addEventListener("click", () => {
        localStorage.removeItem(TOKEN_STORAGE_KEY);
        alert("Du er nå logget ut");
        updateAuthLinks(); // Oppdater visningen
      });
      console.log("Displayed logout button");
    } else {
      // Hvis brukeren ikke er logget inn, vis login og register lenker
      authLinks.innerHTML = `
        <a href="auth/login.html">Login</a>
        <a href="auth/register.html">Register</a>
      `;
      console.log("Displayed login/register links");
    }
  }

  updateAuthLinks(); 
  displayAuctions(); 
});

console.log("index.js lastet og kjører");
