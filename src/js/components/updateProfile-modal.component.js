import { upDateProfil } from "../api/profile.api.js";
export function updateProfileModal(profile) {
  console.log(profile);

  const modalContainer = document.createElement("section");
  modalContainer.className =
    "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50";

  modalContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-lg md:max-w-2xl lg:max-w-3xl p-6 relative">

      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <h1 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">Update Profile</h1>
        <button id="close-modal" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full border border-red-600 shadow-md hover:bg-red-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          title="Close Modal"
          aria-label="Close Modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
      </div>

  
      <!-- Form -->
      <form id="profile-update-form" class="space-y-6">
        <!-- Banner URL -->
        <div class="flex flex-col gap-1">
          <label for="banner-url" class="block text-sm font-medium text-gray-700">Banner URL</label>
          <input
            id="banner-url"
            type="text"
            maxlength="255"
            placeholder="Enter banner URL"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <!-- Avatar URL -->
        <div class="flex flex-col gap-1">
          <label for="avatar-url" class="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input
            id="avatar-url"
            type="text"
            maxlength="255"
            placeholder="Enter avatar URL"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <!-- Bio -->
        <div class="flex flex-col gap-1">
          <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
          <textarea
            id="bio"
            maxlength="200"
            placeholder="Enter bio"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          ></textarea>
        </div>
        <!-- Submit Button -->
        <button
          type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:from-blue-400 hover:to-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all"
        >
          Update Profile
        </button>
      </form>
    </div>
  
    `;

  document.body.appendChild(modalContainer);

  if (profile) {
    console.log("Profile object:", profile);
    modalContainer.querySelector("#banner-url").value =
      profile.banner?.url ?? "";
    modalContainer.querySelector("#avatar-url").value =
      profile.avatar?.url ?? "";
    modalContainer.querySelector("#bio").value = profile.bio ?? "";
  } else {
    console.error("Profile object is undefined or missing required fields.");
  }

  const closeModal = () => {
    modalContainer.remove();
  };
  modalContainer
    .querySelector("#close-modal")
    .addEventListener("click", closeModal);

  // Håndter skjema-innsending
  const form = modalContainer.querySelector("#profile-update-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const profileData = {
      bio: form.querySelector("#bio").value,
      avatar: {
        url: form.querySelector("#avatar-url").value,
        alt: "",
      },
      banner: {
        url: form.querySelector("#banner-url").value,
        alt: "",
      },
    };

    console.log("Form data:", profileData);

    try {
      await upDateProfil(profile.name, profileData);
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error updating profile:", error.message);
      alert("Failed to update profile. Please try again.");
    }
  });
}
