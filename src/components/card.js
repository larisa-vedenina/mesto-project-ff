// из него должна экспортироваться функция createCard,
// Функции, обрабатывающие события лайка и удаления карточки, также должны находиться в этом файле и экспортироваться из него.

import { cardTemplate } from "./index.js";



export function createCard(addCard, removeCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  //меняем значения 
  cardImage.src = addCard.link;
  cardImage.alt = addCard.name;
  cardElement.querySelector(".card__title").textContent = addCard.name;

  // if (ownerId !== myId)

  
  // if (userId !== cardData.owner._id) 
  // deleteButton.remove();

  

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


