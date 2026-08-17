import { useState } from "react";

import "../styles/style.css";

import { getMovieTrailer } from "../api";


function MovieModal({
  movie,
  setSelectedMovie,
  myList,
  toggleMyList,
}) {

  // =====================================================
  // TRAILER STATE
  // =====================================================

  const [trailer, setTrailer] = useState(null);

  const [loadingTrailer, setLoadingTrailer] =
    useState(false);

  const [trailerError, setTrailerError] =
    useState(false);


  // =====================================================
  // NO MOVIE
  // =====================================================

  if (!movie) return null;


  // =====================================================
  // RELEASE YEAR
  // =====================================================

  const releaseYear = movie.releaseDate
    ? movie.releaseDate.substring(0, 4)
    : "N/A";


  // =====================================================
  // CHECK MY LIST
  // =====================================================

  const isInMyList = myList.some(
    (item) => item.id === movie.id
  );


  // =====================================================
  // PLAY TRAILER
  // =====================================================

  const handlePlay = async () => {

    try {

      // Clear previous error
      setTrailerError(false);

      // Show loading
      setLoadingTrailer(true);

      // Fetch trailer
      const trailerData =
        await getMovieTrailer(movie.id);


      // No trailer
      if (!trailerData) {

        setTrailerError(true);

        return;
      }


      // Save trailer
      setTrailer(trailerData);

    } catch (error) {

      console.error(
        "Error loading trailer:",
        error
      );

      setTrailerError(true);

    } finally {

      setLoadingTrailer(false);

    }

  };


  // =====================================================
  // CLOSE TRAILER
  // =====================================================

  const closeTrailer = () => {

    setTrailer(null);

    setTrailerError(false);

  };


  // =====================================================
  // TRAILER VIEW
  // =====================================================

  if (trailer) {

    return (
      <div
        className="modal-overlay"
        onClick={closeTrailer}
      >

        <div
          className="movie-modal trailer-modal"
          onClick={(e) =>
            e.stopPropagation()
          }
        >

          {/* CLOSE */}

          <button
            className="close-btn"
            onClick={closeTrailer}
          >
            ✕
          </button>


          {/* TRAILER */}

          <div
            style={{
              width: "100%",
              aspectRatio: "16 / 9",
              background: "#000",
            }}
          >

            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
              title={trailer.name}
              frameBorder="0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            ></iframe>

          </div>


          {/* TRAILER TITLE */}

          <div
            style={{
              padding: "20px",
              color: "white",
            }}
          >

            <h2>
              {movie.title}
            </h2>

            <p
              style={{
                color: "#aaa",
                marginTop: "8px",
              }}
            >
              {trailer.name}
            </p>

          </div>

        </div>

      </div>
    );

  }


  // =====================================================
  // MOVIE MODAL
  // =====================================================

  return (

    <div
      className="modal-overlay"
      onClick={() =>
        setSelectedMovie(null)
      }
    >

      <div
        className="movie-modal"
        onClick={(e) =>
          e.stopPropagation()
        }
      >

        {/* =================================================
            CLOSE BUTTON
        ================================================= */}

        <button
          className="close-btn"
          onClick={() =>
            setSelectedMovie(null)
          }
          aria-label="Close"
        >
          ✕
        </button>


        {/* =================================================
            BACKDROP
        ================================================= */}

        <div className="modal-hero">

          <img
            src={
              movie.backdrop ||
              movie.image
            }
            alt={movie.title}
            className="modal-banner"
          />

          <div className="modal-gradient"></div>

        </div>


        {/* =================================================
            MODAL CONTENT
        ================================================= */}

        <div className="modal-content">

          {/* TITLE */}

          <h1>
            {movie.title}
          </h1>


          {/* =================================================
              DETAILS
          ================================================= */}

          <div className="modal-details">

            <span className="green">
              {movie.match}
            </span>


            <span className="rating-number">

              ⭐{" "}

              {movie.rating
                ? movie.rating.toFixed(1)
                : "N/A"}

            </span>


            <span>
              {releaseYear}
            </span>


            <span className="tag">
              {movie.age}
            </span>


            <span>
              {movie.time}
            </span>

          </div>


          {/* =================================================
              DESCRIPTION
          ================================================= */}

          <p className="modal-description">
            {movie.description}
          </p>


          {/* =================================================
              GENRES
          ================================================= */}

          <div className="modal-section">

            <h3>
              Genres
            </h3>

            <p>
              {movie.genre}
            </p>

          </div>


          {/* =================================================
              TRAILER ERROR
          ================================================= */}

          {trailerError && (

            <p
              style={{
                color: "#ff4d4d",
                marginTop: "15px",
              }}
            >
              Trailer not available for this movie.
            </p>

          )}


          {/* =================================================
              BUTTONS
          ================================================= */}

          <div className="modal-buttons">

            {/* PLAY */}

            <button
              className="play-btn"
              onClick={handlePlay}
              disabled={loadingTrailer}
            >

              <i className="fa-solid fa-play"></i>

              {loadingTrailer
                ? "Loading..."
                : "Play"}

            </button>


            {/* MY LIST */}

            <button
              className="list-btn"
              onClick={() =>
                toggleMyList(movie)
              }
            >

              <i
                className={
                  isInMyList
                    ? "fa-solid fa-check"
                    : "fa-solid fa-plus"
                }
              ></i>

              {isInMyList
                ? "Added"
                : "My List"}

            </button>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MovieModal;