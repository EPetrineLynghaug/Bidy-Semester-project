import { createHeaders } from "../utilities/header.utillities.js";
import { API_AUTH, TOKEN_STORAGE_KEY } from "./constants.js";

export async function login(email, password) {
  try {
    const reqBody = { email, password };

    const response = await fetch(`${API_AUTH}/login`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      const result = await response.json();
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (result.errors && Array.isArray(result.errors)) {
        const errorMessages = result.errors.map((error) => error.message);
        errorMessage = errorMessages.join(", ");
      }
      throw new Error(errorMessage);
    }
    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Login failed in API:", error.message);
    throw error;
  }
}

export async function register(name, email, password) {
  try {
    const reqBody = { name, email, password };

    const response = await fetch(`${API_AUTH}/register`, {
      method: "POST",
      headers: createHeaders(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      const result = await response.json();
      let errorMessage = "An unexpected error occurred. Please try again.";

      if (result.errors && Array.isArray(result.errors)) {
        const errorMessages = result.errors.map((error) => error.message);
        errorMessage = errorMessages.join(", ");
      }
      throw new Error(errorMessage);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error("Registration failed in API:", error.message);
    throw error;
  }
}
