import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <main className="main">
      <section className="page-not-found">
        <h1 className="page-not-found__title">404</h1>
        <p className="page-not-found__subtitle">Страница не найдена</p>
        <button onClick={ () => navigate(-1) } className='page-not-found__link'>Назад</button>
      </section>
    </main>
  );
}

export default PageNotFound;