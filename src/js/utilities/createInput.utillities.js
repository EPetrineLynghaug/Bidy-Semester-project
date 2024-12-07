export function createInput(num, media) {
  let url = "";
  let alt = "";
  if (media) {
    if (media.url) {
      url = media.url;
    }
    if (media.alt) {
      alt = media.alt;
    }
  }

  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-4 w-full";
  wrapper.id = `url-input-container${num}`;

  // Label for Image URL
  const urlLabel = document.createElement("label");
  urlLabel.setAttribute("for", `mediaUrl${num}`);
  urlLabel.className = "text-gray-700 text-sm font-medium";
  urlLabel.textContent = `Image URL ${num}`;

  // Input for Image URL
  const input = document.createElement("input");
  input.type = "text";
  input.id = `mediaUrl${num}`;
  input.value = url;
  input.name = `mediaUrl${num}`;
  input.placeholder = "Enter image URL";
  input.maxLength = 255;
  input.className =
    "border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full";

  // Input for ALT Text (without label)
  const altInput = document.createElement("input");
  altInput.type = "text";
  altInput.id = `mediaAlt${num}`;
  altInput.value = alt;
  altInput.name = `mediaAlt${num}`;
  altInput.placeholder = "Enter ALT text for the image";
  altInput.maxLength = 255;
  altInput.className =
    "border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full";

  // Remove button
  const btnRemove = document.createElement("button");
  btnRemove.type = "button";
  btnRemove.textContent = "Remove";
  btnRemove.setAttribute("data-id", num);
  btnRemove.className =
    "media-url-remove-btn text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded-md focus:outline-none";

  // Append elements to the wrapper
  wrapper.appendChild(urlLabel);
  wrapper.appendChild(input);
  wrapper.appendChild(altInput);
  wrapper.appendChild(btnRemove);

  return wrapper;
}
