import "../styles/style.css";

function TrailerModal({
  movie,
  trailer,
  onClose,
}) {
  if (!movie || !trailer) {
    return null;
  }

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="trailer-modal"
        onClick={(e) => e.stopPropagation()}
      >

        {/* ================================
            CLOSE BUTTON
        ================================= */}

        <button
          className="close-btn"
          onClick={onClose}
          aria-label="Close trailer"
        >
          ✕
        </button>


        {/* ================================
            TRAILER
        ================================= */}

        <div className="trailer-container">

          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title={
              trailer.name ||
              `${movie.title} Trailer`
            }
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>

        </div>


        {/* ================================
            TRAILER INFO
        ================================= */}

        <div className="trailer-info">

          <h2>
            {movie.title}
          </h2>

          <p>
            {trailer.name}
          </p>

        </div>

      </div>
    </div>
  );
}

export default TrailerModal;