import { createauction } from "../api/profile.api.js";

export function createNewAuction(listing) {
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
   <!-- Title Field -->
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

   <!-- Image URL Field -->
   <div class="flex flex-col gap-2 ">
     <label
       for="media"
       class="mb-1 text-textSecondary text-sm font-medium "
       >Image URL</label
     >
     <input
     value="${imageUrl}"
       id="media1"
       type="text"
       name="media1"
       maxlength="255"
       placeholder="Enter image URL"
       class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full "
     />
   </div>

   <!-- Image ALT Text Field -->
   <div class="flex flex-col">
     <label for="alt" class="mb-1 text-textSecondary text-sm font-medium"
       >Image ALT</label
     >
     <input
       value="${imageAlt}"
       id="alt"
       type="text"
       name="alt"
       maxlength="255"
       placeholder="Enter image description (ALT)"
       class="border border-gray-500 rounded-md p-2 bg-hoverGray text-textPrimary placeholder-gray-400 focus:border-linkColor focus:ring-2 focus:ring-linkColor focus:outline-none w-full"
     />
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
   <button
     type="submit"
     class="w-full bg-gradient-to-r from-teal-500 to-teal-600 text-white font-semibold px-5 py-2 rounded-md shadow-md hover:from-teal-400 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5 active:scale-95"
   >
     Create Post
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
