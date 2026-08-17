import { useEffect, useState } from "react";
import "../styles/style.css";

function Hero({
  movies = [],
  onMoreInfo,
  onPlay,
  loadingPlay,
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // =====================================================
  // HERO HOVER STATE
  // =====================================================

  const [isHovered, setIsHovered] = useState(false);


  // =====================================================
  // AUTO CHANGE HERO
  // =====================================================

  useEffect(() => {
    if (!movies || movies.length === 0) {
      return;
    }

    // Keep index valid when movies change
    setCurrentIndex((current) =>
      current >= movies.length ? 0 : current
    );

    // Don't start the timer while hovering
    if (isHovered) {
      return;
    }

    const interval = setInterval(() => {
      setCurrentIndex((current) => {
        return (current + 1) % movies.length;
      });
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [movies, isHovered]);


  // =====================================================
  // LOADING
  // =====================================================

  if (!movies || movies.length === 0) {
    return (
      <section className="hero">
        <div
          style={{
            position: "absolute",
            left: "5%",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 10,
            fontSize: "24px",
          }}
        >
          Loading...
        </div>
      </section>
    );
  }


  const movie = movies[currentIndex];

  if (!movie) {
    return null;
  }


  // =====================================================
  // RELEASE YEAR
  // =====================================================

  const releaseYear = movie.releaseDate
    ? movie.releaseDate.substring(0, 4)
    : "N/A";


  // =====================================================
  // BACKGROUND
  // =====================================================

  const backgroundImage =
    movie.backdrop || movie.image;


  return (
    <section
      className="hero"
      style={{
        backgroundImage: `
          linear-gradient(
            to right,
            rgba(0, 0, 0, 0.85),
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.65)
          ),
          url("${backgroundImage}")
        `,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      {/* =================================================
          HERO CONTENT
      ================================================= */}

      <div className="content">

        {/* TOP RANKING */}

        <div className="top-ranking">

          <div
            style={{
              background: "#e50914",
              color: "#fff",
              width: "34px",
              height: "34px",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "11px",
              fontWeight: "800",
              textAlign: "center",
              lineHeight: "1",
            }}
          >
            TOP
            <br />
            10
          </div>

          <h2>
            #{currentIndex + 1} in Movies Today
          </h2>

        </div>


        {/* TITLE */}

        <h1
          style={{
            fontSize: "42px",
            fontWeight: "800",
            marginBottom: "18px",
            lineHeight: "1.1",
          }}
        >
          {movie.title}
        </h1>


        {/* DESCRIPTION */}

        <p>
          {movie.description}
        </p>


        {/* DETAILS */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "25px",
            fontSize: "15px",
          }}
        >

          <span
            style={{
              color: "#46d369",
              fontWeight: "700",
            }}
          >
            {movie.match}
          </span>

          <span>
            ⭐{" "}
            {movie.rating
              ? movie.rating.toFixed(1)
              : "N/A"}
          </span>

          <span>
            {releaseYear}
          </span>

          <span
            style={{
              border: "1px solid #aaa",
              padding: "2px 7px",
              fontSize: "12px",
            }}
          >
            {movie.age || "U/A 16+"}
          </span>

        </div>


        {/* =================================================
            BUTTONS
        ================================================= */}

        <div className="buttons">

          <button
            className="hero-play"
            onClick={() => {
              if (onPlay) {
                onPlay(movie);
              }
            }}
            disabled={loadingPlay}
          >
            <i className="fa-solid fa-play"></i>

            {loadingPlay
              ? "Loading..."
              : "Play"}
          </button>


          <button
            className="hero-info"
            onClick={() => {
              if (onMoreInfo) {
                onMoreInfo(movie);
              }
            }}
          >
            <i className="fa-solid fa-circle-info"></i>

            More Info
          </button>

        </div>

      </div>


      {/* =================================================
          AGE RATING
      ================================================= */}

      <div className="rating">
        {movie.age || "U/A 16+"}
      </div>


      {/* =================================================
          SLIDER INDICATORS
      ================================================= */}

      <div
        style={{
          position: "absolute",
          bottom: "35px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "5px",
          zIndex: 30,
        }}
      >

        {movies.slice(0, 5).map((item, index) => (

          <button
            key={item.id}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Show ${item.title}`}
            style={{
              width:
                index === currentIndex
                  ? "25px"
                  : "18px",

              height: "3px",

              padding: 0,

              border: "none",

              background:
                index === currentIndex
                  ? "#fff"
                  : "rgba(255,255,255,0.45)",

              borderRadius: "2px",

              cursor: "pointer",
            }}
          />

        ))}

      </div>

    </section>
  );
}

export default Hero;