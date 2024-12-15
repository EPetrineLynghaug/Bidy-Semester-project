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
export function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg text-white text-sm transition-all duration-300 ${
    type === "success" ? "bg-green-500" : "bg-red-500"
  }`;
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
