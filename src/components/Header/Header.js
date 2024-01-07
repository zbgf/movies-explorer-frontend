import Navigation from '../Navigation/Navigation'
import { NavLink } from 'react-router-dom';

function Header({isLogged}) {

  return (
    <header className="header">
      <NavLink to='/' className="header__logo"></NavLink>
      <Navigation isLogged={isLogged} />
    </header>
  )
}

export default Header;
