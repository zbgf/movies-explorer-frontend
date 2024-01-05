import { useState, useEffect, React} from 'react';
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
  const [hasFetchedSaveMovies, setHasFetchedSaveMovies] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [savedSearchedMovies, setSavedSearchedMovies] = useState([]);

  function handleRegister(name, email, password) {
    return mainApi
      .register(name, email, password)
      .then((res) => {
        if (res) {
          return mainApi
            .login(email, password)
            .then((res) => {
              navigate("/movies");
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
      navigate("/movies");
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
    window.location.reload();
    setHasFetchedSaveMovies(false);
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
    const fetchData = async () => {
      try {
        if (isLogged && !hasFetchedSaveMovies) {
          const userData = await mainApi.getUserInfo(localStorage.jwt);
          setCurrentUser(userData);
          setLogged(true);
          const moviesData = await moviesApi.getMovies();
          setMovies(moviesData);
          const savedMovies = await mainApi.getMovies();
          const filteredMovies = savedMovies.filter(({ owner }) => owner === userData._id).map(({ _id, ...rest }) => ({ ...rest, id: _id }));
          setSaveMovies(filteredMovies);
          setHasFetchedSaveMovies(true);
        }
      } catch (err) {
        console.error(`Ошибка.....: ${err}`);
      }
    };
  
    fetchData();
  }, [isLogged, hasFetchedSaveMovies]);

  function searchMovie(text, movies) {
    setSearchKey(text.toLowerCase());
    const localStorageKey = location.pathname === '/movies' ? 'movies' : null;
    const storedMoviesCheck = localStorageKey ? JSON.parse(localStorage.getItem(localStorageKey)) || [] : [];
  
    if (localStorageKey && storedMoviesCheck.length === 0) {
      localStorage.setItem(localStorageKey, JSON.stringify(movies));
    }
    const storedMovies = localStorageKey ? JSON.parse(localStorage.getItem(localStorageKey)) || [] : [];
    const moviesToFilter = localStorageKey ? storedMovies : movies;
  
    const moviesFilter = moviesToFilter.filter(({ nameRU, duration }) => (
      nameRU.toLowerCase().includes(text.toLowerCase()) && (isShortMovie ? duration <= 40 : true)
    ));
  
    setPreloaderVisible(true);
    setNoResultsMessage('');
  
    const handleResults = (filteredMovies) => {
      getSaveMovies();
      setSearchMovies(filteredMovies.map(mapMovieToCard));
      localStorage.setItem('foundMovies', JSON.stringify(filteredMovies));
  
      if (filteredMovies.length === 0) {
        setNoResultsMessage('Ничего не найдено');
        setTimeout(() => {setPreloaderVisible(false);}, 0);
      } else {
        setNoResultsMessage('');
        setTimeout(() => {setPreloaderVisible(false);}, 0);
      }
      setTimeout(() => {setPreloaderVisible(false);}, 0);

    };
  
    if (location.pathname === '/movies') {
      handleResults(moviesFilter);
    } else {
      setIsSearch(true);
      setSaveSearchMovies(moviesFilter);
      if (moviesFilter.length === 0) {
        setTimeout(() => {setPreloaderVisible(false);}, 0);
        setNoResultsMessage('Ничего не найдено');
      } else {
        setTimeout(() => {setPreloaderVisible(false);}, 0);
        setNoResultsMessage('');
      }
      setSavedSearchedMovies(moviesFilter);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isLogged) {
          const movies = await moviesApi.getMovies();
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
        const filteredSavedMovies = savedSearchedMovies.filter ( item => item.id !== movie.id);
        setSavedSearchedMovies(filteredSavedMovies);
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
              <Movies isPreloaderVisible={isPreloaderVisible} noResultsMessage={noResultsMessage} moviesCards={searchMovies} isShortMovie={isShortMovie} searchMovie={searchMovie} isMovieInSavedList={isMovieInSavedList} toggleMovieSaveStatus={toggleMovieSaveStatus} movies={movies} setIsShortMovie={setIsShortMovie} searchKey={searchKey}/>
              <Footer/>
            </ProtectedRoute>
          }/>
          <Route path='/saved-movies' element={
            <ProtectedRoute isLogged={isLogged}>
              <Header isLogged={isLogged}/>
              <SavedMovies savedSearchedMovies={savedSearchedMovies} setNoResultsMessage={setNoResultsMessage } noResultsMessage={noResultsMessage} moviesCards={saveSearchMovies} isShortMovie={isShortMovie} searchMovie={searchMovie} removeMovieFromSavedList={removeMovieFromSavedList} movies={saveMovies} setIsShortMovie={setIsShortMovie} isSearch={isSearch} getSaveMovies={getSaveMovies} onSearched={setIsSearch}/>
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