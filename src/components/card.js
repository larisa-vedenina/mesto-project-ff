
import { cardTemplate } from "./index.js";


export function createCard(cardData, removeCard, likeCard, openImagePopup, userId) {

  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // меняем значения 
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;


  // проверка айди - мои карточки создаются с разным id и не понимаю, как сделать так, чтобы условие ниже сработало

  // if (userId !== cardData.owner._id) {
  //   deleteButton.remove();
  // }

  // поставить лайк

  const isLiked = cardData.likes.some((like) => like._id === userId);
  if (isLiked) {
    likeButton.classList("card__like-button_is-active")
  };

  // удаление карточки

  deleteButton.addEventListener("click", () => {
    removeCard(cardData._id, cardElement);
  });

  // deleteButton.addEventListener("click", () => removeCard(cardElement));

  likeButton.addEventListener("click", likeCard);

  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
}

// Функция удаления карточки

export function removeCard(cardData) {
  cardData.remove();
}



// @todo: like на карточке

export function likeCard(card) {
  card.target.classList.toggle("card__like-button_is-active");
}
