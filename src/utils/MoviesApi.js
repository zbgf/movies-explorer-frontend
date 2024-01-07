const moviesApi = {
  getMovies() {
    return fetch ('https://api.nomoreparties.co/beatfilm-movies', {
      method: 'GET',
      headers : {'Content-Type': 'application/json'}
    })
    .then((res) =>
      {if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`); 
      }
      return res.json();
    });
  }
}

export default moviesApi;