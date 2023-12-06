import { useLocation } from "react-router-dom";
import React from "react";

function MoviesCard({ movie }) {
  const location = useLocation();
  const [isSave, setIsSave] = React.useState(false);
  function handleSaveClick() { setIsSave(true) };


  return (
    <li className="movies-card">
      <img className="movies-card__image" src={movie.image} alt={movie.title}></img>
      <div className="movies__container">
        <h2 className="movies-card__title">{movie.title}</h2>
        <p className="movies-card__duration">{movie.duration}</p>
      </div>
      <>
        {location.pathname === "/movies" 
          ?
          <button type="button" className={`movies-card__button ${isSave ? 'movies-card-save-active' : 'movies-card-save'}`} onClick={handleSaveClick}></button>
          :
          <button type="button" className={"movies-card__button movies-card__delete"}></button>
        }
      </>
    </li>
  )
}

export default MoviesCard;