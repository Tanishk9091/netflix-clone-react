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
  // UPDATE SCROLL BUTTONS
  // =====================================================

  const updateButtons = () => {

    const row = rowRef.current;

    if (!row) return;


    setCanScrollLeft(
      row.scrollLeft > 5
    );


    setCanScrollRight(
      row.scrollLeft + row.clientWidth <
      row.scrollWidth - 5
    );

  };


  // =====================================================
  // RUN WHEN MOVIES CHANGE
  // =====================================================

  useEffect(() => {

    updateButtons();

  }, [movies]);


  // =====================================================
  // SCROLL LEFT
  // =====================================================

  const scrollLeft = () => {

    const row = rowRef.current;

    if (!row) return;


    row.scrollBy({
      left: -(row.clientWidth - 100),
      behavior: "smooth",
    });


    setTimeout(
      updateButtons,
      400
    );

  };


  // =====================================================
  // SCROLL RIGHT
  // =====================================================

  const scrollRight = () => {

    const row = rowRef.current;

    if (!row) return;


    row.scrollBy({
      left: row.clientWidth - 100,
      behavior: "smooth",
    });


    setTimeout(
      updateButtons,
      400
    );

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div className="movie-section">


      {/* =================================================
          LEFT BUTTON
      ================================================= */}

      {canScrollLeft && (

        <button
          className="row-btn left-btn"
          onClick={scrollLeft}
        >

          <i className="fa-solid fa-chevron-left"></i>

        </button>

      )}


      {/* =================================================
          RIGHT BUTTON
      ================================================= */}

      {canScrollRight && (

        <button
          className="row-btn right-btn"
          onClick={scrollRight}
        >

          <i className="fa-solid fa-chevron-right"></i>

        </button>

      )}


      {/* =================================================
          TITLE
      ================================================= */}

      <h2>
        {title}
      </h2>


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

    </div>

  );
}


export default MovieRow;