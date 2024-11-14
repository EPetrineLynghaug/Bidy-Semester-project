// src/js/index.js

import { TOKEN_STORAGE_KEY } from "./api/apiConfig.js";

document.addEventListener("DOMContentLoaded", () => {
  const authLinks = document.getElementById("auth-links");

  const token = localStorage.getItem(TOKEN_STORAGE_KEY);

  if (token) {
    authLinks.innerHTML = `<button id="logout">Logout</button>`;
    document.getElementById("logout").addEventListener("click", () => {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      alert("Du er nå logget ut");
      window.location.reload();
    });
  } else {
    authLinks.innerHTML = `
      <a href="auth/login.html">Login</a>
      <a href="auth/register.html">Register</a>
    `;
  }
});
