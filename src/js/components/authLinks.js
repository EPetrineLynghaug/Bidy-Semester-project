// components/AuthLinks.js
import { TOKEN_STORAGE_KEY } from "../api/constants.js";

export function renderAuthLinks() {
  const authLinks = document.getElementById("auth-links");
  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    authLinks.innerHTML = `<button id="logout">Logout</button>`;
    const logoutButton = document.getElementById("logout");
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      alert("Du er nå logget ut");
      renderAuthLinks();
    });
    console.log("Displayed logout button");
  } else {
    authLinks.innerHTML = `
    <a href="./src/views/auth/login.html">Login</a>
    <a href="./src/views/auth/register.html">Register</a>
  `;
    console.log("Displayed login/register links");
  }
}
