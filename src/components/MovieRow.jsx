import "../styles/style.css";

import MovieCard from "./MovieCard";

import {
  useRef,
  useEffect,
  useState,
} from "react";


function MovieRow({
  title,
  movies,
  setPopupMovie,
  setPopupPosition,
  hideTimeout,
  setSelectedMovie,
}) {

  const rowRef = useRef(null);


  const [canScrollLeft, setCanScrollLeft] =
    useState(false);

  const [canScrollRight, setCanScrollRight] =
    useState(false);


  // =====================================================
  // UPDATE ARROW VISIBILITY
  // =====================================================

  const updateButtons = () => {

    const row = rowRef.current;

    if (!row) return;


    const canLeft =
      row.scrollLeft > 5;


    const canRight =
      row.scrollLeft + row.clientWidth <
      row.scrollWidth - 5;


    setCanScrollLeft(canLeft);

    setCanScrollRight(canRight);

  };


  // =====================================================
  // CHECK SCROLL WHEN MOVIES CHANGE
  // =====================================================

  useEffect(() => {

    const row = rowRef.current;

    if (!row) return;


    updateButtons();


    // Check again after images/cards render
    const timer = setTimeout(() => {

      updateButtons();

    }, 300);


    return () => {

      clearTimeout(timer);

    };

  }, [movies]);


  // =====================================================
  // CHECK SCROLL WHEN WINDOW RESIZES
  // =====================================================

  useEffect(() => {

    window.addEventListener(
      "resize",
      updateButtons
    );


    return () => {

      window.removeEventListener(
        "resize",
        updateButtons
      );

    };

  }, []);


  // =====================================================
  // SCROLL LEFT
  // =====================================================

  const scrollLeft = () => {

    const row = rowRef.current;

    if (!row) return;


    row.scrollBy({

      left:
        -(row.clientWidth * 0.8),

      behavior: "smooth",

    });

  };


  // =====================================================
  // SCROLL RIGHT
  // =====================================================

  const scrollRight = () => {

    const row = rowRef.current;

    if (!row) return;


    row.scrollBy({

      left:
        row.clientWidth * 0.8,

      behavior: "smooth",

    });

  };


  // =====================================================
  // NO MOVIES
  // =====================================================

  if (!movies || movies.length === 0) {

    return null;

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <section className="movie-section">


      {/* =================================================
          TITLE
      ================================================= */}

      <div className="movie-row-header">

        <h2>
          {title}
        </h2>

      </div>


      {/* =================================================
          LEFT ARROW
      ================================================= */}

      {canScrollLeft && (

        <button
          className="row-btn left-btn"
          onClick={scrollLeft}
          aria-label={`Scroll ${title} left`}
        >

          <i className="fa-solid fa-chevron-left"></i>

        </button>

      )}


      {/* =================================================
          RIGHT ARROW
      ================================================= */}

      {canScrollRight && (

        <button
          className="row-btn right-btn"
          onClick={scrollRight}
          aria-label={`Scroll ${title} right`}
        >

          <i className="fa-solid fa-chevron-right"></i>

        </button>

      )}


      {/* =================================================
          MOVIE ROW
      ================================================= */}

      <div
        className="movie-row"
        ref={rowRef}
        onScroll={updateButtons}
      >

        {movies.map((movie) => (

          <MovieCard
            key={movie.id}
            movie={movie}
            setPopupMovie={setPopupMovie}
            setPopupPosition={setPopupPosition}
            hideTimeout={hideTimeout}
            setSelectedMovie={setSelectedMovie}
          />

        ))}

      </div>


    </section>

  );

}


export default MovieRow;