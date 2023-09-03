const baseUrl = 'https://api.domainname.liubovm.nomoredomainsicu.ru'

function getResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}
export const register = (email, password) => {
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
       email: email,
       password: password
      })
    })
      .then(getResponse)
}
export const login = (email, password) => {
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
       email: email,
       password: password
      })
    })
      .then(getResponse)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          return data;
        }
      })
}
export const getData = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization' : `Bearer ${token}`,
    },
    credentials: 'include',
  })
    .then(getResponse)
}