import { showCustomAlert } from "../components/showCustomAlert.components.js";

export function validateInput(email, password, formElement, name = null) {
  if (name !== null && !validateName(name)) {
    showCustomAlert(
      "Invalid name. Name must only contain valid characters.",
      "error",
      formElement
    );
    return false;
  }

  if (!validateEmail(email)) {
    showCustomAlert(
      "Invalid email format. Please use a valid Noroff student email.",
      "error",
      formElement
    );
    return false;
  }

  if (!validatePassword(password)) {
    showCustomAlert(
      "Invalid password. Password must be 8-20 characters long and contain only letters and numbers.",
      "error",
      formElement
    );
    return false;
  }

  return true;
}

export function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(stud\.noroff\.no|noroff\.no)$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  const passwordRegex = /^[a-zA-Z0-9]{8,20}$/;
  return passwordRegex.test(password);
}

export function validateName(name) {
  const nameRegex = /^[a-zA-Z0-9\W_]+$/;
  return name.length > 0 && nameRegex.test(name);
}
