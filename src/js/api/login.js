import {
  API_AUTH_LOGIN,
  TOKEN_STORAGE_KEY,
  createHeaders,
} from "../apiConfig.js";

async function login(email, password) {
  console.log("Login function called with email:", email);

  try {
    const reqBody = { email, password };
    console.log("Sending request to API:", API_AUTH_LOGIN);

    const response = await fetch(API_AUTH_LOGIN, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Parsed result:", result);

    if (result.data?.accessToken) {
      localStorage.setItem(TOKEN_STORAGE_KEY, result.data.accessToken);
      alert("Du er nå logget inn");
      window.location.href = "/index.html";
    } else {
      alert("Innlogging mislyktes: accessToken mangler i responsen");
    }
  } catch (error) {
    console.error("Innlogging feilet:", error.message);
    alert("Innlogging feilet. Vennligst prøv igjen.");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("form[name='login']");
  if (loginForm) {
    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const email = loginForm.querySelector("#email").value;
      const password = loginForm.querySelector("#password").value;
      await login(email, password);
    });
  }
});
