import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, removeCard, likeCard } from "./card.js";
import { openModal, closeModal} from "./modal.js";

// @todo: DOM узлы

// карточки
export const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const listElements = content.querySelector(".places__list");

// форма создания карточки
const addCardForm = document.querySelector('[name="new-place"]');
const placeNameInput = document.querySelector('[name="place-name"]');
const linkInput = document.querySelector('[name="link"]');

// попап
const allPopup = document.querySelectorAll('.popup');
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupTypeImage = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");


// форма профиля
const editProfileForm = document.querySelector('[name="edit-profile"]');
const nameInput = document.querySelector('[name="name"]');
const jobInput = document.querySelector('[name="description"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");



function editProfile(evt) {
  evt.preventDefault();

  const newName = nameInput.value;
  const newjob = jobInput.value;

  profileTitle.textContent = newName;
  profileDescription.textContent = newjob;

  removeOpenPopup();
  clearForm(editProfileForm);
}

editProfileForm.addEventListener("submit", editProfile);


// форма создания карточки

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();

  const newPlaceName = placeNameInput.value;
  const newLink = linkInput.value;

  const addCard = { name: newPlaceName, link: newLink };

  const newCardElemen = createCard(addCard, removeCard, likeCard, openImagePopup);
  listElements.prepend(newCardElemen);

  removeOpenPopup(popupTypeNewCard);
  clearForm(addCardForm);
});

function clearForm(form) {
  form.reset();
}

// попап картинки

function openImagePopup(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupImageCaption.textContent = evt.target.closest('.card').querySelector(".card__title").textContent;

  openModal(popupTypeImage);
};

// вывести карточки на страницу

initialCards.forEach((item) => {
  listElements.append(createCard(item, removeCard, likeCard, openImagePopup));
});

// обработчики событий при открытии и закрытии попапов

profileEditButton.addEventListener("click", function () {
  openModal(popupTypeEdit);

  editProfileForm.reset();
});

profileAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);

  addCardForm.reset();
});


// закрытия попапа по крестику    
allPopup.forEach((popup) => {
    const closeButton = popup.querySelector(".popup__close")
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