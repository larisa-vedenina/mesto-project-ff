// не могу понять как реализовать комментарий о функции enableValidation, которая должна принимать параметром объект с селекторами классов

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

// function isValid(formElement, inputElement, inputErrorClass, errorClass) {
//   if (inputElement.validity.patternMismatch) {
//     inputElement.setCustomValidity(inputElement.dataset.errorMessage);
//   } else {
//     inputElement.setCustomValidity("");
//   }

//   if (!inputElement.validity.valid) {
//     showInputError(
//       formElement,
//       inputElement,
//       inputElement.validationMessage,
//       inputErrorClass,
//       errorClass
//     );
//   } else {
//     hideInputError(formElement, inputElement, inputErrorClass, errorClass);
//   }
// };

// export function enableValidation(validationConfig) {
//   const formList = Array.from(
//     document.querySelectorAll(validationConfig.formSelector)
//   );
//   formList.forEach((formElement) => {
//     setEventListeners(
//       formElement,
//       validationConfig.inputSelector,
//       validationConfig.inputErrorClass,
//       validationConfig.errorClass,
//       validationConfig.submitButtonSelector,
//       validationConfig.inactiveButtonClass
//     );
//   });
// };

// function setEventListeners(
//   formElement,
//   inputSelector,
//   submitButtonSelector,
//   inactiveButtonClass,
//   inputErrorClass,
//   errorClass,
// ) {
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//   inputList.forEach((inputElement) => {
//     inputElement.addEventListener("input", function () {
//       isValid(formElement, inputElement, inputErrorClass, errorClass);
//       toggleButtonState(inputList, buttonElement, inactiveButtonClass);
//     });
//   });
// }


// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// //функция, которая отвечает за блокировку кнопки 
// const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
//   if (hasInvalidInput(inputList)) {
//     // buttonElement.disabled = true;
//     buttonElement.classList.add(inactiveButtonClass);
//   } else {
//     // buttonElement.disabled = false;
//     buttonElement.classList.remove(inactiveButtonClass);
//   }
// };


// export const clearValidation = (formElement, validationConfig) => {

//   const inputSelector = formElement.querySelectorAll(validationConfig.inputSelector);

//   const inputList = Array.from(inputSelector);
//   const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
//   inputList.forEach((inputElement) => {
//     hideInputError(formElement, inputElement);
//   });
//   toggleButtonState(inputList, buttonElement, validationConfig);
// };



 

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
    buttonElement.classList.add("popup__button_disabled"); 
  } else {
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


