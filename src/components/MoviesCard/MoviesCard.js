import { useLocation } from 'react-router-dom';

function MoviesCard(props) {

  const currentLocation = useLocation();

  function formatTime(duration) {
    const { hours, min } = {
      hours: Math.trunc(duration / 60),
      min: duration % 60
    };
    return `${hours}ч ${min}м`;
  }

  return(
    <li className="movies-card">
      <a className="movies-card__link" href={props.trailerLink} target="_blank" rel="noreferrer">
        <img className="movies-card__image" src={props.image} alt={`фильм ${props.nameRU}`}></img>
      </a>
      <div className="movies__container">
        <h2 className="movies-card__title">{props.nameRU}</h2>
        <p className="movies-card__duration">{formatTime(props.duration)}</p>
      </div>
      <>
        {currentLocation.pathname === "/movies" 
          ?
          <button type="button" className={`movies-card__button ${props.isMovieInSavedList(props.movie) ? 'movies-card-save-active' : 'movies-card-save'}`} onClick={()=>props.toggleMovieSaveStatus(props.movie)}></button>
          :
          <button type="button" className={"movies-card__button movies-card__delete"} onClick={()=>props.removeMovieFromSavedList(props.movie)}></button>
        }
      </>
    </li>
  )
};

export default MoviesCard;