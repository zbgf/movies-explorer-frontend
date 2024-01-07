import { useState } from 'react';
import { NavLink } from 'react-router-dom';

function Navigation({isLogged}) {
  const [isOpenMenu, setIsOpenMenu] = useState(false)

  function handelClickMenu() {
    if (isOpenMenu) { setIsOpenMenu(false) } 
    else { setIsOpenMenu(true) }
  }
  
  function closeMenu() { setIsOpenMenu(false) }

  return (
    <>
      {isLogged
        ? 
        (
          <nav className="header__nav">
            <div className="header__nav_items">
              <NavLink to='/movies' className="header__link">Фильмы</NavLink>
              <NavLink to='/saved-movies' className="header__link">Сохранённые фильмы</NavLink>
            </div>
            <NavLink to='/profile' className="header__link_profile">Аккаунт</NavLink>
            <button type='button' className="header__open-menu"  onClick={handelClickMenu}/>
            <div className={`header__menu-container ${isOpenMenu ? 'header__menu-container_active' : ''}`}>
              <button type='button' className="header__menu-close" onClick={handelClickMenu}/>
              <nav className="header__menu-nav">
                <ul className="header__menu-list">
                  <li className="header__menu-item"><NavLink to='/' className="header__menu-link" onClick={closeMenu}>Главная</NavLink></li>
                  <li className="header__menu-item"><NavLink to='/movies' className="header__menu-link" onClick={closeMenu}>Фильмы</NavLink></li>
                  <li className="header__menu-item"><NavLink to='/saved-movies' className="header__menu-link" onClick={closeMenu}>Сохранённые фильмы</NavLink></li>
                  <li className="header__menu-item"><NavLink to='/profile' className="header__menu-link header__menu-link_profile" onClick={closeMenu}>Аккаунт</NavLink></li>
                </ul>
              </nav>
            </div>
          </nav>
        ) 
        : 
        (
          <nav className="header__nav_auth">
            <NavLink to='/signup' className="header__link_signup">Регистрация</NavLink>
            <NavLink to='/signin' className="header__link_signin">Войти</NavLink>
          </nav>
        )
      }
    </>
  )
}

export default Navigation;