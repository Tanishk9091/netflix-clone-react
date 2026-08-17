import { useEffect, useState } from "react";
import "../styles/style.css";


function Popup({
  movie,
  position,
  setPopupMovie,
  hideTimeout,
  setSelectedMovie,
  onPlay,
  myList = [],
  setMyList,
}) {

  // =====================================================
  // LIKE STATE
  // =====================================================

  const [liked, setLiked] = useState(false);


  // =====================================================
  // CHECK LIKE STATUS
  // =====================================================

  useEffect(() => {

    if (!movie) return;


    const savedLikes =
      JSON.parse(
        localStorage.getItem("likedMovies") || "[]"
      );


    const alreadyLiked =
      savedLikes.some(
        (item) => item.id === movie.id
      );


    setLiked(alreadyLiked);

  }, [movie]);


  // =====================================================
  // PLAY TRAILER
  // =====================================================

  const handlePlay = () => {

    clearTimeout(
      hideTimeout.current
    );


    setPopupMovie(null);


    if (onPlay) {

      onPlay(movie);

    }

  };


  // =====================================================
  // MY LIST
  // =====================================================

  const handleMyList = () => {

    if (!movie) return;


    const alreadyExists =
      myList.some(
        (item) => item.id === movie.id
      );


    let updatedList;


    // REMOVE
    if (alreadyExists) {

      updatedList =
        myList.filter(
          (item) => item.id !== movie.id
        );

    }

    // ADD
    else {

      updatedList = [
        ...myList,
        movie,
      ];

    }


    if (setMyList) {

      setMyList(updatedList);

    }


    localStorage.setItem(
      "myNetflixList",
      JSON.stringify(updatedList)
    );

  };


  // =====================================================
  // LIKE
  // =====================================================

  const handleLike = () => {

    if (!movie) return;


    const savedLikes =
      JSON.parse(
        localStorage.getItem("likedMovies") || "[]"
      );


    const alreadyLiked =
      savedLikes.some(
        (item) => item.id === movie.id
      );


    let updatedLikes;


    // UNLIKE
    if (alreadyLiked) {

      updatedLikes =
        savedLikes.filter(
          (item) => item.id !== movie.id
        );


      setLiked(false);

    }

    // LIKE
    else {

      updatedLikes = [
        ...savedLikes,
        movie,
      ];


      setLiked(true);

    }


    localStorage.setItem(
      "likedMovies",
      JSON.stringify(updatedLikes)
    );

  };


  // =====================================================
  // MORE INFO
  // =====================================================

  const handleMoreInfo = () => {

    clearTimeout(
      hideTimeout.current
    );


    setPopupMovie(null);


    setSelectedMovie(movie);

  };


  // =====================================================
  // POPUP MOUSE ENTER
  // =====================================================

  const handleMouseEnter = () => {

    clearTimeout(
      hideTimeout.current
    );

  };


  // =====================================================
  // POPUP MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = () => {

    hideTimeout.current =
      setTimeout(() => {

        setPopupMovie(null);

      }, 250);

  };


  // =====================================================
  // NO MOVIE
  // =====================================================

  if (!movie) {

    return null;

  }


  // =====================================================
  // MY LIST STATUS
  // =====================================================

  const isInMyList =
    myList.some(
      (item) => item.id === movie.id
    );


  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="movie-popup show"

      style={{
        position: "fixed",
        left: `${position.left}px`,
        top: `${position.top}px`,
      }}

      onMouseEnter={
        handleMouseEnter
      }

      onMouseLeave={
        handleMouseLeave
      }
    >


      {/* =================================================
          IMAGE
      ================================================= */}

      <div className="popup-media">

        <img
          src={
            movie.backdrop ||
            movie.image
          }

          alt={movie.title}

          className="popup-image"
        />

      </div>


      {/* =================================================
          BODY
      ================================================= */}

      <div className="popup-body">


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="popup-buttons">


          {/* =================================================
              PLAY
          ================================================= */}

          <button
            className="circle play-circle"

            title="Play Trailer"

            onClick={
              handlePlay
            }
          >

            <i className="fa-solid fa-play"></i>

          </button>


          {/* =================================================
              MY LIST
          ================================================= */}

          <button
            className={
              `circle ${
                isInMyList
                  ? "active-list-button"
                  : ""
              }`
            }

            title={
              isInMyList
                ? "Remove from My List"
                : "Add to My List"
            }

            onClick={
              handleMyList
            }
          >

            <i
              className={
                isInMyList
                  ? "fa-solid fa-check"
                  : "fa-solid fa-plus"
              }
            ></i>

          </button>


          {/* =================================================
              LIKE
          ================================================= */}

          <button
            className={
              `circle ${
                liked
                  ? "liked-button"
                  : ""
              }`
            }

            title={
              liked
                ? "Unlike"
                : "Like"
            }

            onClick={
              handleLike
            }
          >

            <i
              className={
                liked
                  ? "fa-solid fa-thumbs-up"
                  : "fa-regular fa-thumbs-up"
              }
            ></i>

          </button>


          {/* =================================================
              MORE INFO
          ================================================= */}

          <button
            className="circle more-btn"

            title="More Info"

            onClick={
              handleMoreInfo
            }
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
            DETAILS
        ================================================= */}

        <div className="popup-details">

          <span className="green">
            {movie.match}
          </span>


          <span>
            ⭐{" "}
            {movie.rating
              ? movie.rating.toFixed(1)
              : "N/A"}
          </span>


          <span className="tag">
            {movie.age || "U/A 16+"}
          </span>


          <span>
            {movie.time || "2h"}
          </span>

        </div>


        {/* =================================================
            GENRE
        ================================================= */}

        <p>
          {movie.genre || "Movies"}
        </p>


      </div>

    </div>

  );

}


export default Popup;