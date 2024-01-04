import { Link } from "react-router-dom";
import { useState } from "react";
import { useFormWithValidation } from '../../utils/validation';

function Register(props) {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation();
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await props.handleRegister(values.name, values.email, values.password);
      setError('');
      resetForm();
    } catch (err) {
      if (err.status === 409) {
        setError('Пользователь с таким email уже существует.');
      } else {
        setError('При регистрации пользователя произошла ошибка.');
      }
    }
  };

  return (
    <section className="register">
      <Link to="/" className="header__logo"/>
      <h2 className="register__title">Добро пожаловать!</h2>
      <form className="register__form" onSubmit={handleSubmit}>
        <div className="register__form-item">
          <label className="register__form-label">Имя</label>
          <input className={`register__form-input ${errors.name ? 'input-error' : ''}`} type="text" pattern="[A-Za-zА-Яа-яЁё\s\-]+" minLength={2} maxLength={30} required name="name" value={values.name || ''} onChange={handleChange} />
          <span className="login__error-input">{errors.name}</span>
        </div>
        <div className="register__form-item">
          <label className="register__form-label">E-mail</label>
          <input className={`register__form-input ${errors.email ? 'input-error' : ''}`} type="email" pattern="([A-Za-z0-9_\-]+)@([A-Za-z0-9_\-]+)\.([A-Za-z]{2,8})" required name="email" value={values.email || ''} onChange={handleChange} />
          <span className="login__error-input">{errors.email}</span>
        </div>
        <div className="register__form-item">
          <label className="register__form-label">Пароль</label>
          <input className={`register__form-input ${errors.password ? 'input-error' : ''}`} type="password" minLength={8} required name="password" value={values.password || ''} onChange={handleChange} />
          <span className="login__error-input">{errors.password}</span>
        </div>
        <span className="register__error">{error}</span>
        <button className={`register__submit-button ${!isValid ? 'login__submit-button_disabled' : ''}`} type="submit" disabled={!isValid}>Зарегистрироваться</button>
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
