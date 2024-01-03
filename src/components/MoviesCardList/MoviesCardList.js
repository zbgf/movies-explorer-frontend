import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';

function MoviesCardList(props) {
  const [visibleMoviesCount, setVisibleMoviesCount] = useState(0);

  const increaseVisibleMoviesCount = () => {
    if (window.innerWidth >= 1280) { setVisibleMoviesCount(visibleMoviesCount + 3) } 
    if (window.innerWidth < 1280) { setVisibleMoviesCount(visibleMoviesCount + 2) }
  }

  useEffect (() => {     
    if (window.innerWidth >= 1280) { setVisibleMoviesCount(12) } 
    if (window.innerWidth < 1279 && window.innerWidth >= 768) { setVisibleMoviesCount(8) }
    if (window.innerWidth < 767) { setVisibleMoviesCount(5) } 
  }, [])

  return(
    <>
      <ul className='movies__list'>
        {props.moviesCards.slice(0, visibleMoviesCount).map((movie) => (
          <MoviesCard duration={movie.duration} image={movie.image} trailerLink={movie.trailerLink} nameRU={movie.nameRU} movie={movie} key={movie.movieId} removeMovieFromSavedList={props.removeMovieFromSavedList} isMovieInSavedList={props.isMovieInSavedList} toggleMovieSaveStatus={props.toggleMovieSaveStatus}/>
        ))}
      </ul>
      {
        (props.moviesCards.length > visibleMoviesCount) 
        ? 
        ( <button className='movies__button' type='button' onClick={increaseVisibleMoviesCount}>Ещё</button> ) 
        : 
        <></>
      }
    </>
  )
};

export default MoviesCardList;
