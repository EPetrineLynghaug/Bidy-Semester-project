import { TOKEN_STORAGE_KEY } from "../api/constants.js";
import { getToken, removeToken } from "../utilities/storage.js";

export function renderAuthLinks() {
  const authLinks = document.getElementById("auth-links");
  const token = getToken();

  const meny = token
    ? [
        { name: "Home", url: "/" },
        { name: "New Post", url: "/auction/create/" },
        { name: "Profile", url: "/profile/" },
        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Login", url: "../auth/login/index.html" },
        { name: "Register", url: "./auth/register/index.html" },
      ];

  authLinks.innerHTML = "";

  meny.forEach((item) => {
    if (item.action) {
      const button = document.createElement("button");
      button.innerText = item.name;
      button.classList.add(
        "bg-red-500",
        "text-white",
        "px-4",
        "py-2",
        "rounded",
        "hover:bg-red-700",
        "ml-4"
      );
      button.addEventListener("click", item.action);
      authLinks.appendChild(button);
    } else {
      const atag = document.createElement("a");
      atag.href = item.url;
      atag.innerText = item.name;
      atag.classList.add(
        "text-white",
        "hover:text-gray-300",
        "px-4",
        "py-2",
        "rounded"
      );
      authLinks.appendChild(atag);
    }
  });

  console.log(
    token ? "Displayed user menu with logout" : "Displayed login/register links"
  );
}

function handleLogout() {
  removeToken();
  alert("You are now logged out");
  renderAuthLinks();
}
