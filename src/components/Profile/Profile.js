import { useContext, useEffect, useRef, useState } from 'react';
import CurrentUserContext from '../../utils/CurrentUserContext';

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(true);
  const [isSaveSuccess, setIsSaveSuccess] = useState(false);
  const isEditingRef = useRef(isEditing);
  const [error, setError] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
    checkIfSaveDisabled(name, e.target.value);
  };

  function handleEmailChange(e) {
    setEmail(e.target.value);
    checkIfSaveDisabled(e.target.value, email);
  };

  function checkIfSaveDisabled(updatedName, updatedEmail) {
    const isDataUnchanged = updatedName === currentUser.name && updatedEmail === currentUser.email;
    setIsSaveDisabled(isDataUnchanged);
  }

  function handleEditClick() {
    setIsEditing(true);
  }

  function handleSaveClick(e) {
    e.preventDefault();
  
    const saveData = async () => {
      try {
        await props.onUpdateUser({ name: String(name), email: String(email) });
        setIsSaveSuccess(true);
        setIsEditing(false);
        setError('');
      } catch (error) {
        setIsSaveSuccess(false);
        setError('Пользователь с таким email уже существует.');
      }
    };

    saveData();
  }

  useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);
    setIsEditing(false);
    setIsSaveDisabled(true);
  }, [currentUser]);

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


  return (
    <>
      <section className="profile">
        <h2 className="profile__title">{`Привет, ${currentUser.name}!`}</h2>
        <div className={`profile__success-message ${isSaveSuccess ? 'visible' : ''}`}>Данные успешно сохранены!</div>
        <form id="profile__form" className="profile__form" onSubmit={(e) => e.preventDefault()}>
          <label className="profile__input-container">
            <span className="profile__input-label">Имя</span>
            <input className="profile__input" type="text" name="name" value={name} pattern="[A-Za-zА-Яа-яЁё\s]+" minLength={2} maxLength={30} onChange={handleNameChange} required={true} disabled={!isEditing}/>
          </label>
          <span className="profile__line"/>
          <label className="profile__input-container">
            <span className="profile__input-label">E-mail</span>
            <input className="profile__input" type="email" name="email" value={email} pattern="([A-Za-z0-9_\-]+)@([A-Za-z0-9_\-]+)\.([A-Za-z]{2,8})" onChange={handleEmailChange} required={true} disabled={!isEditing}/>
          </label>
          <span className="profile__error">{error}</span>
          {isEditing ? (
            <button type="button" className={`profile__submit_save ${isSaveDisabled ? 'disabled' : 'active'}`} disabled={isSaveDisabled} onClick={handleSaveClick}>Сохранить</button>
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
  )
}

export default Profile;
