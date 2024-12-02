export function showCustomAlert(message, type = "info", formElement) {
  let alertDiv = formElement.querySelector(".custom-alert");

  if (!alertDiv) {
    alertDiv = document.createElement("div");
    alertDiv.className = "custom-alert mt-4 text-sm font-medium";
    formElement.appendChild(alertDiv);
  }

  alertDiv.textContent = message;
  alertDiv.className = `mt-4 text-sm font-medium custom-alert ${
    type === "success"
      ? "text-green-500"
      : type === "error"
      ? "text-red-500"
      : "text-blue-500"
  }`;
}
