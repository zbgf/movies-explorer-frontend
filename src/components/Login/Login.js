import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
import { useFormWithValidation } from '../../utils/validation';

function Login(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [serverError, setServerError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.handleLogin(values.email, values.password);
      resetForm(); 
      setServerError(''); 
    } catch (err) {
      if (err.status === 401) {
        setServerError('Вы ввели неправильный логин или пароль.');
      } else {
        setServerError('При авторизации произошла ошибка.');
      }
    }
  }

  useEffect(() => {
    setServerError(props.serverError || '');
  }, [props.serverError]);

  return (
    <section className="login">
      <Link to="/" className="header__logo"/>
      <h2 className="login__title">Рады видеть!</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <div className="login__form-item">
          <label className="login__form-label">E-mail</label>
          <input type="email" className="login__form-input" pattern="([A-Za-z0-9_\-]+)@([A-Za-z0-9_\-]+)\.([A-Za-z]{2,8})" required name="email" value={values.email || ''} onChange={handleChange} />
          <span className="login__error-input">{errors.email}</span>
        </div>
        <div className="login__form-item">
          <label className="login__form-label">Пароль</label>
          <input type="password" className="login__form-input" required name="password" value={values.password || ''} onChange={handleChange} minLength={8} />
          <span className="login__error-input">{errors.password}</span>
        </div>
        <span className="login__error">{serverError}</span>
        <button type="submit" className={`login__submit-button ${isValid ? '' : 'login__submit-button_disabled'}`} disabled={!isValid}>Войти</button>
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
