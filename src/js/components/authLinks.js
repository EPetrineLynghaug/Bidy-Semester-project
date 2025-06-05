import {
  getStoredUserName,
  getToken,
  removeToken,
  removeUsername,
} from "../utilities/storage.js";
import { createNewAuction } from "./newauction-modal.component.js";
import { openSearchModal } from "./search-modal.component.js";

export function renderAuthLinks() {
  const authLinks = document.getElementById("auth-links");
  if (!authLinks) return console.error("#auth-links not found");

  // Reset and style container
  authLinks.innerHTML = "";
  authLinks.className =
    "w-full flex items-center justify-between px-4 py-2 max-w-7xl mx-auto bg-gray-900 shadow-md relative";

  // --- Logo ---
  const logoWrapper = document.createElement("div");
  logoWrapper.className = "flex items-center flex-shrink-0";
  const logo = document.createElement("img");
  logo.src = "/src/media/processed_mobile-removebg-preview.png";
  logo.alt = "Auction site logo";
  logo.className = "h-14 w-auto";
  logoWrapper.appendChild(logo);
  authLinks.appendChild(logoWrapper);

  // --- Search ---
  const searchCenter = document.createElement("div");
  searchCenter.className = "flex-1 mx-4 md:mx-6";

  searchCenter.innerHTML = `
    <div class="relative w-full max-w-md">
      <label for="search-input" class="sr-only">Search auctions</label>
      <input
        type="text"
        id="search-input"
        aria-label="Search auctions"
        placeholder="Search auctions..."
        maxlength="50"
        class="block w-full pl-3 pr-10 py-2 border border-gray-700 bg-gray-900 text-white
               rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      />

    </div>
  `;
  authLinks.appendChild(searchCenter);

  // Bind search events
  const searchInput = document.getElementById("search-input");
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const q = searchInput.value.trim();
      if (q) openSearchModal(q);
    }
  });

  // --- Menu wrapper ---
  const menuWrapper = document.createElement("div");
  menuWrapper.className = "flex items-center space-x-4 flex-shrink-0";

  const token = getToken();
  const username = token ? getStoredUserName() : "";
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
  const menuItems = [...commonMenu, ...authMenu];

  // --- Desktop menu ---
  const desktopNav = document.createElement("nav");
  desktopNav.className = "hidden md:flex items-center space-x-2";
  menuItems.forEach((item) => {
    const el = item.action
      ? document.createElement("button")
      : document.createElement("a");
    if (item.url) el.href = item.url;
    el.innerText = item.name;
    el.className =
      "text-gray-200 hover:text-indigo-400 px-3 py-1 rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500";
    if (item.action) {
      el.addEventListener("click", () => item.action());
    }
    desktopNav.appendChild(el);
  });
  menuWrapper.appendChild(desktopNav);

  // --- Mobile toggle ---
  const mobileBtn = document.createElement("button");
  mobileBtn.id = "mobile-menu-btn";
  mobileBtn.className =
    "md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-indigo-300 rounded";
  mobileBtn.setAttribute("aria-controls", "mobile-menu");
  mobileBtn.setAttribute("aria-expanded", "false");
  mobileBtn.setAttribute("aria-label", "Open menu");

  mobileBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  `;
  menuWrapper.appendChild(mobileBtn);
  authLinks.appendChild(menuWrapper);

  // --- Mobile menu panel ---
  const mobileMenu = document.createElement("div");
  mobileMenu.id = "mobile-menu";
  mobileMenu.className =
    "hidden absolute top-full left-0 w-full bg-white shadow-md z-10";
  menuItems.forEach((item) => {
    const el = item.action
      ? document.createElement("button")
      : document.createElement("a");
    if (item.url) el.href = item.url;
    el.innerText = item.name;
    el.className =
      "block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500";
    if (item.action)
      el.addEventListener("click", () => {
        item.action();
        mobileMenu.classList.add("hidden");
        mobileBtn.setAttribute("aria-expanded", "false");
        mobileBtn.focus();
      });
    mobileMenu.appendChild(el);
  });
  authLinks.appendChild(mobileMenu);

  // Mobile toggle event
  mobileBtn.addEventListener("click", () => {
    const isHidden = mobileMenu.classList.toggle("hidden");
    mobileBtn.setAttribute("aria-expanded", String(!isHidden));
    if (!isHidden) {
      const firstMenuItem = mobileMenu.querySelector("a, button");
      if (firstMenuItem) firstMenuItem.focus();
    } else {
      mobileBtn.focus();
    }
  });
}

// Init
window.addEventListener("DOMContentLoaded", renderAuthLinks);

function handleLogout() {
  removeToken();
  removeUsername();
  alert("You have been logged out");
  renderAuthLinks();
  window.location.href = "/";
}
