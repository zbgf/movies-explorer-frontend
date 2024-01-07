import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader'

function Movies(props) {
  return (
    <section className="movies">
      <SearchForm movies={props.movies} searchMovie={props.searchMovie} isShortMovie={props.isShortMovie} setIsShortMovie={props.setIsShortMovie}/>
      <span className="search-form__span">{props.noResultsMessage}</span>
      <Preloader isPreloaderVisible={props.isPreloaderVisible}/>
      <MoviesCardList moviesCards={props.moviesCards} toggleMovieSaveStatus={props.toggleMovieSaveStatus} isMovieInSavedList={props.isMovieInSavedList} searchKey={props.searchKey}/>
    </section>
  )
};

export default Movies;

