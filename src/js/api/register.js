import { API_AUTH_REGISTER, createHeaders } from "../apiConfig.js";

async function register(name, email, password) {
  try {
    const reqBody = { name, email, password };

    const response = await fetch(API_AUTH_REGISTER, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Parsed result:", result);

    if (result.data) {
      alert("Registrering vellykket! Du kan nå logge inn.");
      window.location.href = "/auth/login.html";
    } else {
      alert("Registrering mislyktes.");
    }
  } catch (error) {
    console.error("Registrering feilet:", error.message);
    alert("Registrering feilet. Vennligst prøv igjen.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector("form[name='register']");
  if (registerForm) {
    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const name = registerForm.querySelector("#name").value;
      const email = registerForm.querySelector("#email").value;
      const password = registerForm.querySelector("#password").value;
      await register(name, email, password);
    });
  }
});
