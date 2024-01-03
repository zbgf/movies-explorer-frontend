import React from 'react'

function Preloader(props) {
  return (
    <div className={`preloader ${props.isPreloaderVisible ? 'preloader__active':''}`}>
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  )
};

export default Preloader
