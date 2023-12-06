function Portfolio() {
  return (
    <section className="portfolio">
    <h2 className="portfolio__title">Портфолио</h2>
    <ul className="portfolio__items-list">
      <li className="portfolio__item">
        <a href="https://github.com/zbgf/russian-travel" className="portfolio__link" target="_blank" rel="noreferrer">
          <p className="portfolio__link-name">Адаптивный сайт</p>
          <div className="portfolio__link-button" />
        </a>
      </li>
      <li className="portfolio__item">
        <a href="https://github.com/zbgf/react-mesto-api-full-gha" className="portfolio__link" target="_blank" rel="noreferrer">
          <p className="portfolio__link-name">Одностраничное приложение</p>
          <div className="portfolio__link-button" />
        </a>
      </li>
    </ul>
  </section>
  )
}

export default Portfolio;