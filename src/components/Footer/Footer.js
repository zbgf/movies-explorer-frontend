function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__main">
        <p className="footer__year">© 2020</p>
        <ul className="footer__items-list">
          <li><a href="https://practicum.yandex.ru/" className="footer__item-link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
          <li><a href="https://github.com/zbgf" className="footer__item-link" target="_blank" rel="noreferrer">Github</a></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;