import { useState, useRef, useEffect } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import MovieRow from "./components/MovieRow";
import Popup from "./components/Popup";
import MovieModal from "./components/MovieModal";
import TrailerModal from "./components/TrailerModal";
import Login from "./components/Login";
import Signup from "./components/Signup";

import {
  getTrendingMovies,
  getPopularMovies,
  getActionMovies,
  getComedyMovies,
  getMovieDetails,
  getMovieTrailer,
  searchMovies,
} from "./api";


function App() {

  // =====================================================
// AUTHENTICATION
// =====================================================

const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return localStorage.getItem("netflixLoggedIn") === "true";
});

const [showSignup, setShowSignup] = useState(false);

const [currentUser, setCurrentUser] = useState(() => {
  try {
    const savedUser =
      localStorage.getItem("netflixUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;

  } catch (error) {

    console.error(
      "Error loading user:",
      error
    );

    return null;
  }
});

// =====================================================
// LOGIN
// =====================================================

const handleLogin = (user) => {

  localStorage.setItem(
    "netflixLoggedIn",
    "true"
  );

  setCurrentUser(user);

  setIsLoggedIn(true);
};


// =====================================================
// SIGNUP
// =====================================================

const handleSignup = (user) => {

  localStorage.setItem(
    "netflixLoggedIn",
    "true"
  );

  setCurrentUser(user);

  setIsLoggedIn(true);
};


// =====================================================
// LOGOUT
// =====================================================

const handleLogout = () => {

  localStorage.removeItem(
    "netflixLoggedIn"
  );

  setCurrentUser(null);

  setIsLoggedIn(false);

  setShowSignup(false);
};
  // =====================================================
  // SEARCH
  // =====================================================

  const [searchTerm, setSearchTerm] = useState("");

  const [searchResults, setSearchResults] = useState([]);

  const [searchLoading, setSearchLoading] = useState(false);


  // =====================================================
  // POPUP / MOVIE MODAL
  // =====================================================

  const [popupMovie, setPopupMovie] = useState(null);

  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loadingDetails, setLoadingDetails] =
    useState(false);

  const [popupPosition, setPopupPosition] = useState({
    top: 0,
    left: 0,
  });

  const hideTimeout = useRef(null);


  // =====================================================
  // TRAILER
  // =====================================================

  const [heroTrailer, setHeroTrailer] =
    useState(null);

  const [heroTrailerMovie, setHeroTrailerMovie] =
    useState(null);

  const [loadingHeroTrailer, setLoadingHeroTrailer] =
    useState(false);


  // =====================================================
  // MY LIST
  // =====================================================

  const [myList, setMyList] = useState(() => {

    try {

      const savedList =
        localStorage.getItem("myNetflixList");

      return savedList
        ? JSON.parse(savedList)
        : [];

    } catch (error) {

      console.error(
        "Error reading My List:",
        error
      );

      return [];
    }

  });


  // =====================================================
  // SAVE MY LIST TO LOCAL STORAGE
  // =====================================================

  useEffect(() => {

    localStorage.setItem(
      "myNetflixList",
      JSON.stringify(myList)
    );

  }, [myList]);


  // =====================================================
  // MOVIE STATES
  // =====================================================

  const [trendingMovies, setTrendingMovies] =
    useState([]);

  const [popularMovies, setPopularMovies] =
    useState([]);

  const [actionMovies, setActionMovies] =
    useState([]);

  const [comedyMovies, setComedyMovies] =
    useState([]);


  // =====================================================
  // API LOADING / ERROR
  // =====================================================

  const [loadingMovies, setLoadingMovies] =
    useState(true);

  const [movieError, setMovieError] =
    useState(false);


  // =====================================================
  // FETCH MOVIES
  // =====================================================

  useEffect(() => {

    const fetchAllMovies = async () => {

      setLoadingMovies(true);
      setMovieError(false);

      try {

        const results =
          await Promise.allSettled([

            getTrendingMovies(),

            getPopularMovies(),

            getActionMovies(),

            getComedyMovies(),

          ]);


        // =================================================
        // TRENDING
        // =================================================

        if (
          results[0].status === "fulfilled"
        ) {

          setTrendingMovies(
            results[0].value || []
          );

        } else {

          console.error(
            "Trending API failed:",
            results[0].reason
          );

          setTrendingMovies([]);

        }


        // =================================================
        // POPULAR
        // =================================================

        if (
          results[1].status === "fulfilled"
        ) {

          setPopularMovies(
            results[1].value || []
          );

        } else {

          console.error(
            "Popular API failed:",
            results[1].reason
          );

          setPopularMovies([]);

        }


        // =================================================
        // ACTION
        // =================================================

        if (
          results[2].status === "fulfilled"
        ) {

          setActionMovies(
            results[2].value || []
          );

        } else {

          console.error(
            "Action API failed:",
            results[2].reason
          );

          setActionMovies([]);

        }


        // =================================================
        // COMEDY
        // =================================================

        if (
          results[3].status === "fulfilled"
        ) {

          setComedyMovies(
            results[3].value || []
          );

        } else {

          console.error(
            "Comedy API failed:",
            results[3].reason
          );

          setComedyMovies([]);

        }


        // =================================================
        // CHECK IF ALL FAILED
        // =================================================

        const allFailed =
          results.every(
            (result) =>
              result.status === "rejected"
          );


        if (allFailed) {

          setMovieError(true);

        }

      } catch (error) {

        console.error(
          "Error fetching movies:",
          error
        );

        setMovieError(true);

      } finally {

        setLoadingMovies(false);

      }

    };


    fetchAllMovies();

  }, []);


  // =====================================================
  // TMDB SEARCH
  // =====================================================

  useEffect(() => {

    const query = searchTerm.trim();


    // Empty search
    if (!query) {

      setSearchResults([]);

      setSearchLoading(false);

      return;
    }


    // Wait 500ms after user stops typing
    const timer = setTimeout(async () => {

      try {

        setSearchLoading(true);

        const results =
          await searchMovies(query);

        setSearchResults(
          results || []
        );

      } catch (error) {

        console.error(
          "Search failed:",
          error
        );

        setSearchResults([]);

      } finally {

        setSearchLoading(false);

      }

    }, 500);


    return () => clearTimeout(timer);

  }, [searchTerm]);


  // =====================================================
  // OPEN MOVIE DETAILS
  // =====================================================

  const handleSelectMovie =
    async (movie) => {

      if (!movie || !movie.id) {

        console.error(
          "Invalid movie:",
          movie
        );

        return;
      }


      try {

        // Close popup
        setPopupMovie(null);

        // Show loading
        setLoadingDetails(true);


        // Fetch details
        const details =
          await getMovieDetails(
            movie.id
          );


        // Open modal
        setSelectedMovie(details);

      } catch (error) {

        console.error(
          "Error fetching movie details:",
          error
        );

      } finally {

        setLoadingDetails(false);

      }

    };


  // =====================================================
  // PLAY MOVIE TRAILER
  // =====================================================

  const handlePlayMovie =
    async (movie) => {

      if (!movie || !movie.id) {

        console.error(
          "Invalid movie:",
          movie
        );

        return;
      }


      try {

        // Show loading
        setLoadingHeroTrailer(true);


        // Fetch trailer
        const trailer =
          await getMovieTrailer(
            movie.id
          );


        // No trailer
        if (!trailer) {

          alert(
            "Trailer not available for this movie."
          );

          return;
        }


        // Save trailer
        setHeroTrailer(trailer);

        // Save movie
        setHeroTrailerMovie(movie);

      } catch (error) {

        console.error(
          "Trailer error:",
          error
        );

        alert(
          "Trailer not available for this movie."
        );

      } finally {

        setLoadingHeroTrailer(false);

      }

    };


  // =====================================================
  // ADD / REMOVE MOVIE FROM MY LIST
  // =====================================================

  const toggleMyList =
    (movie) => {

      if (!movie || !movie.id) {
        return;
      }


      setMyList(
        (currentList) => {

          const alreadyExists =
            currentList.some(
              (item) =>
                item.id === movie.id
            );


          // REMOVE
          if (alreadyExists) {

            return currentList.filter(
              (item) =>
                item.id !== movie.id
            );

          }


          // ADD
          return [
            ...currentList,
            movie,
          ];

        }
      );

    };


  // =====================================================
  // LOCAL SEARCH
  // =====================================================

  const search =
    searchTerm
      .trim()
      .toLowerCase();


  // =====================================================
  // FILTER MOVIES
  // =====================================================

  const filteredTrending =
    trendingMovies.filter(
      (movie) =>
        movie.title
          .toLowerCase()
          .includes(search)
    );


  const filteredPopular =
    popularMovies.filter(
      (movie) =>
        movie.title
          .toLowerCase()
          .includes(search)
    );


  const filteredAction =
    actionMovies.filter(
      (movie) =>
        movie.title
          .toLowerCase()
          .includes(search)
    );


  const filteredComedy =
    comedyMovies.filter(
      (movie) =>
        movie.title
          .toLowerCase()
          .includes(search)
    );


  // =====================================================
  // FILTER MY LIST
  // =====================================================

  const filteredMyList =
    myList.filter(
      (movie) =>
        movie.title
          .toLowerCase()
          .includes(search)
    );


  // =====================================================
  // AUTHENTICATION SCREEN
  // =====================================================

  if (!isLoggedIn) {

    if (showSignup) {

      return (
        <Signup
          onSignup={handleSignup}
          onShowLogin={() => setShowSignup(false)}
        />
      );

    }

    return (
      <Login
        onLogin={handleLogin}
        onShowSignup={() => setShowSignup(true)}
      />
    );

  }


  // =====================================================
  // UI
  // =====================================================

  return (

    <>

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        myList={myList}
        currentUser={currentUser}
        onLogout={handleLogout}
      />


      {/* =================================================
          HERO
      ================================================= */}

      {!search && (

        <Hero
          movies={trendingMovies}
          onMoreInfo={handleSelectMovie}

          // IMPORTANT
          // Hero Play button now uses trailer function
          onPlay={handlePlayMovie}

          loadingPlay={loadingHeroTrailer}
        />

      )}


      {/* =================================================
          MOVIES
      ================================================= */}

      <section
        className="movies"
        id="movies-section"
      >

        <div className="movies-container">


          {/* =================================================
              SEARCH RESULTS
          ================================================= */}

          {search && (

            <div className="search-results-section">

              <h2>
                Search results for "{searchTerm}"
              </h2>


              {/* SEARCH LOADING */}

              {searchLoading && (

                <div
                  style={{
                    color: "white",
                    padding: "30px 0",
                    fontSize: "18px",
                  }}
                >
                  Searching...
                </div>

              )}


              {/* SEARCH RESULTS */}

              {!searchLoading &&
                searchResults.length > 0 && (

                  <MovieRow
                    title=""
                    movies={searchResults}

                    setPopupMovie={
                      setPopupMovie
                    }

                    setPopupPosition={
                      setPopupPosition
                    }

                    hideTimeout={
                      hideTimeout
                    }

                    setSelectedMovie={
                      handleSelectMovie
                    }
                  />

                )}


              {/* NO SEARCH RESULTS */}

              {!searchLoading &&
                searchResults.length === 0 && (

                  <div
                    style={{
                      color: "#aaa",
                      padding: "30px 0",
                      fontSize: "18px",
                    }}
                  >
                    No movies found for "{searchTerm}"
                  </div>

                )}

            </div>

          )}


          {/* =================================================
              LOADING MOVIES
          ================================================= */}

          {!search &&
            loadingMovies && (

              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  padding: "40px",
                  fontSize: "20px",
                }}
              >
                Loading movies...
              </div>

            )}


          {/* =================================================
              API ERROR
          ================================================= */}

          {!search &&
            !loadingMovies &&
            movieError && (

              <div
                style={{
                  color: "#ff4d4d",
                  textAlign: "center",
                  padding: "40px",
                  fontSize: "20px",
                }}
              >
                Failed to load movies.
                <br />
                Please check your TMDB API key.
              </div>

            )}


          {/* =================================================
              TRENDING
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredTrending.length > 0 && (

              <MovieRow
                title="Trending Now"
                movies={filteredTrending}

                setPopupMovie={
                  setPopupMovie
                }

                setPopupPosition={
                  setPopupPosition
                }

                hideTimeout={
                  hideTimeout
                }

                setSelectedMovie={
                  handleSelectMovie
                }
              />

            )}


          {/* =================================================
              POPULAR
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredPopular.length > 0 && (

              <MovieRow
                title="Popular on Netflix"
                movies={filteredPopular}

                setPopupMovie={
                  setPopupMovie
                }

                setPopupPosition={
                  setPopupPosition
                }

                hideTimeout={
                  hideTimeout
                }

                setSelectedMovie={
                  handleSelectMovie
                }
              />

            )}


          {/* =================================================
              ACTION
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredAction.length > 0 && (

              <MovieRow
                title="Action Movies"
                movies={filteredAction}

                setPopupMovie={
                  setPopupMovie
                }

                setPopupPosition={
                  setPopupPosition
                }

                hideTimeout={
                  hideTimeout
                }

                setSelectedMovie={
                  handleSelectMovie
                }
              />

            )}


          {/* =================================================
              COMEDY
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredComedy.length > 0 && (

              <MovieRow
                title="Comedy Movies"
                movies={filteredComedy}

                setPopupMovie={
                  setPopupMovie
                }

                setPopupPosition={
                  setPopupPosition
                }

                hideTimeout={
                  hideTimeout
                }

                setSelectedMovie={
                  handleSelectMovie
                }
              />

            )}


          {/* =================================================
              MY LIST
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredMyList.length > 0 && (

              <div
                id="my-list-section"
              >

                <MovieRow
                  title="My List"
                  movies={filteredMyList}

                  setPopupMovie={
                    setPopupMovie
                  }

                  setPopupPosition={
                    setPopupPosition
                  }

                  hideTimeout={
                    hideTimeout
                  }

                  setSelectedMovie={
                    handleSelectMovie
                  }
                />

              </div>

            )}

        </div>

      </section>


      {/* =================================================
          MOVIE MODAL
      ================================================= */}

      <MovieModal
        movie={selectedMovie}

        setSelectedMovie={
          setSelectedMovie
        }

        myList={myList}

        toggleMyList={
          toggleMyList
        }

        // ⭐ NEW
        handlePlayMovie={
          handlePlayMovie
        }
      />


      {/* =================================================
          POPUP
      ================================================= */}

      <Popup
  movie={popupMovie}

  position={popupPosition}

  setPopupMovie={
    setPopupMovie
  }

  hideTimeout={
    hideTimeout
  }

  setSelectedMovie={
    handleSelectMovie
  }

  // Play trailer
  onPlay={
    handlePlayMovie
  }

  // My List
  myList={
    myList
  }

  setMyList={
    setMyList
  }
/>


      {/* =================================================
          TRAILER MODAL
      ================================================= */}

      <TrailerModal
        movie={heroTrailerMovie}

        trailer={heroTrailer}

        onClose={() => {

          setHeroTrailer(null);

          setHeroTrailerMovie(null);

        }}
      />


      {/* =================================================
          DETAILS LOADING
      ================================================= */}

      {loadingDetails && (

        <div className="modal-overlay">

          <div
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            Loading movie details...
          </div>

        </div>

      )}

    </>

  );

}


export default App;