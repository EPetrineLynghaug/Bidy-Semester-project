import { createauction } from "../api/profile.api.js";
import { createInput } from "../utilities/createInput.utillities.js";

export function createNewAuction(listing) {
  let mediaInput = 2;

  let imageUrl = "";
  let imageAlt = "";
  let endTime = "";
  let title = "";
  let description = "";
  let tags = "";
  console.log("listing", listing);
  if (listing) {
    endTime = listing.endsAt;
    endTime = String(endTime);
    title = listing.title;
    description = listing.description;
    tags = listing.tags;
    if (listing.media && listing.media.length > 0) {
      if (listing.media[0].url) {
        imageUrl = listing.media[0].url;
      }
      if (listing.media[0].alt) {
        imageAlt = listing.media[0].alt;
      }
    }
  }
  //se om du klarer deg uten list media url og alt. heller kjøre en loop.
  // oppdatert de harkodete feltene som brukes til input av formet som lager nye poster.

  const modalContainer = document.createElement("section");

  modalContainer.className =
    "modal-container fixed top-0 left-0 w-screen h-screen bg-black/50 flex justify-center items-center";

  modalContainer.innerHTML = `
    <div class="bg-white rounded-md shadow-md p-10 px-16 max-h-screen overflow-y-auto relative">

 
 <button id="close-button" class="w-8 h-8 absolute top-2 right-2 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600 focus:outline-none">
   <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
   </svg>
 </button>

 <h1 class="font-semibold">New Auction</h1>
 <form name="createPost" id="auction-form" class="space-y-4">
   <div class="flex flex-col ">
     <label
       for="title"
       class="mb-1 text-textSecondary text-sm font-medium"
       >Title</label
     >
     <input
      value="${title}" 
       id="title"
       type="text"
       name="title"
       required
       maxlength="20"
       placeholder="Enter title"
       class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full"
     />
   </div>

   <!-- Body Field -->
   <div class="flex flex-col">
     <label
       for="body"
       class="mb-1 text-textSecondary text-sm font-medium"
       >Body</label
     >
     <textarea
       id="body"
       name="body"
       maxlength="200"
       placeholder="Enter post content"
       class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full"
     >${description}</textarea>
   </div>

   <!-- Tags Field -->
   <div class="flex flex-col">
     <label
       for="tags"
       class="mb-1 text-textSecondary text-sm font-medium"
       >Tags</label
     >
     <input
     value="${tags}"
       id="tags"
       type="text"
       name="tags"
       maxlength="20"
       placeholder="Enter tags (space-separated)"
       class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full"
     />
   </div>

<div class="flex flex-col gap-4 w-full max-w-md mx-auto">
  <!-- Static Initial Input -->
  <div class="flex flex-col gap-4 w-full">
    <label for="mediaUrl1" class="mb-1 text-gray-700 text-sm font-medium"> Image URL 1</label>
    <input
      value="${imageUrl}"
      id="mediaUrl1"
      type="text"
      name="mediaUrl1"
      maxlength="255"
      placeholder="Enter image URL"
      class="border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
    />
    <label for="mediaAlt1" class="mb-1 text-gray-700 text-sm font-medium"></label>
    <input
      value="${imageAlt}"
      id="mediaAlt1"
      type="text"
      name="mediaAlt1"
      maxlength="255"
      placeholder="Enter ALT text for the image"
      class="border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full"
    />
  </div>

    <!-- Dynamic Fields Container -->
    <div class="url-input-container flex flex-col gap-4"></div>

  <!-- Add Input Button -->
    <button
      id="add-image-button" type="button" class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none">Add URL
   </button>
</div>



 <!-- time and date-->
  <div class="flex flex-col">
  <label for="meeting-time"> Auction Ending:</label>

  <input required
    value="${endTime}"
    type="datetime-local"
    id="meeting-time"
    name="meeting-time"
    class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full" />
  </div>


   <!-- Submit Button -->
  <button type="submit" 
    class="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:from-teal-400 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:scale-95"> Create Post
  </button>
</div>`;

  document.body.append(modalContainer);

  const closeButton = modalContainer.querySelector("#close-button");
  closeButton.addEventListener("click", () => {
    modalContainer.classList.add("hidden");
  });

  // Lukk modal ved å klikke utenfor innholdet
  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      modalContainer.classList.add("hidden");
    }
  });

  //media url
  const btn = document.querySelector("#add-image-button");
  const container = document.querySelector(".url-input-container");

  btn.addEventListener("click", (event) => {
    event.preventDefault();
    console.log("clicked");

    // const newInputWithLabel = createInput(mediaInput);
    // mediaInput++;

    // container.appendChild(newInputWithLabel);
    const newInputWithAlt = createInput(mediaInput); // Create new input with ALT field
    mediaInput++;
    container.appendChild(newInputWithAlt);
  });

  const form = modalContainer.querySelector("#auction-form");
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const formData = {
      title: form.title.value,
      description: form.body.value,
      tags: form.tags.value.split(" "),
      media: [
        {
          url: form.media1.value,
          alt: form.alt.value,
        },
      ],
      endsAt: form["meeting-time"].value,
    };

    console.log("Form data:", formData);
    console.log("form", form);

    // try {
    //   const result = await createauction(formData);
    //   alert("Auction created successfully!");
    //   console.log("Auction result:", result);
    //   modalContainer.remove();
    // } catch (error) {
    //   console.error("Error creating auction:", error.message);
    //   alert("Failed to create auction. Please try again.");
    // }
  });
}
