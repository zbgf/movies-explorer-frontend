import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function FilterCheckbox(props) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const currentLocation = useLocation();

  function handleCheckedState() {
    setIsCheckboxChecked(true);
    props.setIsShortMovie(!props.isShortMovie);
    if (currentLocation.pathname === '/movies'){ localStorage.setItem('isShortEnabled', !props.isShortMovie) }
  }

  useEffect(() => { if (isCheckboxChecked) { props.searchMovie(props.text, props.movies) } }, [props.isShortMovie, isCheckboxChecked]);

  useEffect(() => {
    const key = currentLocation.pathname === '/movies' ? 'isShortEnabled' : null;
    const storedValue = key ? localStorage.getItem(key) : null;
    const parsedValue = storedValue ? JSON.parse(storedValue) : null;
    props.setIsShortMovie(parsedValue || false);
  }, [currentLocation]);

  return (
    <section className="filter">
      <div className="filter__container">
        <input className="filter__checkbox" id="filter__checkbox" type="checkbox" checked={props.isShortMovie} onChange={handleCheckedState}/>
        <label className="filter__label" htmlFor="filter__checkbox"></label>
        <span className="filter__name">Короткометражки</span>
      </div>
    </section>
  )
};

export default FilterCheckbox;