import { Link } from 'react-router-dom';

function Login() {
  return (
    <section className="login">
      <Link to="/" className="header__logo"/>
      <h2 className="login__title">Рады видеть!</h2>

      <form className="login__form">
        <div className="login__form-item">
          <label className="login__form-label">E-mail</label>
          <input type="email" className="login__form-input" required />
        </div>

        <div className="login__form-item">
          <label className="login__form-label">Пароль</label>
          <input type="password" className="login__form-input" required />
        </div>
      </form>

      <div className="login__wrapper">
        <button type="submit" className="login__submit-button">Войти</button>
        <div className="login__signin">
          <p className="login__signin-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__signin-link">Регистрация</Link>
        </div>
      </div>
    </section>
  )
}

export default Login;
