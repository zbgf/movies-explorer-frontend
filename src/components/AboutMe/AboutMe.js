import photo from '../../images/no_photo.jpg'

function AboutMe() {
  return(
    <section className="about-me" id="about-me">
      <h2 className="about-me__title">Студент</h2>
      <div className="about-me__main">
        <div className="about-me__info">
          <h3 className="about-me__name">Никита</h3>
          <p className="about-me__about">Почти фронтенд-разработчик, 23 года</p>
          <p className="about-me__descriotion">Я живу в Москве, учусь в РУДН. У меня нет жены и дочери. Я люблю слушать музыку, а ещё не люблю бегать. Недавно начал кодить.</p>
          <a href="https://github.com/zbgf" className="about-me__link" target="_blank" rel="noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="фото"/>
      </div>
    </section>
  )
}

export default AboutMe;