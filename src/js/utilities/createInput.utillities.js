export function createInput(num) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-2 w-full";

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

  // Create the label for ALT Text
  const altLabel = document.createElement("label");
  altLabel.setAttribute("for", `mediaAlt${num}`);
  altLabel.className = "mb-1 text-gray-700 text-sm font-medium";
  altLabel.textContent = `ALT Text ${num}`;

  // Create the input field for ALT Text
  const altInput = document.createElement("input");
  altInput.type = "text";
  altInput.id = `mediaAlt${num}`;
  altInput.name = `mediaAlt${num}`;
  altInput.placeholder = "Enter ALT text for the image";
  altInput.maxLength = 255;
  altInput.className =
    "border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full";

  // Append all elements to the wrapper
  wrapper.appendChild(label);
  wrapper.appendChild(input);
  wrapper.appendChild(altLabel);
  wrapper.appendChild(altInput);

  return wrapper;
}
