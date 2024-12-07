import { createauction, editAuction } from "../api/profile.api.js";
import { createInput } from "../utilities/createInput.utillities.js";
import { listingCardComponent } from "./listingCard.components.js";
import { myAuctions } from "./myAuctions.component.js";

export function createNewAuction(listing) {
  let mediaInput = 1;

  let title = "";
  let description = "";
  let tags = "";
  let endTime = "";

  const today = new Date().toISOString();
  const [date] = today.split("T");
  endTime = `${date}T23:59`;

  if (listing) {
    const [date, time] = listing.endsAt.split("T");
    endTime = `${date}T${time.slice(0, 5)}`;
    ({ title, description, tags } = listing);
  }

  const modalContainer = document.createElement("div");
  modalContainer.className =
    "modal-container fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center";

  modalContainer.innerHTML = `
<div class="bg-white rounded-md shadow-md p-5 sm:p-10 w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto relative">
  <div class="flex justify-between items-center border-b pb-4 mb-4">
    <h1 class="text-lg md:text-xl lg:text-2xl font-semibold text-gray-800">New Auction</h1>
    <button id="close-button" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center bg-red-500 text-white rounded-full border border-red-600 shadow-md hover:bg-red-600 hover:shadow-lg hover:scale-105 active:scale-95 transition-all duration-200 ease-in-out"
      title="Close Modal" aria-label="Close Modal">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Form Section -->
  <form name="createPost" id="auction-form" class="space-y-4">
    <div class="flex flex-col">
      <label for="title" class="mb-1 text-textSecondary text-sm font-medium">Title</label>
      <input value="${title}" id="title" type="text" name="title" required maxlength="20" placeholder="Enter title"
        class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full" />
    </div>

    <div class="flex flex-col">
      <label for="body" class="mb-1 text-textSecondary text-sm font-medium">Body</label>
      <textarea id="body" name="body" maxlength="200" placeholder="Enter post content"
        class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full h-40">${description}</textarea>
      <div class="text-sm text-gray-500 mt-1">
        <span id="body-char-count">0</span>/200 characters
      </div>
    </div>

    <div class="flex flex-col">
      <label for="tags" class="mb-1 text-textSecondary text-sm font-medium">Tags</label>
      <input value="${tags}" id="tags" type="text" name="tags" maxlength="20" placeholder="Enter tags (space-separated)"
        class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full" />
    </div>

    <div class="flex flex-col gap-4 w-full">
      <!-- Static Initial Input -->
      <div class="flex flex-col gap-1 w-full">
        <label for="mediaUrl1" class="mb-1 text-gray-700 text-sm font-medium">Image URL 1</label>
        <input id="mediaUrl1" type="text" name="mediaUrl1" maxlength="255" placeholder="Enter image URL"
          class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full" />
        <label for="mediaAlt1" class="mb-1 text-gray-700 text-sm font-medium"></label>
        <input id="mediaAlt1" type="text" name="mediaAlt1" maxlength="255" placeholder="Enter ALT text for the image"
          class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full" />
      </div>

      <!-- Dynamic Fields Container -->
      <div class="url-input-container flex flex-col gap-4"></div>

      <!-- Add Input Button -->
      <div class="flex justify-end">
        <button id="add-image-button" type="button"
          class="bg-[#1565C0] text-white px-4 py-2 rounded-md hover:bg-[#0D47A1] focus:outline-none">
          Add URL
        </button>
      </div>
    </div>

    <div class="flex flex-col">
      <label for="meeting-time">Auction Ending:</label>
      <input required value="${endTime}" type="datetime-local" id="meeting-time" name="meeting-time"
        ${listing ? "disabled" : ""}
        class="disabled:bg-gray-400 disabled:text-red-500 border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full" />
    </div>

    <button type="submit"
      class="w-full bg-[#28A745] text-white font-semibold px-5 py-2 rounded-md shadow-md hover:bg-[#388E3C] focus:outline-none">
      ${listing ? "Update Auction" : "Create Auction"}
    </button>
  </form>
</div>`;

  document.body.appendChild(modalContainer);

  const container = document.querySelector(".url-input-container");

  if (listing && listing.media.length > 0) {
    listing.media.map((media, index) => {
      if (index > 0) {
        mediaInput++;
        const newUrlInput = createInput(mediaInput, media);
        container.appendChild(newUrlInput);
      } else {
        const mediaUrl = document.querySelector("#mediaUrl1");
        const mediaAlt = document.querySelector("#mediaAlt1");

        if (media.url) {
          mediaUrl.value = media.url;
        }
        if (media.alt) {
          mediaAlt.value = media.alt;
        }
      }
    });
  }

  const closeButton = modalContainer.querySelector("#close-button");
  closeButton.addEventListener("click", () => {
    modalContainer.remove();
  });

  // Lukk modal ved å klikke utenfor innholdet
  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      modalContainer.classList.add("hidden");
    }
  });
  const bodyTextarea = modalContainer.querySelector("#body");
  const charCount = modalContainer.querySelector("#body-char-count");

  bodyTextarea.addEventListener("input", () => {
    const currentLength = bodyTextarea.value.length;
    charCount.textContent = currentLength;
  });

  //media url
  const btn = document.querySelector("#add-image-button");

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("clicked");
    mediaInput++;
    const newInputWithAlt = createInput(mediaInput);
    container.appendChild(newInputWithAlt);
  });

  document.addEventListener("click", (e) => {
    if (e.target.className.includes("media-url-remove-btn")) {
      e.preventDefault();
      const dataId = e.target.getAttribute("data-id");
      const selectedFormGroup = document.querySelector(
        `#url-input-container${dataId}`
      );
      selectedFormGroup.remove();

      mediaInput--;
    }
  });

  const form = modalContainer.querySelector("#auction-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const mediaInput = Array.from(
      document.querySelectorAll('input[name^="mediaUrl"]')
    );
    const altInput = Array.from(
      document.querySelectorAll('input[name^="mediaAlt"]')
    );

    const media = mediaInput.map((urlInput, index) => ({
      url: urlInput.value,
      alt: altInput[index].value || "",
    }));

    const formData = {
      title: form.title.value,
      description: form.body.value,
      tags: form.tags.value.split(" "),
      media: media,
      endsAt: form["meeting-time"].value,
    };
    if (listing) {
      try {
        const result = await editAuction(listing.id, formData);
        alert("Auction updated successfully!");
        console.log("Auction result:", result);

        // Oppdater det eksisterende kortet i DOM
        updateAuctionInDOM(result);
        modalContainer.remove();
      } catch (error) {
        console.error("Error updating auction:", error.message);
        alert("Failed to update auction. Please try again.");
      }
    } else {
      try {
        const result = await createauction(formData);
        console.log("Created auction:", result);

        const myAuctionsContainer = document.querySelector(
          "#my-auctions-container"
        );

        const card = myAuctions(result, true);
        myAuctionsContainer.prepend(card);
        modalContainer.remove();
        alert("Auction created successfully!");
      } catch (error) {
        console.error("Error creating auction:", error.message);
        alert("Failed to create auction. Please try again.");
      }
    }
  });
}
