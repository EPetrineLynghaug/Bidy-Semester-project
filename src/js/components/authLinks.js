import {
  getStoredUserName,
  getToken,
  removeToken,
  removeUsername,
} from "../utilities/storage.js";
import { createNewAuction } from "./newauction-modal.component.js";

// export function renderAuthLinks() {
//   const authLinks = document.getElementById("auth-links");
//   const token = getToken();

//   const meny = token
//     ? [
//         { name: "Home", url: "/" },
//         { name: "New Auction", action: createNewAuction },
//         { name: "Profile", url: "/profile/" },
//         { name: "Logout", action: handleLogout },
//       ]
//     : [
//         { name: "Login", url: "/auth/login" },
//         { name: "Register", url: "/auth/register" },
//       ];

//   authLinks.innerHTML = "";

//   meny.forEach((item) => {
//     if (item.action) {
//       const button = document.createElement("button");
//       button.innerText = item.name;
//       button.classList.add(
//         "bg-red-500",
//         "text-white",
//         "px-4",
//         "py-2",
//         "rounded",
//         "hover:bg-red-700",
//         "ml-4"
//       );
//       button.addEventListener("click", (e) => {
//         item.action();
//       });
//       authLinks.appendChild(button);
//     } else {
//       const atag = document.createElement("a");
//       atag.href = item.url;
//       atag.innerText = item.name;
//       atag.classList.add(
//         "text-white",
//         "hover:text-gray-300",
//         "px-4",
//         "py-2",
//         "rounded"
//       );
//       authLinks.appendChild(atag);
//     }
//   });
// }

// function handleLogout() {
//   removeToken();
//   alert("You are now logged out");
//   renderAuthLinks();
// }
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
    <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <title>Menu</title>
      <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z" />
    </svg>
  `;
  authLinks.appendChild(toggleButton);

  // Menu Container
  const menuContainer = document.createElement("div");
  menuContainer.className =
    "hidden md:flex flex-col md:flex-row md:items-center absolute md:static top-full left-0 w-full bg-gray-800 md:bg-transparent z-50";

  toggleButton.addEventListener("click", () => {
    menuContainer.classList.toggle("hidden");
  });

  // Create menu items
  meny.forEach((item) => {
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
        "rounded",
        "md:ml-4",
        "bg-red-500",
        "hover:bg-red-700",
        "transition-all",
        "duration-200",
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
        "rounded",
        "md:ml-4",
        "transition-all",
        "duration-200",
      );
      menuContainer.appendChild(atag);
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
