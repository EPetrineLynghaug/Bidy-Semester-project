export function openModal(contentHtml) {
  const modal = document.getElementById("auction-detail-modal");
  const modalContent = document.getElementById("modal-content");

  modalContent.innerHTML = contentHtml;
  modal.classList.remove("hidden");
}

export function closeModal() {
  const modal = document.getElementById("auction-detail-modal");
  modal.classList.add("hidden");
}

document.getElementById("close-modal").addEventListener("click", closeModal);
