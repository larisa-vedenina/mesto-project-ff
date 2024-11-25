// Привет! Прошу прощения, сдаю на первое ревью то, что есть, тк сейчас строгий дедлайн. Мне нужны 2-3 дня, чтобы доделать. Спасибо за понимание <3! 

// я затрудняюсь с созданием карточки( не могу понять как получить id и сравнить их для корректного удаления карточки 


import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserData,
  editProfileData,
  addNewCard,
  deleteCard,
  putLikeData,
  deleteLikeData,
  updateAvatarData,
} from "./api.js";

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

// форма создания карточки
const addCardForm = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('[name="place-name-input"]');
const linkInput = document.querySelector('[name="link-input"]');

//аватар попап
const avatarPopup = document.querySelector(".popup_type_update-avatar");
const avatarPopupForm = avatarPopup.querySelector('[name="update-avatar"]');
const linkAvatarInput = avatarPopup.querySelector(
  ".popup__input_type_url_avatar"
);
const profileImage = document.querySelector(".profile__image");

// лайк
const likeButton = document.querySelector(".card__like-button");
const likeCount = document.querySelector(".likes-count");

// валидация форм

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});

// вывести карточки на страницу

Promise.all([getInitialCards(), getUserData()]).then(
  ([cards, userData]) => {
    console.log({ cards, userData })
    initialCards.forEach((item) => {
      listElements.append(createCard(item));
    });
  }
);
// const promises = [getInitialCards(), getUserData()];

// Promise.all(promises).then((data) => {

//   console.log(data);

//   profileTitle.textContent = data[0].name;
//   profileDescription.textContent = data[0].about;
//   function initialCards() {
//     data[1].forEach(function (item) {
//       listElements.append(
//         createCard(item, removeCard, likeCard, openImagePopup)
//       );
//     });
//   }
//   initialCards();
// });

// редактирование профиля

function editProfile(evt) {
  evt.preventDefault();

  editProfileData(nameInput, descriptionInput).then((newProfileData) => {
    console.log(newProfileData);

    const newProfile = {
      name: newProfileData.name,
      about: newProfileData.about,
    };

    profileTitle.textContent = newProfile.name;
    profileDescription.textContent = newProfile.about;
  });

  closeModal(popupTypeEdit);
  clearForm(editProfileForm);
}

editProfileForm.addEventListener("submit", editProfile);

// редактированиие аватара

function editPrifileImage(evt) {
  evt.preventDefault();

  updateAvatarData(linkAvatarInput).then((data) => {
    console.log(data);
    profileImage.setAttribute(
      "style",
      `background-image: url("${linkAvatarInput.value}")`
    );
  });

  closeModal(avatarPopup);
  clearForm(avatarPopupForm);
}

avatarPopupForm.addEventListener("submit", editPrifileImage);

profileImage.addEventListener("click", function () {
  openModal(avatarPopup);
});

// форма создания карточки - не понимаю как реализовать(

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newPlaceName = placeNameInput.value;

  const newLink = linkInput.value;

  const addCard = { name: newPlaceName, link: newLink };

  const newCardElemen = createCard(
    addCard,
    removeCard,
    likeCard,
    openImagePopup
  );

  listElements.prepend(newCardElemen);

  // addNewCard(placeNameInput, linkInput)
  //   .then((newCardData) => {

  //     createCard({
  //       name: newCardData.name,
  //       link: newCardData.link,
  //     });

  //     listElements.prepend(newCardData);
  //   })

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
