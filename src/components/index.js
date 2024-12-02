// Станислав, спасибо Вам огромное еще раз за помощь! Прошу прощения, что нарушала правила, впредь буду стараться укладываться в дедлайны
// Вроде бы все....

import "../pages/index.css";
import { createCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  getInitialCards,
  getUserData,
  editProfileData,
  addNewCard,
  deleteCard,
  updateAvatarData,
} from "./api.js";

// @todo: DOM узлы

export const cardTemplate = document.querySelector("#card-template").content;
const content = document.querySelector(".content");
const listElements = content.querySelector(".places__list");

// попапы
const allPopup = document.querySelectorAll(".popup");
const profileEditButton = document.querySelector(".profile__edit-button"); //кнопка редактировать профиль
const cardAddButton = document.querySelector(".profile__add-button"); //кнопка добавить карточку
const popupTypeEdit = document.querySelector(".popup_type_edit"); // попап редактировать профиль
const popupTypeNewCard = document.querySelector(".popup_type_new-card"); // попап добавить карточку
const popupTypeImage = document.querySelector(".popup_type_image"); // попап картинки
const popupImage = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");
const popupAllButtonSubmit = document.querySelectorAll(".popup__button-submit")

// форма редактирования профиля
const editProfileForm = document.querySelector('[name="edit-profile"]');
const nameValue = document.querySelector('[name="name-input"]');
const descriptionValue = document.querySelector('[name="description-input"]');
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// форма создания карточки
const addCardForm = document.querySelector('[name="new-place"]');
const placeNameValue = document.querySelector('[name="place-name-input"]');
const linkValue = document.querySelector('[name="link-input"]');

//аватар попап
const avatarPopup = document.querySelector(".popup_type_update-avatar");
const avatarPopupForm = avatarPopup.querySelector('[name="update-avatar"]');
const linkAvatarValue = document.querySelector(".popup__input_type_url_avatar");
const profileImage = document.querySelector(".profile__image");

// попап удаление
const deleteCardPopup = document.querySelector(".popup_type_delete-card");
const popupButtonDeleteCard = deleteCardPopup.querySelector(".popup__button_card-delete");


// валидация форм

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

// вывести карточки на страницу

let userId;

Promise.all([getInitialCards(), getUserData()])
  .then(([cards, userData]) => {
    console.log({ cards, userData })

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;
    profileImage.style.backgroundImage = "url(" + userData.avatar + ")";

    userId = userData._id;

    cards.forEach((cardData) => {
      listElements.append(createCard(cardData, removeCard, likeCard, openImagePopup, userId));
    });
  })
  .catch(err => console.log(`Ошибка: ${err}`));


// функция загрузки

function renderLoading(isLoading) {

  if (isLoading) {
    popupAllButtonSubmit.forEach((button) => {
      button.innerText = "Сохранение...";
    })
  } else {
    popupAllButtonSubmit.forEach((button) => {
      button.innerText = "Сохранить";
    })
  };
};

// редактирование профиля

function editProfile(evt) {
  evt.preventDefault();
  renderLoading(true);

  editProfileData(nameValue, descriptionValue)
    .then((newProfileData) => {
      console.log(newProfileData);

      const newProfile = {
        name: newProfileData.name,
        about: newProfileData.about,
      };

      profileTitle.textContent = newProfile.name;
      profileDescription.textContent = newProfile.about;

      closeModal(popupTypeEdit);
      clearForm(editProfileForm);
    })

    .catch(err => console.log(`Ошибка: ${err}`))

    .finally(() => {
      renderLoading(false);
    });
}

editProfileForm.addEventListener("submit", editProfile);

// редактированиие аватара

function editPrifileImage(evt) {
  evt.preventDefault();
  renderLoading(true);

  updateAvatarData(linkAvatarValue).then((data) => {
    console.log(data);

    profileImage.style.backgroundImage = "url(" + data.avatar + ")";

    closeModal(avatarPopup);
    clearForm(avatarPopupForm);
  })

    .catch(err => console.log(`Ошибка: ${err}`))

    .finally(() => {
      renderLoading(false);
    });
}

avatarPopupForm.addEventListener("submit", editPrifileImage);


// создание новой карточки 

addCardForm.addEventListener("submit", function (evt) {
  evt.preventDefault();
  renderLoading(true);

  addNewCard(placeNameValue, linkValue)
    .then((data) => {
      console.log(data);

      const newCardElement = createCard(data, removeCard, likeCard, openImagePopup, userId)

      listElements.prepend(newCardElement);

      closeModal(popupTypeNewCard);
      clearForm(addCardForm);
      clearValidation(addCardForm, validationConfig);

    })

    .catch(err => console.log(`Ошибка: ${err}`))

    .finally(() => {
      renderLoading(false);
    });
});


// удаление карточки

let cardForDelete = {};
const removeCard = (cardId, cardElement) => {
  cardForDelete = {
    id: cardId,
    cardElement
  }
  openModal(deleteCardPopup);
};

popupButtonDeleteCard.addEventListener("click", function (evt) {
  console.log("popup.submit", cardForDelete);
  evt.preventDefault();

  if (!cardForDelete.cardElement) return;

  deleteCard(cardForDelete.id)
    .then((data) => {
      console.log(data);

      cardForDelete.cardElement.remove();
      closeModal(deleteCardPopup);
      cardForDelete = {};
    })

    .catch(err => console.log(`Ошибка: ${err}`))

    .finally(() => {
      renderLoading(false);
    });
})



function clearForm(form) {
  form.reset();
};

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
  descriptionValue.value = profileDescription.textContent;
  nameValue.value = profileTitle.textContent;
  clearValidation(editProfileForm, validationConfig);
});

cardAddButton.addEventListener("click", function () {
  openModal(popupTypeNewCard);
  placeNameValue.value = "";
  linkValue.value = "";
  // clearValidation(addCardForm, validationConfig);

});

profileImage.addEventListener("click", function () {
  openModal(avatarPopup);
  linkAvatarValue.value = "";
  clearValidation(avatarPopupForm, validationConfig);
});



// закрытие попапа по крестику
allPopup.forEach((popup) => {
  const closeButton = popup.querySelector(".popup__close");
  closeButton.addEventListener("click", () => {
    closeModal(popup);
  });
});

// закрытие попапа по оверлею
allPopup.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});

enableValidation(validationConfig); 