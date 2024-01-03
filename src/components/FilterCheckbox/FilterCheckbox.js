function FilterCheckbox() {
  return (
    <section className="filter">
      <div className="filter__container">
        <input className="filter__checkbox" id="short-films" type="checkbox" />
        <label className="filter__label" htmlFor="short-films"></label>
        <span className="filter__name">Короткометражки</span>
      </div>
    </section>
  )
}

export default FilterCheckbox;