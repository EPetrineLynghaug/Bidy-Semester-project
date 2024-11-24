import { upDateProfil } from "../api/profile.api.js";
export function updateProfileModal(profile) {
  console.log(profile);
  const modalContainer = document.createElement("section");
  modalContainer.className =
    "fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50";

  modalContainer.innerHTML = `
      <div class="bg-white rounded-md shadow-md p-10 px-16 max-h-screen overflow-y-auto relative">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Update Profile</h1>
          <button id="close-modal" class="w-8 h-8 absolute top-2 right-2 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
   </svg>
          </button>
        </div>
        <form id="profile-update-form" class="space-y-4">
          <div class="flex flex-col gap-4 w-full max-w-md mx-auto">
            <div class="flex flex-col gap-1 w-full">
              <label for="banner-url" class="mb-1 text-gray-700 text-sm font-medium">Banner URL</label>
              <input id="banner-url" type="text" maxlength="255" placeholder="Enter banner URL" class="border border-gray-300 rounded-md p-2 w-full">
            </div>
            <div class="flex flex-col gap-1 w-full">
              <label for="avatar-url" class="mb-1 text-gray-700 text-sm font-medium">Avatar URL</label>
              <input id="avatar-url" type="text" maxlength="255" placeholder="Enter avatar URL" class="border border-gray-300 rounded-md p-2 w-full">
            </div>
            <div class="flex flex-col gap-1 w-full">
              <label for="bio" class="mb-1 text-gray-700 text-sm font-medium">Bio</label>
              <textarea id="bio" maxlength="200" placeholder="Enter bio" class="border border-gray-300 rounded-md p-2 w-full"></textarea>
            </div>
            <button type="submit" class="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Update Profile</button>
          </div>
        </form>
      </div>
    `;

  document.body.appendChild(modalContainer);

  if (profile) {
    console.log("Profile object:", profile);

    modalContainer.querySelector("#banner-url").value =
      profile.banner?.url || "https://via.placeholder.com/800x300";
    modalContainer.querySelector("#avatar-url").value =
      profile.avatar?.url || "https://via.placeholder.com/100";
    modalContainer.querySelector("#bio").value =
      profile.bio || "No bio available.";
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
      bannerUrl: form.querySelector("#banner-url").value,
      avatarUrl: form.querySelector("#avatar-url").value,
      bio: form.querySelector("#bio").value,
    };

    //{
    //   "bio": "string",
    //   "avatar": {
    //     "url": "https://picsum.photos/id/135/800/800",
    //     "alt": ""
    //   },
    //   "banner": {
    //     "url": "https://picsum.photos/id/888/1500/500",
    //     "alt": ""
    //   }

    console.log("Form data:", profileData);
    //  await updateprofile ( må ha to parametre.)
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
