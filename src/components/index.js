const cardTemplate = document.querySelector('#card-template').content;

// @todo: DOM узлы

const content = document.querySelector('.content');
const listElements = content.querySelector('.places__list')


// @todo: Функция создания карточки

function createCard(addCard, removeCard) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    cardElement.querySelector('.card__image').src = addCard.link;
    cardElement.querySelector('.card__image').alt = addCard.name;
    cardElement.querySelector('.card__title').textContent = addCard.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);
    
    return cardElement;
};

// @todo: Функция удаления карточки

function removeCard(event) {
    event.target.closest('.card').remove();
};
   

// @todo: Вывести карточки на страницу

initialCards.forEach(item => {
    listElements.append(createCard(item, removeCard));
});


