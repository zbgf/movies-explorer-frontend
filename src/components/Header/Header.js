import Navigation from '../Navigation/Navigation'
import { NavLink } from 'react-router-dom';

function Header({loggedIn}) {
  loggedIn = false; //true - авторизован, false - нет

  return (
    <header className="header">
      <NavLink to='/' className="header__logo"></NavLink>
      <Navigation  loggedIn={loggedIn} />
    </header>
  )
}

export default Header;
