// navbar.js

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

  // Reset container and style
  authLinks.innerHTML = "";
  authLinks.className =
    "w-full flex items-center justify-between px-4 max-w-7xl mx-auto py-2 bg-gray-900 text-white relative";

  // --- Logo ---
  const logoWrapper = document.createElement("div");
  logoWrapper.className = "flex items-center flex-shrink-0";
  const logo = document.createElement("img");
  logo.src = "/src/media/processed_mobile-removebg-preview.png";
  logo.alt = "Logo";
  logo.className = "h-14 w-auto";
  logoWrapper.appendChild(logo);
  authLinks.appendChild(logoWrapper);

  // --- Search ---
  const searchCenter = document.createElement("div");
  searchCenter.className = "flex-1 flex justify-start ml-4";
  searchCenter.innerHTML = `
    <form id="search-form" class="relative flex items-center" autocomplete="off">
      <button type="button" id="search-pop-btn" aria-label="Open search"
        class="rounded-full p-2 bg-blue-600 hover:bg-blue-700 shadow focus:outline-none focus:ring-2 focus:ring-blue-300 transition z-10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <circle cx="11" cy="11" r="7" stroke-width="2" />
          <line x1="18" y1="18" x2="15.5" y2="15.5" stroke-width="2" stroke-linecap="round" />
        </svg>
      </button>
      <input 
        type="text" 
        id="search-input" 
        placeholder="Search auctions…" 
        maxlength="50"
        class="search-popout-input w-0 opacity-0 ml-4 py-2 px-4 rounded-full bg-white text-gray-800 shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
        style="transition-property: width, opacity, padding; min-width:0;"
        autocomplete="off" 
      />
    </form>
  `;
  authLinks.appendChild(searchCenter);

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
  const meny = [...commonMenu, ...authMenu];

  // --- Desktop menu ---
  const desktopNav = document.createElement("nav");
  desktopNav.className = "hidden md:flex items-center space-x-4";
  meny.forEach((item) => {
    const el = item.action
      ? document.createElement("button")
      : document.createElement("a");
    if (item.url) {
      el.href = item.url;
    }
    el.innerText = item.name;
    el.className =
      "text-white hover:bg-gray-700 px-3 py-2 rounded-lg transition font-medium focus:outline-none";
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
    "md:hidden p-2 focus:outline-none focus:ring-2 focus:ring-blue-300";
  mobileBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  `;
  menuWrapper.appendChild(mobileBtn);
  authLinks.appendChild(menuWrapper);

  // --- Mobile menu panel ---
  const mobileMenu = document.createElement("div");
  mobileMenu.id = "mobile-menu";
  mobileMenu.className =
    "hidden absolute top-full left-0 w-full bg-gray-900 text-white";
  meny.forEach((item) => {
    const el = item.action
      ? document.createElement("button")
      : document.createElement("a");
    if (item.url) el.href = item.url;
    el.innerText = item.name;
    el.className =
      "block w-full text-left px-4 py-2 hover:bg-gray-700 transition font-medium focus:outline-none";
    if (item.action)
      el.addEventListener("click", () => {
        item.action();
        mobileMenu.classList.add("hidden");
      });
    mobileMenu.appendChild(el);
  });
  authLinks.appendChild(mobileMenu);

  // --- CSS for popout ---
  if (!document.getElementById("search-popout-css")) {
    const style = document.createElement("style");
    style.id = "search-popout-css";
    style.innerHTML = `
      .search-popout-input.active {
        width: 16rem !important;
        opacity: 1 !important;
        padding-left: 1rem !important;
        padding-right: 2.5rem !important;
        background: white;
        box-shadow: 0 2px 16px rgba(50,100,255,0.1);
        border: 1.5px solid #3b82f6;
      }
      .search-popout-input { width: 0; opacity: 0; padding-left: 0; padding-right: 0; }
    `;
    document.head.appendChild(style);
  }

  // --- Search interactivity ---
  const searchForm = searchCenter.querySelector("#search-form");
  const searchBtn = searchCenter.querySelector("#search-pop-btn");
  const searchInput = searchCenter.querySelector("#search-input");
  let searchOpen = false;
  const openSearch = () => {
    if (!searchOpen) {
      searchInput.classList.add("active");
      searchInput.focus();
      searchOpen = true;
    }
  };
  const closeSearch = () => {
    if (searchOpen) {
      searchInput.classList.remove("active");
      searchInput.value = "";
      searchOpen = false;
    }
  };
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openSearch();
  });
  searchInput.addEventListener("blur", () => setTimeout(closeSearch, 150));
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeSearch();
  });
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = searchInput.value.trim();
    if (q) openSearchModal(q);
  });
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearch();
    }
  });

  // --- Mobile toggle event ---
  mobileBtn.addEventListener("click", () =>
    mobileMenu.classList.toggle("hidden")
  );
}

// Init
window.addEventListener("DOMContentLoaded", renderAuthLinks);

function handleLogout() {
  removeToken();
  removeUsername();
  alert("You are now logged out");
  renderAuthLinks();
  window.location.href = "/";
}
