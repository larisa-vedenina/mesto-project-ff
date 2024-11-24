const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-26',
    headers: {
        authorization: 'c40fcb4d-f11d-4aae-95de-4f87cf7a7ffa',
        'Content-Type': 'application/json'
    }
};

// проверка ответа сервера

const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Загрузка карточек с сервера

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
};

// Загрузка информации о пользователе с сервера

export const getUserData = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'GET',
        headers: config.headers
    })
        .then(handleResponse)
};

// Редактирование профиля

export const editProfileData = (nameInput, descriptionInput) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: `${nameInput}`,
            about: `${descriptionInput}`,
        })
    })
        .then(handleResponse)
};

// Добавление новой карточки

export const addNewCard = (newCardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify(newCardData)
    })
    .then(handleResponse)
};





// Удаление карточки

export const deleteCard = () => {
    return fetch(`${config.baseUrl}/cards/${cardTemplate}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(handleResponse)
};

// Постановка лайка

export const putLikeData = () => {
    return fetch(`${config.baseUrl}/cards/likes/${cardTemplate}`, {
        method: 'PUT',
        headers: config.headers,
    })
    .then(handleResponse)
};

// и снятие лайка

export const deleteLikeData = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'DELETE',
        headers: config.headers,
    })
    .then(handleResponse)
};

// Обновление аватара пользователя


export const updateAvatarData = (newAvatarData) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: newAvatarData,
        })
        // .then(handleResponse)
    })

};




// Ты открываешь форму добавления карточки, прописываешь там название и ссылку.
// В запросе передаешь эти данные, а в ответе получаешь объект карточки от сервера, с которым уже работаешь.