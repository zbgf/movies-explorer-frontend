import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Register(props) {
  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await props.handleRegister(name.current.value, email.current.value, password.current.value);
      setError('');
    } catch (err) {
      if (err.status === 409) {
        setError('Пользователь с таким email уже существует.');
      } else {
        setError('При регистрации пользователя произошла ошибка.');
      }
    }
  }

  useEffect(() => { }, [error]);

  return (
    <section className="register">
      <Link to="/" className="header__logo"/>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__form-item">
          <label className="register__form-label">Имя</label>
          <input className="register__form-input" type="text" pattern="[A-Za-zА-Яа-яЁё\s]+" minLength={2} maxLength={30} required ref={name}/>
        </div>
        <div className="register__form-item">
          <label className="register__form-label">E-mail</label>
          <input className="register__form-input" type="email" pattern="([A-Za-z0-9_\-]+)@([A-Za-z0-9_\-]+)\.([A-Za-z]{2,8})" required ref={email}/>
        </div>
        <div className="register__form-item">
          <label className="register__form-label">Пароль</label>
          <input className="register__form-input" type="password" required ref={password}/>
        </div>
        <span className="register__error">{error}</span>
        <button className="register__submit-button" type="submit">Зарегистрироваться</button>
      </form>
      <div className="register__wrapper">
        <div className="register__signin">
          <p className="register__signin-text">Уже зарегистрированы?</p>
          <Link to="/signin" className="register__signin-link">Войти</Link>
        </div>
      </div>
    </section>
  )
}

export default Register;
