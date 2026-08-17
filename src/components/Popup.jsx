import "../styles/style.css";

function Popup({
  movie,
  position,
  setPopupMovie,
  hideTimeout,
  setSelectedMovie,
}) {
  if (!movie) return null;

  const handleMoreInfo = () => {
    clearTimeout(hideTimeout.current);

    setPopupMovie(null);
    setSelectedMovie(movie);
  };

  const handleMouseEnter = () => {
    clearTimeout(hideTimeout.current);
  };

  const handleMouseLeave = () => {
    hideTimeout.current = setTimeout(() => {
      setPopupMovie(null);
    }, 200);
  };

  return (
    <div
      className="movie-popup show"
      style={{
        position: "fixed",
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* =================================================
          MOVIE IMAGE
      ================================================= */}

      <div className="popup-media">

        <img
          src={movie.backdrop || movie.image}
          alt={movie.title}
          className="popup-image"
        />

      </div>


      {/* =================================================
          POPUP BODY
      ================================================= */}

      <div className="popup-body">


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="popup-buttons">

          {/* PLAY */}
          <button
            className="circle play-circle"
            title="Play"
          >
            <i className="fa-solid fa-play"></i>
          </button>


          {/* MY LIST */}
          <button
            className="circle"
            title="Add to My List"
          >
            <i className="fa-solid fa-plus"></i>
          </button>


          {/* LIKE */}
          <button
            className="circle"
            title="Like"
          >
            <i className="fa-regular fa-thumbs-up"></i>
          </button>


          {/* MORE INFO */}
          <button
            className="circle more-btn"
            title="More Info"
            onClick={handleMoreInfo}
          >
            <i className="fa-solid fa-chevron-down"></i>
          </button>

        </div>


        {/* =================================================
            TITLE
        ================================================= */}

        <h3>
          {movie.title}
        </h3>


        {/* =================================================
            MOVIE DETAILS
        ================================================= */}

        <div className="popup-details">

          {/* MATCH */}
          <span className="green">
            {movie.match}
          </span>


          {/* AGE */}
          <span className="tag">
            {movie.age}
          </span>


          {/* TIME */}
          <span>
            {movie.time}
          </span>

        </div>


        {/* =================================================
            GENRE
        ================================================= */}

        <p>
          {movie.genre}
        </p>


      </div>

    </div>
  );
}

export default Popup;