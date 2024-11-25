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
            name: `${nameInput.value}`,
            about: `${descriptionInput.value}`,
        })
    })
        .then(handleResponse)
};


// Добавление новой карточки

export const addNewCard = (placeNameInput, linkInput) => {

    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: `${placeNameInput.value}`,
            link: `${linkInput.value}`,
        })
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


export const updateAvatarData = (linkAvatarInput) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: `${linkAvatarInput.value}`,
        })
    })
        .then(handleResponse)
};




