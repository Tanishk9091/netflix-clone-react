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

    // Cancel any pending popup hide
    clearTimeout(hideTimeout.current);


    const card = e.currentTarget;

    const rect = card.getBoundingClientRect();


    // Popup dimensions
    const popupWidth = 380;
    const popupHeight = 380;

    const gap = 15;
    const screenPadding = 10;


    // =====================================================
    // HORIZONTAL POSITION
    // =====================================================

    let left =
      rect.left +
      rect.width / 2 -
      popupWidth / 2;


    // Keep popup inside left side
    if (left < screenPadding) {
      left = screenPadding;
    }


    // Keep popup inside right side
    if (
      left + popupWidth >
      window.innerWidth - screenPadding
    ) {

      left =
        window.innerWidth -
        popupWidth -
        screenPadding;

    }


    // =====================================================
    // VERTICAL POSITION
    // =====================================================

    let top =
      rect.top -
      popupHeight -
      gap;


    // If there isn't enough space above,
    // show popup below the card
    if (top < screenPadding) {

      top =
        rect.bottom +
        gap;

    }


    // If popup would go below the viewport,
    // keep it inside the screen
    if (
      top + popupHeight >
      window.innerHeight -
      screenPadding
    ) {

      top =
        window.innerHeight -
        popupHeight -
        screenPadding;

    }


    // =====================================================
    // SET POPUP POSITION
    // =====================================================

    setPopupPosition({
      left,
      top,
    });


    // =====================================================
    // SHOW POPUP
    // =====================================================

    setPopupMovie(movie);

  };


  // =====================================================
  // MOUSE LEAVE
  // =====================================================

  const handleMouseLeave = () => {

    hideTimeout.current =
      setTimeout(() => {

        setPopupMovie(null);

      }, 250);

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
        src={
          movie.image ||
          movie.backdrop ||
          "https://placehold.co/300x450/181818/ffffff?text=No+Image"
        }
        alt={movie.title || "Movie"}
        className="poster"
      />
    </div>

  );

}


export default MovieCard;