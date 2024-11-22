export function createInput(num) {
  const wrapper = document.createElement("div");
  wrapper.className = "flex flex-col gap-2 w-full";

  // Create the label
  const label = document.createElement("label");
  label.setAttribute("for", `mediaUrl${num}`);
  label.className = "mb-1 text-gray-700 text-sm font-medium";
  label.textContent = `Image URL ${num}`;

  // Create the input field
  const input = document.createElement("input");
  input.type = "text";
  input.id = `mediaUrl${num}`;
  input.name = `mediaUrl${num}`;
  input.placeholder = "Enter image URL";
  input.maxLength = 255;
  input.className =
    "border border-gray-300 rounded-md p-2 bg-gray-100 text-gray-800 placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 focus:outline-none w-full";

  // Append the label and input to the wrapper
  wrapper.appendChild(label);
  wrapper.appendChild(input);

  return wrapper;
}
