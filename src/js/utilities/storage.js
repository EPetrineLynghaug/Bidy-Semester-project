export function setToken(token) {
  try {
    localStorage.setItem("token", token);
    return true;
  } catch (error) {
    console.error("Error setting token:", error);
    return false;
  }
}

export function getToken() {
  try {
    return localStorage.getItem("token");
  } catch (error) {
    console.error("Error retrieving token:", error);
    return null;
  }
}

export function removeToken() {
  try {
    localStorage.removeItem("token");
    return true;
  } catch (error) {
    console.error("Error removing token:", error);
    return false;
  }
}

export function storeUserName(username) {
  if (!username) {
    console.error("No username provided to store.");
    return;
  }
  localStorage.setItem("username", JSON.stringify(username));
}

export function getStoredUserName() {
  const storedUserName = localStorage.getItem("username");
  if (storedUserName) {
    return JSON.parse(storedUserName);
  }
  return null;
}
