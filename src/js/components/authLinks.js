import {
  getStoredUserName,
  getToken,
  removeToken,
  removeUsername,
} from "../utilities/storage.js";
import { createNewAuction } from "./newauction-modal.component.js";

export function renderAuthLinks() {
  const authLinks = document.getElementById("auth-links");

  // Sett alle nødvendige klasser uten å overskrive viktige eksisterende klasser
  authLinks.className =
    "relative flex items-center justify-between px-4 space-x-4 max-w-7xl mx-auto";

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

  const meny = [...commonMenu, ...authMenu]; // Kombiner felles og autentiseringsspesifikk meny

  authLinks.innerHTML = "";

  // Hamburger Button med inline SVG
  const toggleButton = document.createElement("button");
  toggleButton.className =
    "md:hidden flex items-center px-3 py-2 border rounded text-white border-white hover:text-gray-300 hover:border-gray-300";
  toggleButton.innerHTML = `
    <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  `;
  authLinks.appendChild(toggleButton);

  // Menu Container
  const menuContainer = document.createElement("div");
  menuContainer.className =
    "hidden md:flex flex-col md:flex-row md:items-center absolute md:static top-full left-0 w-full bg-gray-800 z-10 rounded-lg md:rounded-none";

  // Toggle visibility on click
  toggleButton.addEventListener("click", () => {
    menuContainer.classList.toggle("hidden");
  });

  // Opprett menyelementer
  meny.forEach((item, index) => {
    let menuItem;
    if (item.action) {
      menuItem = document.createElement("button");
      menuItem.innerText = item.name;
      menuItem.classList.add(
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
      menuItem.addEventListener("click", () => {
        item.action();
        menuContainer.classList.add("hidden");
      });
    } else {
      menuItem = document.createElement("a");
      menuItem.href = item.url;
      menuItem.innerText = item.name;
      menuItem.classList.add(
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
    }

    menuContainer.appendChild(menuItem);

    // Legg til en delingslinje mellom menyelementer på mobile
    if (index < meny.length - 1) {
      const divider = document.createElement("div");
      divider.className = "border-b border-gray-700 my-2 md:hidden";
      menuContainer.appendChild(divider);
    }
  });

  authLinks.appendChild(menuContainer);

  // Legg til logo til høyre
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
