
import { cardTemplate } from "./index.js";
// import { deleteCard } from './api.js';


export function createCard(addCard, removeCard, likeCard, openImagePopup) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");

  // меняем значения 
  cardImage.alt = addCard.name;
  cardImage.src = addCard.link;
  cardElement.querySelector(".card__title").textContent = addCard.name;

  // проверка айди
  // if (userId !== cardElement.owner._id) 
  // deleteButton.remove();

  // deleteButton.addEventListener("click", () => {
  //   removeCard(data._id, cardElement); // данные берем внутри createCard, тут все есть
  // });

  // removeCard(id, cardElement);

  deleteButton.addEventListener("click", () => removeCard(cardElement));
  likeButton.addEventListener("click", likeCard);
  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
}

// @todo: Функция удаления карточки

export function removeCard(card) { 

  card.remove(); 

} 

// export function removeCard(id, cardElement) {
//   deteleCard(id).then(() => {
//     cardElement.remove()
//   })
// }

// @todo: like на карточке

export function likeCard(card) {
  card.target.classList.toggle("card__like-button_is-active");
}


