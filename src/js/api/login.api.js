import { createHeaders } from "../utilities/header.utillities.js";
import { API_AUTH, TOKEN_STORAGE_KEY } from "./constants.js";

export async function login(email, password) {
  console.log("Login function called with email:", email);

  try {
    const reqBody = { email, password };
    console.log("Sending request to API:", API_AUTH);

    const response = await fetch(`${API_AUTH}/login`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Parsed result:", result);

    return result.data;
  } catch (error) {
    console.error("Innlogging feilet:", error.message);
    alert("Innlogging feilet. Vennligst prøv igjen.");
  }
}

export async function register(name, email, password) {
  try {
    const reqBody = { name, email, password };
    console.log("registrert send to api ", reqBody);

    const response = await fetch(`${API_AUTH}/register`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      throw new Error(`Response Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Parsed result:", result);

    return result.data;
  } catch (error) {
    console.error("Registrering feilet:", error.message);
    alert("Registrering feilet. Vennligst prøv igjen.");
  }
}
