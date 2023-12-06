function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__form">
          <input className="search-form__input" placeholder="Фильм" type="text" required />
          <button type="submit" className="search-form__button"></button>
        </form>
      </div>
    </section>
  )
}

export default SearchForm;