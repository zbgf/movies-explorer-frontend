import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

function Login(props) {
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await props.handleLogin(email.current.value, password.current.value);
      setError('');
    } catch (err) {
      if (err.status === 401) {
        setError('Вы ввели неправильный логин или пароль.');
      } else {
        setError('При авторизации произошла ошибка.');
      }
    }
  }

  useEffect(() => { }, [error]);

  return (
    <section className="login">
      <Link to="/" className="header__logo"/>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form-item">
          <label className="login__form-label">E-mail</label>
          <input type="email" className="login__form-input" pattern="([A-Za-z0-9_\-]+)@([A-Za-z0-9_\-]+)\.([A-Za-z]{2,8})" required ref={email}/>
        </div>
        <div className="login__form-item">
          <label className="login__form-label">Пароль</label>
          <input type="password" className="login__form-input" required ref={password}/>
        </div>
        <span className="login__error">{error}</span>
        <button type="submit" className="login__submit-button">Войти</button>
      </form>
      <div className="login__wrapper">
        <div className="login__signin">
          <p className="login__signin-text">Ещё не зарегистрированы?</p>
          <Link to="/signup" className="login__signin-link">Регистрация</Link>
        </div>
      </div>
    </section>
  )
}

export default Login;
