// из него должна экспортироваться функция createCard,
// Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.

import { cardTemplate } from "./index.js";
import { openModal } from "./modal.js";

export function createCard(addCard, removeCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  cardImage.src = addCard.link;
  cardImage.alt = addCard.name;
  cardElement.querySelector(".card__title").textContent = addCard.name;

  deleteButton.addEventListener("click", () => removeCard(cardElement));
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
}

// @todo: Функция удаления карточки

export function removeCard(card) {
  card.remove();
}

// @todo: like на карточке

export function likeCard(card) {
  card.target.classList.toggle("card__like-button_is-active");
}

// @todo: попап картинки

export function openImagePopup(evt) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const popupTypeImage = document.querySelector(".popup_type_image");

  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.closest('.card').querySelector(".card__title").textContent;

  openModal(popupTypeImage);
};
