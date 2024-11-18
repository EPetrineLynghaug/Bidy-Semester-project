import { renderAuthLinks } from "../components/authLinks.js";
import { login } from "../api/login.api.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeLoginPage();
});

function initializeLoginPage() {
  renderAuthLinks();

  const loginForm = document.querySelector("form[name='login']");
  if (loginForm) {
    loginForm.addEventListener("submit", handleLogin);
  }
}

async function handleLogin(event) {
  event.preventDefault();

  const loginForm = event.target;
  const formData = new FormData(loginForm);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const user = await login(email, password);
    console.log("User logged in:", user);

    localStorage.setItem("token", user.token);

    renderAuthLinks();
    window.location.href = "/index.html";
  } catch (error) {
    console.error("Login failed:", error.message);

    const errorContainer = document.getElementById("login-error");
    if (errorContainer) {
      errorContainer.textContent = "Login failed. Please try again.";
      errorContainer.classList.remove("hidden");
    }
  }
}
