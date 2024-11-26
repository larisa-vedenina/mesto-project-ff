
import { cardTemplate } from "./index.js";


export function createCard(cardData, removeCard, likeCard, openImagePopup) {

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

// проверка айди

  // console.log(cardData)


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


