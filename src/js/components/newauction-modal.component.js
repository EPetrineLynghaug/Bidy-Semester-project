import { createauction, editAuction } from "../api/profile.api.js";
import { createInput } from "../utilities/createInput.utillities.js";

import { myAuctions } from "./myAuctions.component.js";
import { showCustomAlert } from "./showCustomAlert.components.js";
export function createNewAuction(listing) {
  let mediaInput = 1;

  let title = "";
  let description = "";
  let tags = "";
  let endTime = "";

  if (listing) {
    const [date, time] = listing.endsAt.split("T");
    const [hour, minute] = time.split(":");
    endTime = `${date}T${hour}:${minute}`;

    title = listing.title;
    description = listing.description;
    tags = listing.tags;
  } else {
    const today = new Date().toISOString();
    const [date] = today.split("T");

    endTime = `${date}T23:59`;
  }

  const modalContainer = document.createElement("div");
  modalContainer.className =
    "modal-container fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center z-50";

  modalContainer.innerHTML = `
    <div class="bg-white rounded-md shadow-md p-6 sm:p-10 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative" role="dialog" aria-labelledby="modal-title" aria-describedby="modal-desc">
      <div class="flex justify-between items-center border-b pb-4 mb-4">
        <div>
          <h1 id="modal-title" class="text-xl md:text-2xl font-semibold text-gray-800">Create or Update Auction</h1>
          <p id="modal-desc" class="text-sm text-gray-600 mt-1">Fill out the required fields to create or update your auction. Fields marked with <span class="text-red-500">*</span> are mandatory.</p>
        </div>
        <button id="close-button" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full border border-red-600 shadow-md hover:bg-red-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
          title="Close Modal" aria-label="Close Modal">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    
      <!-- Form Section -->
      <form name="createPost" id="auction-form" class="space-y-6">
        <div class="flex flex-col">
          <label for="title" class="mb-2 text-gray-700 text-sm font-medium">Title <span class="text-red-500">*</span></label>
          <input value="${title}" id="title" type="text" name="title" required maxlength="20" placeholder="Enter a concise title for your auction (e.g., 'Vintage Watch')"
            class="border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            aria-describedby="title-error" aria-invalid="false" />
          <p id="title-error" class="text-red-500 text-xs mt-1 hidden">Please provide a title (maximum 20 characters).</p>
        </div>
    
        <div class="flex flex-col">
          <label for="body" class="mb-2 text-gray-700 text-sm font-medium">Description <span class="text-red-500">*</span></label>
          <textarea id="body" name="body" maxlength="200" placeholder="Provide details about your auction item (e.g., 'A gently used vintage watch from the 1970s.')"
            class="border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full h-40"
            aria-describedby="body-error body-char-count" aria-invalid="false">${description}</textarea>
          <div class="text-sm text-gray-600 mt-1">
            <span id="body-char-count"></span>
          </div>
          <p id="body-error" class="text-red-500 text-xs mt-1 hidden">Please provide a description (maximum 200 characters).</p>
        </div>
    
        <div class="flex flex-col">
          <label for="tags" class="mb-2 text-gray-700 text-sm font-medium">Tags</label>
          <input value="${tags}" id="tags" type="text" name="tags" maxlength="20" placeholder="Enter relevant tags separated by spaces (e.g., 'watch vintage classic')"
            class="border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            aria-describedby="tags-error" aria-invalid="false" />
          <p id="tags-error" class="text-red-500 text-xs mt-1 hidden">Tags must be separated by spaces and describe your auction.</p>
        </div>
    
        <div class="flex flex-col gap-6 w-full">
          <div class="flex flex-col">
            <label for="mediaUrl1" class="mb-2 text-gray-700 text-sm font-medium">Image URL 1 <span class="text-red-500">*</span></label>
            <input id="mediaUrl1" type="text" name="mediaUrl1" maxlength="255" placeholder="Provide a valid image URL (e.g., 'https://example.com/image.jpg')"
              class="border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
              aria-describedby="media-url-error-1" aria-invalid="false" />
            <p id="media-url-error-1" class="text-red-500 text-xs mt-1 hidden">Please provide a valid URL for the image.</p>
    
            <label for="mediaAlt1" class="mt-3 text-gray-700 text-sm font-medium">ALT Text</label>
            <input id="mediaAlt1" type="text" name="mediaAlt1" maxlength="255" placeholder="Provide ALT text describing the image (e.g., 'Front view of a vintage watch')"
              class="border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full" />
          </div>
    
          <div class="url-input-container flex flex-col gap-4"></div>
    
          <div class="flex justify-end">
            <button id="add-image-button" type="button"
              class="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">
              Add More Images
            </button>
          </div>
        </div>
    
        <div class="flex flex-col">
          <label for="meeting-time" class="mb-2 text-gray-700 text-sm font-medium">Auction Ending <span class="text-red-500">*</span></label>
          <input required value="${endTime}" type="datetime-local" id="meeting-time" name="meeting-time"
            ${listing ? "disabled" : ""}
            class="disabled:bg-gray-100 disabled:text-gray-500 border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
            aria-describedby="meeting-time-error" />
          <p id="meeting-time-error" class="text-red-500 text-xs mt-1 hidden">Please select a valid auction end date and time.</p>
        </div>
    
        <button type="submit"
          class="w-full bg-green-500 text-white font-semibold px-5 py-3 rounded-md shadow-md hover:bg-green-600 focus:ring-2 focus:ring-green-400 focus:outline-none">
          ${listing ? "Update Auction" : "Create Auction"}
        </button>
      </form>
    </div>`;
  document.body.append(modalContainer);

  const container = modalContainer.querySelector(".url-input-container");
  modalContainer
    .querySelector("#add-image-button")
    .addEventListener("click", () => {
      mediaInput++;
      const newInput = document.createElement("div");
      newInput.className = "flex flex-col gap-2";
      newInput.innerHTML = `
      <label for="mediaUrl${mediaInput}" class="text-gray-700 text-sm font-medium">Image URL ${mediaInput}</label>
      <input id="mediaUrl${mediaInput}" type="text" name="mediaUrl${mediaInput}" maxlength="255" placeholder="Provide a valid image URL (e.g., 'https://example.com/image.jpg')"
        class="border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full"
        aria-describedby="media-url-error-${mediaInput}" aria-invalid="false" />
      <p id="media-url-error-${mediaInput}" class="text-red-500 text-xs mt-1 hidden">Please provide a valid URL for the image.</p>
      <label for="mediaAlt${mediaInput}" class="text-gray-700 text-sm font-medium">ALT Text</label>
      <input id="mediaAlt${mediaInput}" type="text" name="mediaAlt${mediaInput}" maxlength="255" placeholder="Provide ALT text describing the image"
        class="border border-gray-300 rounded-md p-3 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none w-full" />
    `;
    });
  const meetingTimeInput = modalContainer.querySelector("#meeting-time");

  if (!listing) {
    const nowISOString = new Date().toISOString();
    meetingTimeInput.setAttribute("min", nowISOString.slice(0, 16));
  }
  document.body.append(modalContainer);

  // Tegn-teller funksjon
  function updateCharCount(input, counterId, maxLength) {
    const charCount = input.value.length;
    const counterElement = document.getElementById(counterId);
    counterElement.textContent = `${charCount}/${maxLength} characters`;
    counterElement.classList.toggle("text-red-500", charCount > maxLength);
  }

  modalContainer.querySelector("#body").addEventListener("input", (e) => {
    updateCharCount(e.target, "body-char-count", 200);
  });

  if (listing && listing.media.length > 0) {
    listing.media.forEach((media, index) => {
      if (index > 0) {
        mediaInput++;
        const newUrlInput = createInput(mediaInput, media);
        container.appendChild(newUrlInput);
      } else {
        const mediaUrl = modalContainer.querySelector("#mediaUrl1");
        const mediaAlt = modalContainer.querySelector("#mediaAlt1");

        if (media.url) mediaUrl.value = media.url;
        if (media.alt) mediaAlt.value = media.alt;
      }
    });
  }

  modalContainer
    .querySelector("#close-button")
    .addEventListener("click", () => modalContainer.remove());

  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) modalContainer.remove();
  });

  modalContainer
    .querySelector("#add-image-button")
    .addEventListener("click", () => {
      mediaInput++;
      const newInput = createInput(mediaInput);
      container.appendChild(newInput);
    });

  modalContainer
    .querySelector("#auction-form")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const mediaInput = Array.from(
        document.querySelectorAll('input[name^="mediaUrl"]')
      );
      const altInput = Array.from(
        document.querySelectorAll('input[name^="mediaAlt"]')
      );

      const media = mediaInput.map((urlInput, index) => ({
        url: urlInput.value,
        alt: altInput[index]?.value || "",
      }));

      // Form validation for media URLs
      for (const mediaItem of media) {
        const isValid = await isValidImageUrl(mediaItem.url);
        if (!isValid) {
          showCustomAlert(
            `Invalid URL: ${mediaItem.url}. Please check your image URLs.`,
            "error",
            modalContainer.querySelector("#auction-form")
          );
          return;
        }
      }

      const formData = {
        title: event.target.title.value.trim(),
        description: event.target.body.value.trim(),
        tags: event.target.tags.value.split(" ").filter(Boolean),
        media,
        endsAt: event.target["meeting-time"].value,
      };

      try {
        if (listing) {
          const result = await editAuction(listing.id, formData);
          showCustomAlert(
            "Auction updated successfully!",
            "success",
            modalContainer.querySelector("#auction-form")
          );

          setTimeout(() => {
            modalContainer.remove();
            window.location.reload(true);
          }, 2000);
        } else {
          const result = await createauction(formData);

          const myAuctionsContainer = document.querySelector(
            "#my-auctions-container"
          );
          const card = myAuctions(result, true);
          myAuctionsContainer.prepend(card);

          showCustomAlert(
            "Auction created successfully!",
            "success",
            modalContainer.querySelector("#auction-form")
          );
          setTimeout(() => {
            modalContainer.remove();
            window.location.reload(true);
          }, 2000);
        }
      } catch (error) {
        console.error("Error handling auction:", error.message);
        showCustomAlert(
          "Failed to process auction. Please try again.",
          "error",
          modalContainer.querySelector("#auction-form")
        );
      }
    });

  // Helper function to validate image URLs
  async function isValidImageUrl(url) {
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
}
