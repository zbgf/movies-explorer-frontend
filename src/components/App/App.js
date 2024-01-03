import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import CurrentUserContext from '../../utils/CurrentUserContext';
import Main from '../Main/Main';
import Movies from '../Movies/Movies'
import Profile from '../Profile/Profile';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import SavedMovies from '../SavedMovies/SavedMovies';

function App() {
  const [ currentUser, setCurrentUser ] = useState({});

  return (
    <div className='body'>
      <CurrentUserContext.Provider value={currentUser}>
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/movies' element={<Movies/>}/>
          <Route path='/saved-movies' element={<SavedMovies/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/signin' element={<Login/>}/>
          <Route path='/signup' element={<Register/>}/>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;