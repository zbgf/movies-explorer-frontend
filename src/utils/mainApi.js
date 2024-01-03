class MainApi {
  constructor(options) {
    this._url = options.baseUrl;
  }

  _getResponseData(res) {
    return res.ok ? res.json() : res.json().then(error => {
      throw { status: res.status, error };
    });
  }

  getUserInfo(token) {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
      }
    })
    .then(res => {return this._getResponseData(res)})
  }

  setUserInfo(name, email) {
    // console.log("setUserInfo - name:", name);
    // console.log("setUserInfo - email:", email);
    const token = localStorage.getItem('jwt');

    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization : `Bearer ${token}`
      },
      body: JSON.stringify({
        name: name,
        email: email
      })
    })
    .then(res => {return this._getResponseData(res)})
  }

  register(name, email, password) {
    return fetch(`${this._url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
    .then(res => {return this._getResponseData(res)})
  }

  login(email, password) {
    return fetch(`${this._url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
    .then(res => {return this._getResponseData(res)})
  }

  getMovies() {
    const token = localStorage.getItem('jwt');
    return fetch(`${this._url}/movies`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${token}`
    }
    })
    .then(res => {return this._getResponseData(res)})
  }

  createMovie(movie) {
    const { country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN, id } = movie;
  
    return fetch(`${this._url}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({ country, director, duration, year, description, image, trailerLink, thumbnail, owner, movieId, nameRU, nameEN, id
      }),
    })
    .then(res => {return this._getResponseData(res)})
  }


  deleteMovie(obj, id) {
    return fetch(`${this._url}/movies/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization' : `Bearer ${localStorage.getItem("jwt")}`
    },
      body: JSON.stringify(obj)
    })
    .then(res => {return this._getResponseData(res)})
  }
}

const mainApi = new MainApi({
  baseUrl: 'https://api.zbgf.nomoredomainsmonster.ru',
});

export default mainApi;