export function createInput(num) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-2 w-full";
  wrapper.id = `url-input-container${num}`;

  // Create the label for Image URL
  const label = document.createElement("label");
  label.setAttribute("for", `mediaUrl${num}`);
  label.className = "mb-1 text-gray-700 text-sm font-medium";
  label.textContent = `Image URL ${num}`;

  // Create the input field for Image URL
  const input = document.createElement("input");
  input.type = "text";
  input.id = `mediaUrl${num}`;
  input.name = `mediaUrl${num}`;
  input.placeholder = "Enter image URL";
  input.maxLength = 255;
  input.className =
    "border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full";

  // Create the input field for ALT Text
  const altInput = document.createElement("input");
  altInput.type = "text";
  altInput.id = `mediaAlt${num}`;
  altInput.name = `mediaAlt${num}`;
  altInput.placeholder = "Enter ALT text for the image";
  altInput.maxLength = 255;
  altInput.className =
    "border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full";

  // remove button
  const btnRemove = document.createElement("button");
  btnRemove.type = "button";
  btnRemove.textContent = "Remove";
  btnRemove.setAttribute("data-id", num);
  btnRemove.className =
    "media-url-remove-btn text-red-500 hover:text-red-700 text-sm px-2 py-1 rounded-md focus:outline-none";

  // Append all elements to the wrapper
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  wrapper.appendChild(altInput);
  wrapper.appendChild(btnRemove);

  return wrapper;
}
