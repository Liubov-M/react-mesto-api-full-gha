class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }
  getCards(token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }
  setUserInfo({ name, about }, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        about
      })
    })
      .then(this._getResponseData);
  }
  setUserAvatar(link, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._getResponseData);
  }
  addCard(data, token) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.title,
        link: data.link
      })
    })
      .then(this._getResponseData);
  }

  deleteCard(cardId, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
      .then(this._getResponseData);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? "PUT" : "DELETE",
      credentials: 'include',
      headers: {
        'Authorization' : `Bearer ${token}`,
      },
    })
      .then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api