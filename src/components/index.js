import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation } from "./validation.js";
import { getInitialCards, getUserData, editProfileData, addNewCard, updateAvatarData } from './api.js';

// @todo: DOM узлы

export const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const listElements = content.querySelector(".places__list");

// попапы
const allPopup = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактировать профиль
const profileAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку
const popupTypeEdit = document.querySelector(".popup_type_edit"); // попап редактировать профиль
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // попап добавить карточку
const popupTypeImage = document.querySelector(".popup_type_image"); // попап картинки
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

// форма редактирования профиля 
const editProfileForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('[name="name-input"]');
const descriptionInput = document.querySelector('[name="description-input"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

//аватар попап
const avatarPopup = document.querySelector(".popup_type_update-avatar"); 
const avatarPopupForm = avatarPopup.querySelector('[name="update-avatar"]');
const linkAvatarInput = avatarPopup.querySelector('[name="link-avatar-input"]');
const profileImage = document.querySelector(".profile__image");

// лайк
const likeButton = document.querySelector('.card__like-button');
const likeCount = document.querySelector('.likes-count');
//не понимаю как реализовать лайк

// валидация форм

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

  

  // редактирование профиля
  
  function editProfile(evt) {
    evt.preventDefault();
    
    editProfileData().then(() => {
      
      const newName = nameInput.value;
      const newdescription = descriptionInput.value;
      
      profileTitle.textContent = newName;
      profileDescription.textContent = newdescription;
    })
    
    closeModal(popupTypeEdit);
    clearForm(editProfileForm);
  }
  
  editProfileForm.addEventListener("submit", editProfile);
  
  
  // const newAvatarData = {
    //   avatar: linkAvatarInput.value,
    // };
    
    // редактированиие аватара
    function editPrifileImage(evt) {
      evt.preventDefault();
      
      updateAvatarData().then((data) => {
        console.log(data);
        profileImage.setAttribute("style", `background-image: url("${data.value}")`);
      })
      
      closeModal(avatarPopup);
      clearForm(avatarPopupForm);
    }
    
    avatarPopupForm.addEventListener("submit", editPrifileImage);
    
    
    profileImage.addEventListener("click", function () {
      openModal(avatarPopup);
    });
    
    // вывести карточки на страницу
    
    
    Promise.all([getInitialCards(), getUserData()]).then(
      ([cards, userData]) => {
        console.log({cards, userData})
        initialCards.forEach((item) => {
          listElements.append(createCard(item));
        });
      }
    );
    
    // форма создания карточки
const addCardForm = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('[name="place-name-input"]');
const linkInput = document.querySelector('[name="link-input"]');

// const newCardData = {
//   name: nameInput.value,
//   about: linkInput.value,
// };

// форма создания карточки

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newPlaceName = placeNameInput.value;
  const newLink = linkInput.value;

  const newCardData = { name: newPlaceName, link: newLink };

  addNewCard(newCardData).then(() => {
    const newCardElemen = createCard(
      addCard,
      removeCard,
      likeCard,
      openImagePopup
    );
    listElements.prepend(newCardElemen);
  });
  
  closeModal(popupTypeNewCard);
  clearForm(addCardForm);
});

function clearForm(form) {
  form.reset();
}

// попап картинки

function openImagePopup(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target
    .closest(".card")
    .querySelector(".card__title").textContent;

  openModal(popupTypeImage);
}





// обработчики событий при открытии и закрытии попапов

profileEditButton.addEventListener("click", function () {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
});

profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);

  addCardForm.reset();
});




// закрытия попапа по крестику
allPopup.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
});

// закрытия попапа по оверлею
allPopup.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});


