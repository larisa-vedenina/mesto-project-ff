import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard, openImagePopup } from "./card.js";
import { openModal, closeModal } from "./modal.js";

// @todo: DOM узлы

// карточки
export const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const listElements = content.querySelector(".places__list");

// вывести карточки на страницу

initialCards.forEach((item) => {
  listElements.append(createCard(item, removeCard, likeCard, openImagePopup));
});

// попап
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");

// обработчики событий при открытии и закрытии попапов

profileEditButton.addEventListener("click", function () {
  openModal(popupTypeEdit);
});

profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
});


document.addEventListener("click", closeModal);

// форма профиля
const editProfileForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function handleFormSubmit(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newjob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newjob;

  clearForm(editProfileForm);
}

editProfileForm.addEventListener("submit", handleFormSubmit);


// форма создания карточки

const addCardForm = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('[name="place-name"]');
const linkInput = document.querySelector('[name="link"]');

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newPlaceName = placeNameInput.value;
  const newLink = linkInput.value;

  const newCard = { name: newPlaceName, link: newLink };

  const newCardElemen = createCard(
    newCard,
    () => {
      newCardElemen.remove();
    },
    () => {
      newCardElemen
        .querySelector(".card__like-button")
        .classList.toggle("card__like-button_active");
    }
  );
  listElements.prepend(newCardElemen);

  clearForm(addCardForm);
});

function clearForm(form) {
  form.reset();
}
