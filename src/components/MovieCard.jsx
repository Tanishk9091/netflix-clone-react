import "../styles/style.css";


function MovieCard({
  movie,
  setPopupMovie,
  setPopupPosition,
  hideTimeout,
}) {


  // =====================================================
  // MOUSE ENTER
  // =====================================================

  const handleMouseEnter = (e) => {

    // Cancel previous hide timer
    clearTimeout(
      hideTimeout.current
    );


    const rect =
      e.currentTarget.getBoundingClientRect();


    const popupWidth = 380;
    const popupHeight = 380;


    // Calculate popup horizontal position

    let left =
      rect.left +
      rect.width / 2 -
      popupWidth / 2;


    // Calculate popup vertical position

    let top =
      rect.top -
      popupHeight -
      15;


    // If popup goes above screen,
    // place it below the card

    if (top < 10) {

      top =
        rect.bottom + 15;

    }


    // Prevent popup going outside left

    if (left < 10) {

      left = 10;

    }


    // Prevent popup going outside right

    if (
      left + popupWidth >
      window.innerWidth - 10
    ) {

      left =
        window.innerWidth -
        popupWidth -
        10;

    }


    // Set popup position

    setPopupPosition({
      left,
      top,
    });


    // Show popup

    setPopupMovie(movie);

  };


  // =====================================================
  // MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = () => {

    hideTimeout.current =
      setTimeout(() => {

        setPopupMovie(null);

      }, 200);

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <div
      className="movie-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      <img
        src={movie.image}
        alt={movie.title}
        className="poster"
      />

    </div>

  );

}


export default MovieCard;