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

/// vurdeer noe annent enn try catch her ksn heller sjekkes emd en if else.
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
    let errorMessage = "An unexpected error occurred. Please try again.";
    if (error.response && error.response.data) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    showCustomAlert(errorMessage, "error", registerForm);
  }
}
