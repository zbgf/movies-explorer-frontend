import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList({ movies }) {

  return (
    <ul className="movies__list">
      {movies.map((movie) => ( <MoviesCard key={movie._id} movie={movie} /> ))}
    </ul>
  )
}

export default MoviesCardList;