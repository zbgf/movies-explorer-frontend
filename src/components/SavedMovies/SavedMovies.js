import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import pic from "../../images/pic.png"


function SavedMovies() {
  const movies = [
    {
      image: pic,
      title: "34 слова о дизайне",
      duration: "1ч 17м",
      _id: 1,
    },
    {
      image: pic,
      title: "33 слова о дизайне",
      duration: "1ч 17м",
      _id: 2,
    },
  ]

  return (
    <section className="movies">
      <Header/>
      <SearchForm />
      <FilterCheckbox />
      <MoviesCardList movies={movies} />
      <button className="movies__button">Ещё</button>
      <Footer />
    </section>
  )
}

export default SavedMovies;