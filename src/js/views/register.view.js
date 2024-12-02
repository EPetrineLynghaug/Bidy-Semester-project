import { renderAuthLinks } from "../components/authLinks.js";
import { register } from "../api/login.api.js";
import { showCustomAlert } from "../components/showCustomAlert.components.js";
import { validateInput } from "../utilities/formValidation.utillities.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeRegisterPage();
});

function initializeRegisterPage() {
  renderAuthLinks();

  const registerForm = document.querySelector("form[name='register']");
  if (registerForm) {
    registerForm.addEventListener("submit", handleRegister);
  }
}

async function handleRegister(event) {
  event.preventDefault();

  const registerForm = event.target;
  const name = registerForm.querySelector("[name='name']").value.trim();
  const email = registerForm.querySelector("[name='email']").value.trim();
  const password = registerForm.querySelector("[name='password']").value.trim();

  const existingAlert = registerForm.querySelector(".custom-alert");
  if (existingAlert) existingAlert.remove();

  if (!validateInput(email, password, registerForm, name)) {
    return;
  }

  try {
    const newUser = await register(name, email, password);
    console.log("User registered:", newUser);

    showCustomAlert(
      "Registration successful! Redirecting to login...",
      "success",
      registerForm
    );

    setTimeout(() => {
      window.location.href = "/auth/login";
    }, 1500);
  } catch (error) {
    console.error("Registration failed:", error);

    const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred. Please try again.";
    showCustomAlert(errorMessage, "error", registerForm);
  }
}
