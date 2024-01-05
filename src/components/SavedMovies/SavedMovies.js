import { useEffect } from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

function SavedMovies(props) {
  useEffect(() => {
    props.onSearched(false);
    props.setNoResultsMessage('');
  }, []);
  
  return (
    <section className="movies">
      <SearchForm movies={props.movies} searchMovie={props.searchMovie} isShortMovie={props.isShortMovie} setIsShortMovie={props.setIsShortMovie}/>
      <span className="search-form__span">{props.noResultsMessage}</span>
      {!props.isSearch 
        ?
        <MoviesCardList movies={props.movies} moviesCards={props.movies} removeMovieFromSavedList={props.removeMovieFromSavedList}/>
        : 
        <MoviesCardList moviesCards={props.savedSearchedMovies} removeMovieFromSavedList={props.removeMovieFromSavedList}/>
      }
    </section>
  )
};

export default SavedMovies;