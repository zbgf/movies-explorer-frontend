import Header from '../Header/Header';

function Profile() {
  return (
    <>
      <Header/>
      <section className="profile">
        <h2 className="profile__title">Привет, Виталий!</h2>
        <form id="profile__form" className="profile__form">
          <label className="profile__input-container">
            <span className="profile__input-label">Имя</span>
            <input className="profile__input" type="text" required={true}/>
          </label>
          <span className="profile__line"/>
          <label className="profile__input-container">
            <span className="profile__input-label">E-mail</span>
            <input className="profile__input" type="email" required={true}/>
          </label>
        </form>
        <div className="profile__wrapper">
          <button type="submit" className="profile__submit">Редактировать</button>
          <button className="profile__exit">Выйти из аккаунта</button>
        </div>
      </section>
    </>
  )
}

export default Profile;
