import { renderAuthLinks } from "../components/authLinks.js";
import { login } from "../api/login.api.js";
import { setToken, storeUserName } from "../utilities/storage.js";
import { showCustomAlert } from "../components/showCustomAlert.components.js";
import { validateInput } from "../utilities/formValidation.utillities.js";

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
  const email = loginForm.querySelector("[name='email']").value.trim();
  const password = loginForm.querySelector("[name='password']").value.trim();

  const existingAlert = loginForm.querySelector(".custom-alert");
  if (existingAlert) existingAlert.remove();

  if (!validateInput(email, password, loginForm)) {
    return;
  }

  try {
    const user = await login(email, password);
    setToken(user.accessToken);
    storeUserName(user.name);

    renderAuthLinks();
    showCustomAlert("Login successful! Redirecting...", "success", loginForm);

    setTimeout(() => {
      window.location.href = "/";
    }, 1500);
  } catch (error) {
   

    let errorMessage = "An unexpected error occurred. Please try again.";
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    showCustomAlert(errorMessage, "error", loginForm);
  }
}
