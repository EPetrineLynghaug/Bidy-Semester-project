import { getToken, removeToken } from "../utilities/storage.js";
import { createNewAuction } from "./newauction-modal.component.js";

export function renderAuthLinks() {
  const authLinks = document.getElementById("auth-links");
  const token = getToken();

  const meny = token
    ? [
        { name: "Home", url: "/" },
        { name: "New Auction", action: createNewAuction },
        { name: "Profile", url: "/profile/" },
        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Login", url: "/auth/login" },
        { name: "Register", url: "/auth/register" },
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
      button.addEventListener("click", (e) => {
        item.action();
      });
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
}

function handleLogout() {
  removeToken();
  alert("You are now logged out");
  renderAuthLinks();
}
