
import { cardTemplate } from "./index.js";
import { putLikeData, deleteLikeData, } from "./api.js";

export function createCard(cardData, removeCard, likeCard, openImagePopup, userId) {

  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCount = cardElement.querySelector(".like-count");


  // меняем значения 
  cardImage.alt = cardData.name;
  cardImage.src = cardData.link;
  cardElement.querySelector(".card__title").textContent = cardData.name;


  // проверка айди 

  if (userId !== cardData.owner._id) {
    deleteButton.remove();
  }
  
  // удаление карточки
  
  deleteButton.addEventListener("click", () => {
    removeCard(cardData._id, cardElement);
  });
  
  // состояние лайка

  const isLiked = cardData.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  };

  // like на карточке

  likeButton.addEventListener("click", () => {
    likeCard(cardData.owner._id, cardData.likes.length);
  });

  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
};







// export function likeCard(card) {
//   card.target.classList.toggle("card__like-button_is-active");
// }

let cardForLike = {}

export function likeCard(likeId, likeLength) {
  cardForLike = {
    id: likeId,
    length: likeLength
  }

  putLikeData(likeId).then((data) => {

    console.log(data)
  })
}
