import {
  getStoredUserName,
  getToken,
  removeToken,
  removeUsername,
} from "../utilities/storage.js";
import { createNewAuction } from "./newauction-modal.component.js";

export function renderAuthLinks() {
  const authLinks = document.getElementById("auth-links");
  authLinks.className = "relative flex items-center justify-between px-4";
  let username = "";
  const token = getToken();
  if (token) {
    username = getStoredUserName();
  }

  const commonMenu = [{ name: "Home", url: "/" }];

  const authMenu = token
    ? [
        { name: "New Auction", action: createNewAuction },
        { name: "Profile", url: `/profile?name=${username}` },
        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Login", url: "/auth/login" },
        { name: "Register", url: "/auth/register" },
      ];

  const meny = [...commonMenu, ...authMenu]; // Kombiner felles og spesifikk meny

  authLinks.innerHTML = "";

  // Hamburger Button with Phosphor Icon
  const toggleButton = document.createElement("button");
  toggleButton.className =
    "md:hidden flex items-center px-2 py-1 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300";
  toggleButton.innerHTML = `<i class="ph ph-list text-xl"></i>`; // Phosphor Icon (litt mindre ikon)
  authLinks.appendChild(toggleButton);

  // Menu Container
  const menuContainer = document.createElement("div");
  menuContainer.className =
    "hidden md:flex flex-col md:flex-row md:items-center absolute md:static top-full left-0 w-[calc(100%-5px)] bg-gray-800 z-50 rounded-lg md:rounded-none"; // Gjør menyen 5 px smalere

  // Toggle visibility on click
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
        "text-white",
        "hover:text-gray-300",
        "px-4",
        "py-2",
        "rounded-lg",
        "md:ml-4",
        "bg-transparent",
        "border-0",
        "focus:outline-none",
        "transition-all",
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
        "text-white",
        "hover:text-gray-300",
        "px-4",
        "py-2",
        "rounded-lg",
        "md:ml-4",
        "transition-all",
        "duration-200",
        "focus:outline-none"
      );
      menuContainer.appendChild(atag);
    }

    // Add divider between menu items (if it's not the last item)
    if (index < meny.length - 1) {
      const divider = document.createElement("div");
      divider.className = "border-b border-gray-700 my-2 md:hidden";
      menuContainer.appendChild(divider);
    }
  });

  authLinks.appendChild(menuContainer);

  const logo = document.createElement("img");
  logo.src = "/src/media/processed_mobile-removebg-preview.png";
  logo.alt = "Logo";
  logo.className = "h-16 w-auto ml-auto mr-8";
  logo.style.flexShrink = "0";
  authLinks.appendChild(logo);
}

function handleLogout() {
  removeToken();
  removeUsername();
  alert("You are now logged out");
  renderAuthLinks();
  window.location.href = "/";
}
