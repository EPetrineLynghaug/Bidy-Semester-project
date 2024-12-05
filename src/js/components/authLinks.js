import {
  getStoredUserName,
  getToken,
  removeToken,
  removeUsername,
} from "../utilities/storage.js";
import { createNewAuction } from "./newauction-modal.component.js";

export function renderAuthLinks() {
  const authLinks = document.getElementById("auth-links");
  authLinks.className = "relative";

  let username = "";
  const token = getToken();
  if (token) {
    username = getStoredUserName();
  }

  const meny = token
    ? [
        { name: "Home", url: "/" },
        { name: "New Auction", action: createNewAuction },
        { name: "Profile", url: `/profile?name=${username}` },
        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Login", url: "/auth/login" },
        { name: "Register", url: "/auth/register" },
      ];

  // Clear existing content
  authLinks.innerHTML = "";

  // Hamburger Button
  const toggleButton = document.createElement("button");
  toggleButton.className =
    "md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300";
  toggleButton.innerHTML = `
    <svg class="fill-current h-5 w-5" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>Menu</title>
      <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
    </svg>
  `;
  authLinks.appendChild(toggleButton);

  // Menu Container
  const menuContainer = document.createElement("div");
  menuContainer.className =
    "hidden md:flex flex-col md:flex-row md:items-center absolute md:static top-full left-0 w-full bg-[#0D47A1] z-50 rounded-lg md:rounded-none";

  toggleButton.addEventListener("click", () => {
    menuContainer.classList.toggle("hidden");
  });

  // Create menu items
  meny.forEach((item, index) => {
    if (item.action) {
      const button = document.createElement("button");
      button.innerText = item.name;
      button.classList.add(
        "block",
        "md:inline-block",
        "text-white", // Text color set to white
        "hover:text-gray-300", // Subtle hover effect
        "px-4",
        "py-2",
        "rounded-lg",
        "md:ml-4",
        "bg-transparent", // Transparent background
        "border-0", // No border
        "focus:outline-none",
        "transition-all", // Smooth transition for hover
        "duration-200"
      );
      button.addEventListener("click", () => {
        item.action();
        menuContainer.classList.add("hidden");
      });
      menuContainer.appendChild(button);
    } else {
      const atag = document.createElement("a");
      atag.href = item.url;
      atag.innerText = item.name;
      atag.classList.add(
        "block",
        "md:inline-block",
        "text-white", // Text color set to white
        "hover:text-gray-300", // Subtle hover effect
        "px-4",
        "py-2",
        "rounded-lg",
        "md:ml-4",
        "transition-all", // Smooth transition for hover
        "duration-200",
        "focus:outline-none"
      );
      menuContainer.appendChild(atag);
    }

    // Add divider between menu items (if it's not the last item)
    if (index < meny.length - 1) {
      const divider = document.createElement("div");
      divider.className = "border-b border-gray-300 my-2 md:hidden"; // Divider for mobile
      menuContainer.appendChild(divider);
    }
  });

  authLinks.appendChild(menuContainer);
}

function handleLogout() {
  removeToken();
  removeUsername();
  alert("You are now logged out");
  renderAuthLinks();
}
