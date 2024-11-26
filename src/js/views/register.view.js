import { renderAuthLinks } from "../components/authLinks.js";
import { register } from "../api/login.api.js";

document.addEventListener("DOMContentLoaded", () => {
  initializeRegisterPage();
});

function initializeRegisterPage() {
  renderAuthLinks();

  const registerForm = document.querySelector("form[name='register']");
  if (registerForm) {
    registerForm.addEventListener("submit", Handleregister);
  }
}

async function Handleregister(event) {
  event.preventDefault();
  console.log("Register form submitted", event);

  const registerForm = event.target;
  const formData = new FormData(registerForm);
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const newuser = await register(name, email, password);
    console.log("User registered:", newuser);

    alert(" Successfully registered! You can now log in.");
    window.location.href = "/auth/login";
  } catch (error) {
    console.error("Registrering feilet:", error.message);
    alert("Registrering feilet. Vennligst prøv igjen.");
  }
}
