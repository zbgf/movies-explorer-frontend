import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm(props) {
  const { pathname } = useLocation();
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQuery') || '');
  const [savedMoviesSearchQuery, setSavedMoviesSearchQuery] = useState('');

  useEffect(() => {
    if (pathname === '/movies' && localStorage.getItem('searchQuery')) {
      setSearchQuery(localStorage.getItem('searchQuery'));
    } else if (pathname === '/saved-movies') {
      setSearchQuery(savedMoviesSearchQuery);
    } else {
      setSearchQuery('');
    }
  }, [pathname, savedMoviesSearchQuery]);

  const onSubmit = (e) => {
    e.preventDefault();
    props.searchMovie(searchQuery, props.movies);
    if (pathname === '/movies') {
      localStorage.setItem('searchQuery', searchQuery);
    } else if (pathname === '/saved-movies') {
      setSavedMoviesSearchQuery(searchQuery);
    } else {
      setSearchQuery('');
    }
  };

  const handleChangeValue = (e) => {
    setSearchQuery(e.target.value);
    if (pathname === '/saved-movies') {
      setSavedMoviesSearchQuery(e.target.value);
    }
  };

  useEffect(() => {
    if (pathname !== '/saved-movies') {
      setSavedMoviesSearchQuery('');
    }
  }, [pathname]);

  return(
    <>
      <section className='search-form'>
        <div className="search-form__container">
          <form className="search-form__form" onSubmit = {onSubmit}>
            <input className="search-form__input" placeholder="Фильм" type="text" required onChange={handleChangeValue} value={searchQuery}/>
            <button type="submit" className="search-form__button"></button>
          </form>
        </div>
      </section>
      <FilterCheckbox setIsShortMovie={props.setIsShortMovie} searchMovie={props.searchMovie} isShortMovie={props.isShortMovie} text={searchQuery} movies={props.movies}/>
    </>
  )
};

export default SearchForm;