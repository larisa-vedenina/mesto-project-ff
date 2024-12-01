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

  // кол-во лайков равно длине массива лайков
  likeCount.textContent = cardData.likes.length;

  //сравниваем есть ли ID пользователя в массиве лайков у карточки. Если есть - красим лайк, иначе нет
  const isLiked = cardData.likes.some((like) => like._id === userId);

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  };

  // like на карточке

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, likeCount, cardData._id);
  });

  // состояние лайк


  cardImage.addEventListener("click", openImagePopup);

  return cardElement;
};



// функция лайка


//при клике будет срабатывать функция, которая принимает айди карточки, кол-во лайков, саму кнопку
export const likeCard = (likeCard, likeLength, cardId) => {
  
  // если кнопка закрашена, то запрашиваем id на сервере и убираем лайк
  if (likeCard.classList.contains('card__like-button_is-active')) {
    deleteLikeData(cardId)
      .then((data) => {
        console.log(data);

        // убираем активный класс с кнопки и уменьшаем счетчик на 1
        likeCard.classList.remove("card__like-button_is-active");
        likeLength.textContent = data.likes.length;
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  }
  // иначе мы закрашиваем кнопку и учеличиваем счетчик
  else {
    putLikeData(cardId)
      .then((data) => {
        likeCard.classList.add("card__like-button_is-active");
        likeLength.textContent = data.likes.length;
      })
      .catch(err => console.log(`Ошибка: ${err}`))
  };
}

