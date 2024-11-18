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