import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import Footer from "../Footer/Footer";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import pic from "../../images/pic.png"


function Movies() {
  const movies = [
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 1,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 2,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 3,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 4,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 5,
        },
        {
            image:pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 6,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 7,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 8,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 9,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 10,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 11,
        },
        {
            image: pic,
            title: "33 слова о дизайне",
            duration: "1ч 17м",
            _id: 12,
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

export default Movies;