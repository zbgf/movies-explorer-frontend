import { useContext, useEffect, useRef, useState } from 'react';
import CurrentUserContext from '../../utils/CurrentUserContext';
import { useFormWithValidation } from '../../utils/validation';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    handleChange,
    errors,
    isValid,
    resetForm
  } = useFormWithValidation();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const isEditingRef = useRef(isEditing);
  const [error, setError] = useState('');

  useEffect(() => {
    resetForm({
      name: currentUser.name,
      email: currentUser.email,
    });
    setIsEditing(false);
    setIsSaveDisabled(true);
  }, [currentUser, resetForm]);

  useEffect(() => {
    isEditingRef.current = isEditing;
  }, [isEditing]);

  useEffect(() => {
    let timer;
    if (isSaveSuccess && !isEditingRef.current) {
      timer = setTimeout(() => {
        setIsSaveSuccess(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isSaveSuccess]);

  useEffect(() => {
    const isDataUnchanged =
      values.name === currentUser.name && values.email === currentUser.email;
    setIsSaveDisabled(!isValid || isDataUnchanged);
  }, [values, currentUser, isValid]);

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleSaveClick(e) {
    e.preventDefault();

    if (isValid) {
      try {
        await props.onUpdateUser({
          name: String(values.name),
          email: String(values.email),
        });
        setIsSaveSuccess(true);
        setIsEditing(false);
        setError('');
      } catch (error) {
        setIsSaveSuccess(false);
        setError('Пользователь с таким email уже существует.');
      }
    }
  }

  return (
    <>
      <section className="profile">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className={`profile__success-message ${isSaveSuccess ? 'visible' : ''}`}>Данные успешно сохранены!</div>
        <form id="profile__form" className="profile__form" onSubmit={(e) => e.preventDefault()}>
          <label className="profile__input-container">
            <span className="profile__input-label">Имя</span>
            <input className="profile__input" type="text" name="name" value={values.name || ''} pattern="[A-Za-zА-Яа-яЁё\s\-]+" minLength={2} maxLength={30} onChange={handleChange} required disabled={!isEditing} />
          </label>
          <span className="login__error-input">{errors.name}</span>
          <span className="profile__line" />
          <label className="profile__input-container">
            <span className="profile__input-label">E-mail</span>
            <input className="profile__input" type="email" name="email" value={values.email || ''} pattern="([A-Za-z0-9_\-]+)@([A-Za-z0-9_\-]+)\.([A-Za-z]{2,8})" onChange={handleChange} required disabled={!isEditing} />
          </label>
          <span className="login__error-input">{errors.email}</span>
          <span className="profile__error">{error}</span>
          {isEditing ? (
            <button type="button"className={`profile__submit_save ${isSaveDisabled ? 'login__submit-button_disabled' : 'active'}`} disabled={isSaveDisabled} onClick={handleSaveClick}>Сохранить</button>
          ) : (
            <button type="button" className="profile__submit" onClick={handleEditClick}>Редактировать</button>
          )}
        </form>
        {!isEditing && (
          <div className="profile__wrapper">
            <button className="profile__exit" onClick={props.onClick}>Выйти из аккаунта</button>
          </div>
        )}
      </section>
    </>
  );
}

export default Profile;