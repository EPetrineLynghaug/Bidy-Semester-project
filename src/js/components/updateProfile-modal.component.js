import { upDateProfil } from "../api/profile.api.js";
import { showCustomAlert } from "../components/showCustomAlert.components.js";

export function updateProfileModal(profile) {
  const MAX_BIO_LENGTH = 160;

  const modalContainer = document.createElement("section");
  modalContainer.className =
    "fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50";

  modalContainer.innerHTML = `
    <div class="bg-white rounded-lg shadow-lg w-11/12 max-w-lg md:max-w-2xl lg:max-w-3xl p-6 relative" role="dialog" aria-labelledby="update-profile-title" aria-modal="true">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <h1 id="update-profile-title" class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">Update Profile</h1>
        <button id="close-modal" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full border border-red-600 shadow-md hover:bg-red-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          title="Close Modal" aria-label="Close Modal">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form id="profile-update-form" class="space-y-6" aria-labelledby="update-profile-title">
        <div id="form-error" class="text-red-500 text-center mb-4 hidden"></div>

        <!-- Banner URL -->
        <div class="flex flex-col gap-1">
          <label for="banner-url" class="block text-sm font-medium text-gray-700">Banner URL</label>
          <input id="banner-url" type="text" placeholder="Enter a valid banner URL (e.g., https://example.com/banner.jpg)"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" aria-label="Banner URL" aria-describedby="banner-error" />
          <p id="banner-error" class="text-red-500 text-sm hidden"></p>
        </div>

        <!-- Avatar URL -->
        <div class="flex flex-col gap-1">
          <label for="avatar-url" class="block text-sm font-medium text-gray-700">Avatar URL</label>
          <input id="avatar-url" type="text" placeholder="Enter a valid avatar URL (e.g., https://example.com/avatar.jpg)"
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" aria-label="Avatar URL" aria-describedby="avatar-error" />
          <p id="avatar-error" class="text-red-500 text-sm hidden"></p>
        </div>

        <!-- Bio -->
        <div class="flex flex-col gap-1">
          <label for="bio" class="block text-sm font-medium text-gray-700">Bio</label>
          <textarea id="bio" maxlength="${MAX_BIO_LENGTH}" placeholder="Tell us about yourself..."
            class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm" aria-label="Bio" aria-describedby="bio-error"></textarea>
          <p id="bio-error" class="text-red-500 text-sm hidden"></p>
          <p id="bio-char-count" class="text-gray-500 text-sm">Remaining characters: ${MAX_BIO_LENGTH}</p>
        </div>

        <button type="submit"
          class="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium py-2 px-4 rounded-md shadow-sm hover:from-blue-400 hover:to-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all" aria-label="Submit profile updates">
          Update Profile
        </button>
      </form>
    </div>
  `;

  document.body.appendChild(modalContainer);

  const closeModal = () => modalContainer.remove();
  modalContainer
    .querySelector("#close-modal")
    .addEventListener("click", closeModal);

  const form = modalContainer.querySelector("#profile-update-form");
  const bannerInput = form.querySelector("#banner-url");
  const avatarInput = form.querySelector("#avatar-url");
  const bioInput = form.querySelector("#bio");

  const bannerError = form.querySelector("#banner-error");
  const avatarError = form.querySelector("#avatar-error");
  const bioError = form.querySelector("#bio-error");
  const formError = form.querySelector("#form-error");
  const bioCharCount = form.querySelector("#bio-char-count");

  if (profile) {
    bannerInput.value = profile.banner?.url || "";
    avatarInput.value = profile.avatar?.url || "";
    bioInput.value = profile.bio || "";
    updateCharCount(bioInput, bioCharCount, MAX_BIO_LENGTH);
  }

  bioInput.addEventListener("input", () =>
    updateCharCount(bioInput, bioCharCount, MAX_BIO_LENGTH)
  );

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const profileData = {
      bio: bioInput.value.trim(),
      avatar: { url: avatarInput.value.trim(), alt: "" },
      banner: { url: bannerInput.value.trim(), alt: "" },
    };

    bannerError.textContent = "";
    avatarError.textContent = "";
    bioError.textContent = "";
    formError.textContent = "";
    bannerError.classList.add("hidden");
    avatarError.classList.add("hidden");
    bioError.classList.add("hidden");
    formError.classList.add("hidden");

    let hasError = false;

    // Validate Banner URL
    if (!(await isValidImageUrl(profileData.banner.url))) {
      bannerError.textContent =
        "Invalid banner URL. The image could not be loaded. Please try a different URL.";
      bannerError.classList.remove("hidden");
      bannerInput.setAttribute("aria-invalid", "true");
      hasError = true;
    } else {
      bannerInput.removeAttribute("aria-invalid");
    }

    // Validate Avatar URL
    if (!(await isValidImageUrl(profileData.avatar.url))) {
      avatarError.textContent =
        "Invalid avatar URL. The image could not be loaded. Please try a different URL.";
      avatarError.classList.remove("hidden");
      avatarInput.setAttribute("aria-invalid", "true");
      hasError = true;
    } else {
      avatarInput.removeAttribute("aria-invalid");
    }

    // Validate Bio Length
    if (profileData.bio.length > MAX_BIO_LENGTH) {
      bioError.textContent = `Bio exceeds the maximum limit of ${MAX_BIO_LENGTH} characters.`;
      bioError.classList.remove("hidden");
      bioInput.setAttribute("aria-invalid", "true");
      hasError = true;
    } else {
      bioInput.removeAttribute("aria-invalid");
    }

    if (hasError) return;

    const updateButton = form.querySelector("button[type='submit']");
    const originalText = updateButton.textContent;
    updateButton.disabled = true;
    updateButton.textContent = "Processing...";

    try {
      const result = await upDateProfil(profile.name, profileData);

      if (result.errors) {
        const apiErrors = result.errors
          .map((error) => error.message)
          .join(", ");
        formError.textContent = `Couldn't update profile: ${apiErrors}`;
        formError.classList.remove("hidden");
        return;
      }

      showCustomAlert("Profile updated successfully!", "success", form);

      setTimeout(() => {
        closeModal();
        window.location.reload();
      }, 2000);
    } catch (error) {
      formError.textContent = `An unexpected error occurred: ${error.message}`;
      formError.classList.remove("hidden");
    } finally {
      updateButton.disabled = false;
      updateButton.textContent = originalText;
    }
  });

  function updateCharCount(input, countElement, maxLength) {
    const charCount = input.value.length;
    countElement.textContent = `Remaining characters: ${maxLength - charCount}`;
    countElement.classList.toggle("text-red-500", charCount > maxLength);
  }
}

// Validate image URLs
export async function isValidImageUrl(url) {
  return new Promise((resolve) => {
    if (!url) {
      resolve(false);
      return;
    }
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}
