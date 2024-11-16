import {
  API_AUTH_LOGIN,
  TOKEN_STORAGE_KEY,
  createHeaders,
} from "../api/constants.js";

// Funksjon som viser tilpassede alerter
function showCustomAlert(message, type) {
  alert(`${type.toUpperCase()}: ${message}`);
}

// Funksjon for å validere e-post (for eksempel sjekke om den ser ut som en Noroff-student e-post)
function emailCheck(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(stud\.noroff\.no|noroff\.no)$/;
  return emailRegex.test(email);
}

// Funksjon for å validere passord (minimum 8 tegn, kun bokstaver og tall)
function pswCheck(password) {
  const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;
  return passwordRegex.test(password);
}

// Påloggingsfunksjon som håndterer eventet
export async function onLogin(event) {
  event.preventDefault(); // Hindrer standard form sending

  const form = event.target; // Hent form objektet
  const email = form ? form[0].value.trim() : "";
  const password = form ? form[1].value.trim() : "";

  // Valider e-post
  if (!emailCheck(email)) {
    showCustomAlert(
      "Invalid email format. Please use a valid Noroff student email, such as 'user@stud.noroff.no' or 'user@noroff.no'.",
      "error",
    );
    return;
  }

  // Valider passord
  if (!pswCheck(password)) {
    showCustomAlert(
      "Invalid password. Password must be 8-20 characters long and can only include letters and numbers.",
      "error",
    );
    return;
  }

  try {
    // Prøv å logge inn med den validerte e-posten og passordet
    const data = await login({ email, password });

    if (!data) {
      showCustomAlert(
        "Login failed. Please check your email and password and try again.",
        "error",
      );
      return;
    }

    // Lagre accessToken i localStorage, men unngå å lagre brukerdata som f.eks. e-post
    localStorage.setItem(TOKEN_STORAGE_KEY, data.accessToken);

    showCustomAlert(
      "Login successful! Redirecting to your dashboard...",
      "success",
    );

    // Omdirigere etter en kort pause
    setTimeout(() => {
      window.location.href = "/"; // Endre dette til URL-en du vil omdirigere til
    }, 1500);
  } catch (error) {
    // Håndter eventuelle feil under pålogging
    showCustomAlert(
      "An unexpected error occurred during login. Please try again later.",
      "error",
    );
    console.error("Login error:", error);
  }
}

// Funksjon som sender innloggingsdata til API-et (sender passordet og e-posten til serveren)
async function login({ email, password }) {
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

    // Return data object if successful (f.eks. token lagres i `localStorage`)
    return result.data;
  } catch (error) {
    console.error("Login failed:", error.message);
    throw error; // Rethrow error to be caught by onLogin function
  }
}
