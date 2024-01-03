import { useState, useEffect, React } from 'react';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import CurrentUserContext from '../../utils/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';
import mainApi from '../../utils/mainApi';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import moviesApi from '../../utils/MoviesApi';

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [isLogged, setLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [saveMovies, setSaveMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [isShortMovie, setIsShortMovie] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [saveSearchMovies, setSaveSearchMovies] = useState([]);
  const [noResultsMessage, setNoResultsMessage] = useState('');
  const [isPreloaderVisible, setPreloaderVisible] = useState(false);

  function handleRegister(name, email, password) {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          return mainApi
            .login(email, password)
            .then((res) => {
              navigate("/");
              localStorage.setItem("jwt", res.token);
              setLogged(true);
            })
            .catch((err) => {
              console.error(`Ошибка.....: ${err}`);
              throw err;
            });
        }
      })
      .catch((err) => {
        console.error(`Ошибка.....: ${err}`);
        throw err;
      });
  }
  
  function handleLogin(email, password) {
    return mainApi.login(email, password)
    .then((res) => {
      navigate("/");
      localStorage.setItem("jwt", res.token);
      setLogged(true);
    })
    .catch(err => {
      console.error(`Ошибка.....: ${err}`);
      throw err;
    });
  };

  function handleUpdateUser(user) {
    return mainApi.setUserInfo(user.name, user.email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (localStorage.jwt) {
          const userData = await mainApi.getUserInfo(localStorage.jwt);
          setCurrentUser(userData);
          setLogged(true);
        } else {
          setLogged(false);
          localStorage.clear();
        }
      } catch (err) {
        console.error(`Ошибка.....: ${err}`);
        localStorage.clear();
      }
    };
    fetchData();
  }, [isLogged]);

  function handleSignOut() {
    navigate("/");
    localStorage.clear();
    setLogged(false);
    window.location.reload()
  };

  function getSaveMovies() {
    mainApi.getMovies()
      .then((movies) => {
        const filteredMovies = movies
        .filter(({ owner }) => owner === currentUser._id)
        .map(({ _id, ...rest }) => ({ ...rest, id: _id }))
        setSaveMovies(filteredMovies);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  useEffect(() => {
    if (isLogged) {
      getSaveMovies();
    }
  }, [isLogged, saveMovies]);

  function searchMovie(text, movies) {
    const moviesFilter = movies.filter(({ nameRU, duration }) => (nameRU.toLowerCase().includes(text.toLowerCase())&&(isShortMovie ? duration <= 40 : true)));
    setPreloaderVisible(true);
    setNoResultsMessage('');
    const handleResults = (filteredMovies) => {
      setPreloaderVisible(false);
      getSaveMovies();
      setSearchMovies(filteredMovies.map(mapMovieToCard));
      localStorage.setItem('foundMovies', JSON.stringify(filteredMovies));
  
      if (filteredMovies.length === 0) {
        setNoResultsMessage('Ничего не найдено');
      } else {
        setNoResultsMessage('');
      }
    };
  
    if (location.pathname === '/movies') {
      setTimeout(() => {
        handleResults(moviesFilter);
      }, 1000);
    } else {
      setIsSearch(true);
      setSaveSearchMovies(moviesFilter);
      if (moviesFilter.length === 0) {
        setNoResultsMessage('Ничего не найдено')
      } else {
        setNoResultsMessage('');
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLogged) {
          const movies = await moviesApi.getMovies();
          localStorage.setItem('movies', JSON.stringify(movies));
          setMovies(movies);
          getSaveMovies();
          if (localStorage.getItem('foundMovies')) {
            const loadedMovies = JSON.parse(localStorage.getItem('foundMovies'));
            setSearchMovies(loadedMovies.map(mapMovieToCard));
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [isLogged]);
  
  function mapMovieToCard(movie) {
    const {country, director, duration, year, description, image, trailerLink, nameRU, nameEN, id } = movie;
    const thumbnail = `https://api.nomoreparties.co/${image.url}`;
    return {country, director, duration, year, description, image: `https://api.nomoreparties.co/${image.url}`, trailerLink, thumbnail, nameRU, nameEN, movieId: id };
  };

  function isMovieInSavedList(movie) {
    const { movieId } = movie;
    return saveMovies.some(({ movieId: savedMovieId }) => savedMovieId === movieId);
  };
  
  function removeMovieFromSavedList(movie) {
    mainApi.deleteMovie(movie, movie.id)
      .then(() => {
        const resultForMovies = saveMovies.filter ( item => item.id !== movie.id);
        setSaveMovies(resultForMovies);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`))
  };

  function toggleMovieSaveStatus(movie) {
    if(isMovieInSavedList(movie) === false) {
      mainApi.createMovie(movie)
      .then((savedMovie) => {
        getSaveMovies([savedMovie, ...saveMovies]);
      })
      .catch(err => console.log(`Ошибка.....: ${err}`));
    } else {
      saveMovies.forEach((item) => {
        if(item.movieId === movie.movieId) {
          removeMovieFromSavedList(item);
        }
      })
    }
  };

  return (
    <div className='body'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={
            <>
              <Header isLogged={isLogged}/>
              <Main/>
              <Footer/>
            </>
          }/>
          <Route path='/movies' element={
            <ProtectedRoute isLogged={isLogged}>
              <Header isLogged={isLogged}/>
              <Movies isPreloaderVisible={isPreloaderVisible} noResultsMessage={noResultsMessage} moviesCards={searchMovies} isShortMovie={isShortMovie} searchMovie={searchMovie} isMovieInSavedList={isMovieInSavedList} toggleMovieSaveStatus={toggleMovieSaveStatus} movies={movies} setIsShortMovie={setIsShortMovie}/>
              <Footer/>
            </ProtectedRoute>
          }/>
          <Route path='/saved-movies' element={
            <ProtectedRoute isLogged={isLogged}>
              <Header isLogged={isLogged}/>
              <SavedMovies setNoResultsMessage={setNoResultsMessage } noResultsMessage={noResultsMessage} moviesCards={saveSearchMovies} isShortMovie={isShortMovie} searchMovie={searchMovie} removeMovieFromSavedList={removeMovieFromSavedList} movies={saveMovies} setIsShortMovie={setIsShortMovie} isSearch={isSearch} getSaveMovies={getSaveMovies} onSearched={setIsSearch}/>
              <Footer/> 
            </ProtectedRoute>
          }/>
          <Route path='/profile' element={
            <ProtectedRoute isLogged={isLogged}>
              <Header isLogged={isLogged}/>
              <Profile onClick={handleSignOut} onUpdateUser={handleUpdateUser} isLogged={isLogged}/>
            </ProtectedRoute>
          }/>
          <Route path='/signin' element={
            isLogged ?
            <Navigate to='/' replace />
            :
            <Login handleLogin={handleLogin}/>}/>
          <Route path='/signup' element={
            isLogged ?
            <Navigate to='/' replace />
            :
            <Register handleRegister={handleRegister}/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;