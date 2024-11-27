const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__error_visible");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.classList.remove("popup__error_visible");
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
  } else {
    inputElement.setCustomValidity("");
  }

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

export const enableValidation = () => {

  const popupForm = document.querySelectorAll(".popup__form");

  const formList = Array.from(popupForm);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    const formSet = formElement.querySelectorAll(".form__set");

    const fieldsetList = Array.from(formSet);
    fieldsetList.forEach((fieldset) => {
      setEventListeners(fieldset);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    // buttonElement.disabled = true;
    buttonElement.classList.add("popup__button_disabled");
  } else {
    // buttonElement.disabled = false;
    buttonElement.classList.remove("popup__button_disabled");
  }
};

const setEventListeners = (formElement) => {

  const popupInput = formElement.querySelectorAll(".popup__input");

  const inputList = Array.from(popupInput);
  const buttonElement = formElement.querySelector(".popup__button");

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement);
    });
  });
};

export const clearValidation = (formElement, validationConfig) => {

  const inputSelector = formElement.querySelectorAll(validationConfig.inputSelector);

  const inputList = Array.from(inputSelector);
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement, validationConfig);
};