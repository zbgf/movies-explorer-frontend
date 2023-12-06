import { Link } from 'react-router-dom';

function Register() {
  return (
    <section className="register">
      <Link to="/" className="header__logo"/>
      <h2 className="register__title">Добро пожаловать!</h2>

      <form className="register__form">
        <div className="register__form-item">
          <label className="register__form-label">Имя</label>
          <input className="register__form-input" type="text" required />
        </div>

        <div className="register__form-item">
          <label className="register__form-label">E-mail</label>
          <input className="register__form-input" type="email" required />
        </div>

        <div className="register__form-item">
          <label className="register__form-label">Пароль</label>
          <input className="register__form-input" type="password" required />
        </div>
      </form>

      <div className="register__wrapper">
        <button className="register__submit-button" type="submit">Зарегистрироваться</button>
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__signin-link">Войти</Link>
        </div>
      </div>
    </section>
  )
}

export default Register;
