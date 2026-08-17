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
  getMoviesByLanguage,

  getTrendingShows,
  getPopularShows,
  getTopRatedShows,
  getOnTheAirShows,
  getActionAdventureShows,
  getComedyShows,
  getDramaShows,
  getShowDetails,
  getShowTrailer,
} from "./api";


function App() {

  // =====================================================
  // AUTHENTICATION
  // =====================================================

  const [isLoggedIn, setIsLoggedIn] =
    useState(() => {

      return (
        localStorage.getItem(
          "netflixLoggedIn"
        ) === "true"
      );

    });


  const [showSignup, setShowSignup] =
    useState(false);


  const [currentUser, setCurrentUser] =
    useState(() => {

      try {

        const savedUser =
          localStorage.getItem(
            "netflixUser"
          );

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

  const [searchTerm, setSearchTerm] =
    useState("");


  const [searchResults, setSearchResults] =
    useState([]);


  const [searchLoading, setSearchLoading] =
    useState(false);


  // =====================================================
  // POPUP / DETAILS
  // =====================================================

  const [popupMovie, setPopupMovie] =
    useState(null);


  const [selectedMovie, setSelectedMovie] =
    useState(null);


  const [loadingDetails, setLoadingDetails] =
    useState(false);


  const [popupPosition, setPopupPosition] =
    useState({

      top: 0,

      left: 0,

    });


  const hideTimeout =
    useRef(null);


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

  const [myList, setMyList] =
    useState(() => {

      try {

        const savedList =
          localStorage.getItem(
            "myNetflixList"
          );

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
  // SAVE MY LIST
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
  // TV SHOW STATES
  // =====================================================

  const [trendingShows, setTrendingShows] =
    useState([]);


  const [popularShows, setPopularShows] =
    useState([]);


  const [topRatedShows, setTopRatedShows] =
    useState([]);


  const [onTheAirShows, setOnTheAirShows] =
    useState([]);


  const [
    actionAdventureShows,
    setActionAdventureShows
  ] = useState([]);


  const [comedyShows, setComedyShows] =
    useState([]);


  const [dramaShows, setDramaShows] =
    useState([]);


    const [selectedLanguage, setSelectedLanguage] =
  useState(null);

    const [languageMovies, setLanguageMovies] =
      useState([]);

    const [loadingLanguageMovies, setLoadingLanguageMovies] =
      useState(false);
  // =====================================================
  // LOADING / ERROR
  // =====================================================

  const [loadingMovies, setLoadingMovies] =
    useState(true);


  const [movieError, setMovieError] =
    useState(false);


  const [loadingShows, setLoadingShows] =
    useState(true);


  const [showError, setShowError] =
    useState(false);


  // =====================================================
  // FETCH MOVIES
  // =====================================================

  useEffect(() => {

    const fetchAllMovies =
      async () => {

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


          // TRENDING

          if (
            results[0].status ===
            "fulfilled"
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


          // POPULAR

          if (
            results[1].status ===
            "fulfilled"
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


          // ACTION

          if (
            results[2].status ===
            "fulfilled"
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


          // COMEDY

          if (
            results[3].status ===
            "fulfilled"
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


          const allFailed =
            results.every(
              (result) =>
                result.status ===
                "rejected"
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
  // FETCH TV SHOWS
  // =====================================================

  useEffect(() => {

    const fetchAllShows =
      async () => {

        setLoadingShows(true);

        setShowError(false);


        try {

          const results =
            await Promise.allSettled([

              getTrendingShows(),

              getPopularShows(),

              getTopRatedShows(),

              getOnTheAirShows(),

              getActionAdventureShows(),

              getComedyShows(),

              getDramaShows(),

            ]);


          // TRENDING

          if (
            results[0].status ===
            "fulfilled"
          ) {

            setTrendingShows(
              results[0].value || []
            );

          } else {

            console.error(
              "Trending shows failed:",
              results[0].reason
            );

            setTrendingShows([]);

          }


          // POPULAR

          if (
            results[1].status ===
            "fulfilled"
          ) {

            setPopularShows(
              results[1].value || []
            );

          } else {

            console.error(
              "Popular shows failed:",
              results[1].reason
            );

            setPopularShows([]);

          }


          // TOP RATED

          if (
            results[2].status ===
            "fulfilled"
          ) {

            setTopRatedShows(
              results[2].value || []
            );

          } else {

            console.error(
              "Top rated shows failed:",
              results[2].reason
            );

            setTopRatedShows([]);

          }


          // ON THE AIR

          if (
            results[3].status ===
            "fulfilled"
          ) {

            setOnTheAirShows(
              results[3].value || []
            );

          } else {

            console.error(
              "On the air shows failed:",
              results[3].reason
            );

            setOnTheAirShows([]);

          }


          // ACTION & ADVENTURE

          if (
            results[4].status ===
            "fulfilled"
          ) {

            setActionAdventureShows(
              results[4].value || []
            );

          } else {

            console.error(
              "Action & Adventure shows failed:",
              results[4].reason
            );

            setActionAdventureShows([]);

          }


          // COMEDY

          if (
            results[5].status ===
            "fulfilled"
          ) {

            setComedyShows(
              results[5].value || []
            );

          } else {

            console.error(
              "Comedy shows failed:",
              results[5].reason
            );

            setComedyShows([]);

          }


          // DRAMA

          if (
            results[6].status ===
            "fulfilled"
          ) {

            setDramaShows(
              results[6].value || []
            );

          } else {

            console.error(
              "Drama shows failed:",
              results[6].reason
            );

            setDramaShows([]);

          }


          const allFailed =
            results.every(
              (result) =>
                result.status ===
                "rejected"
            );


          if (allFailed) {

            setShowError(true);

          }

        } catch (error) {

          console.error(
            "Error fetching TV shows:",
            error
          );

          setShowError(true);

        } finally {

          setLoadingShows(false);

        }

      };


    fetchAllShows();

  }, []);


  // =====================================================
  // SEARCH
  // =====================================================

  useEffect(() => {

    const query =
      searchTerm.trim();


    if (!query) {

      setSearchResults([]);

      setSearchLoading(false);

      return;

    }


    const timer =
      setTimeout(
        async () => {

          try {

            setSearchLoading(true);


            const results =
              await searchMovies(
                query
              );


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

        },
        500
      );


    return () =>
      clearTimeout(timer);

  }, [searchTerm]);


  // =====================================================
// OPEN MOVIE / SHOW DETAILS
// =====================================================

const handleSelectMovie = async (media) => {

  if (!media || !media.id) {

    console.error(
      "Invalid media:",
      media
    );

    return;
  }


  try {

    setPopupMovie(null);

    setLoadingDetails(true);


    let details;


    // =================================================
    // DETECT TV SHOW
    // =================================================

    const isTVShow =
      media.mediaType === "tv" ||
      media.type === "tv" ||
      Boolean(media.first_air_date);


    // =================================================
    // GET DETAILS
    // =================================================

    if (isTVShow) {

      details =
        await getShowDetails(
          media.id
        );


      // IMPORTANT:
      // Preserve media type after fetching details

      details = {
        ...details,
        mediaType: "tv",
      };

    }

    else {

      details =
        await getMovieDetails(
          media.id
        );


      // IMPORTANT:
      // Preserve media type

      details = {
        ...details,
        mediaType: "movie",
      };

    }


    console.log(
      "Selected:",
      details
    );


    setSelectedMovie(
      details
    );


  } catch (error) {

    console.error(
      "Error fetching details:",
      error
    );


  } finally {

    setLoadingDetails(false);

  }

};
// =====================================================
// PLAY MOVIE / SHOW TRAILER
// =====================================================

const handlePlayMovie = async (media) => {

  if (!media || !media.id) {

    console.error(
      "Invalid media:",
      media
    );

    return;
  }


  try {

    setLoadingHeroTrailer(true);


    // =================================================
    // DETECT MOVIE OR TV SHOW
    // =================================================

    const isTVShow =
      media.mediaType === "tv" ||
      media.type === "tv" ||
      Boolean(media.first_air_date);


    console.log(
      "Playing:",
      media.title ||
      media.name,
      "| Type:",
      isTVShow ? "TV SHOW" : "MOVIE"
    );


    let trailer;


    // =================================================
    // TV SHOW TRAILER
    // =================================================

    if (isTVShow) {

      trailer =
        await getShowTrailer(
          media.id
        );

    }

    // =================================================
    // MOVIE TRAILER
    // =================================================

    else {

      trailer =
        await getMovieTrailer(
          media.id
        );

    }


    // =================================================
    // TRAILER NOT FOUND
    // =================================================

    if (!trailer) {

      alert(
        "Trailer not available for this title."
      );

      return;
    }


    // =================================================
    // OPEN TRAILER
    // =================================================

    setHeroTrailer(
      trailer
    );

    setHeroTrailerMovie(
      media
    );


  } catch (error) {

    console.error(
      "Trailer error:",
      error
    );

    alert(
      "Trailer not available for this title."
    );


  } finally {

    setLoadingHeroTrailer(
      false
    );

  }

};
  // =====================================================
  // ADD / REMOVE FROM MY LIST
  // =====================================================

  const toggleMyList =
    (media) => {

      if (
        !media ||
        !media.id
      ) {

        return;

      }


      setMyList(
        (currentList) => {

          const alreadyExists =
            currentList.some(
              (item) =>
                item.id ===
                media.id
            );


          if (alreadyExists) {

            return currentList.filter(
              (item) =>
                item.id !==
                media.id
            );

          }


          return [
            ...currentList,
            media,
          ];

        }
      );

    };

// =====================================================
// LANGUAGE SELECTION
// =====================================================

const handleLanguageSelect = async (
  languageCode,
  languageName
) => {

  try {

    console.log(
      "Selected language:",
      languageName,
      languageCode
    );

    setSelectedLanguage({
      code: languageCode,
      name: languageName,
    });

    setLoadingLanguageMovies(true);

    const results =
      await getMoviesByLanguage(
        languageCode
      );

    setLanguageMovies(
      results || []
    );

    // Scroll to language section

    setTimeout(() => {

      const section =
        document.getElementById(
          "languages-section"
        );

      if (section) {

        section.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

      }

    }, 100);

  } catch (error) {

    console.error(
      "Language movies failed:",
      error
    );

    setLanguageMovies([]);

  } finally {

    setLoadingLanguageMovies(false);

  }

};
  // =====================================================
  // SHOWS NAVIGATION
  // =====================================================

  const handleShows = (e) => {

    if (e) {

      e.preventDefault();

    }


    const showsSection =
      document.getElementById(
        "shows-section"
      );


    if (showsSection) {

      showsSection.scrollIntoView({

        behavior: "smooth",

        block: "start",

      });

    }

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

          onSignup={
            handleSignup
          }

          onShowLogin={() =>
            setShowSignup(false)
          }

        />

      );

    }


    return (

      <Login

        onLogin={
          handleLogin
        }

        onShowSignup={() =>
          setShowSignup(true)
        }

      />

    );

  }


  // =====================================================
  // MAIN UI
  // =====================================================

  return (

    <>


      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar

        searchTerm={
          searchTerm
        }

        setSearchTerm={
          setSearchTerm
        }

        myList={
          myList
        }

        currentUser={
          currentUser
        }

        onLogout={
          handleLogout
        }

        onShows={
          handleShows
        }

        onLanguageSelect={
          handleLanguageSelect
        }

      />


      {/* =================================================
          HERO
      ================================================= */}

      {!search && (

        <Hero

          movies={
            trendingMovies
          }

          onMoreInfo={
            handleSelectMovie
          }

          onPlay={
            handlePlayMovie
          }

          loadingPlay={
            loadingHeroTrailer
          }

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

            <div
              className=
                "search-results-section"
            >

              <h2>

                Search results for "
                {searchTerm}"

              </h2>


              {searchLoading && (

                <div

                  style={{

                    color: "white",

                    padding:
                      "30px 0",

                    fontSize:
                      "18px",

                  }}

                >

                  Searching...

                </div>

              )}


              {!searchLoading &&
                searchResults.length >
                0 && (

                  <MovieRow

                    title=""

                    movies={
                      searchResults
                    }

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


              {!searchLoading &&
                searchResults.length ===
                0 && (

                  <div

                    style={{

                      color: "#aaa",

                      padding:
                        "30px 0",

                      fontSize:
                        "18px",

                    }}

                  >

                    No movies found for "
                    {searchTerm}"

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

                  textAlign:
                    "center",

                  padding:
                    "40px",

                  fontSize:
                    "20px",

                }}

              >

                Loading movies...

              </div>

            )}


          {/* =================================================
              MOVIE ERROR
          ================================================= */}

          {!search &&
            !loadingMovies &&
            movieError && (

              <div

                style={{

                  color: "#ff4d4d",

                  textAlign:
                    "center",

                  padding:
                    "40px",

                  fontSize:
                    "20px",

                }}

              >

                Failed to load movies.

                <br />

                Please check your
                TMDB API key.

              </div>

            )}


          {/* =================================================
              TRENDING MOVIES
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredTrending.length >
            0 && (

              <MovieRow

                title="Trending Now"

                movies={
                  filteredTrending
                }

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
              POPULAR MOVIES
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredPopular.length >
            0 && (

              <MovieRow

                title="Popular on Netflix"

                movies={
                  filteredPopular
                }

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
              ACTION MOVIES
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredAction.length >
            0 && (

              <MovieRow

                title="Action Movies"

                movies={
                  filteredAction
                }

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
              COMEDY MOVIES
          ================================================= */}

          {!search &&
            !loadingMovies &&
            filteredComedy.length >
            0 && (

              <MovieRow

                title="Comedy Movies"

                movies={
                  filteredComedy
                }

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
            filteredMyList.length >
            0 && (

              <div
                id="my-list-section"
              >

                <MovieRow

                  title="My List"

                  movies={
                    filteredMyList
                  }

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


      {/* =====================================================
          LANGUAGE MOVIES
      ===================================================== */}

      {selectedLanguage && (

        <section
          id="languages-section"
          className="languages-section"
        >

          <div className="movies-container">

            <div className="shows-heading">

              <h1>
                {selectedLanguage.name} Movies
              </h1>

              <p>
                Popular movies in{" "}
                {selectedLanguage.name}
              </p>

            </div>


            {loadingLanguageMovies && (

              <div
                style={{
                  color: "white",
                  textAlign: "center",
                  padding: "40px",
                  fontSize: "20px",
                }}
              >
                Loading{" "}
                {selectedLanguage.name}
                movies...
              </div>

            )}


            {!loadingLanguageMovies &&
              languageMovies.length > 0 && (

                <MovieRow
                  title={`Popular ${selectedLanguage.name} Movies`}
                  movies={languageMovies}
                  setPopupMovie={setPopupMovie}
                  setPopupPosition={setPopupPosition}
                  hideTimeout={hideTimeout}
                  setSelectedMovie={
                    handleSelectMovie
                  }
                />

              )}


            {!loadingLanguageMovies &&
              languageMovies.length === 0 && (

                <div
                  style={{
                    color: "#aaa",
                    padding: "40px 0",
                    fontSize: "18px",
                  }}
                >
                  No movies found in{" "}
                  {selectedLanguage.name}.
                </div>

              )}

          </div>

        </section>

      )}


      {/* =====================================================
          TV SHOWS
      ===================================================== */}

      <section

        id="shows-section"

        className="shows-section"

      >

        <div
          className=
            "movies-container"
        >


          {/* SHOWS HEADER */}

          <div
            className=
              "shows-heading"
          >

            <h1>
              TV Shows
            </h1>

            <p>
              Explore trending,
              popular and top-rated
              TV shows.
            </p>

          </div>


          {/* =================================================
              LOADING SHOWS
          ================================================= */}

          {loadingShows && (

            <div

              style={{

                color: "white",

                textAlign:
                  "center",

                padding:
                  "40px",

                fontSize:
                  "20px",

              }}

            >

              Loading TV shows...

            </div>

          )}


          {/* =================================================
              SHOW ERROR
          ================================================= */}

          {!loadingShows &&
            showError && (

              <div

                style={{

                  color:
                    "#ff4d4d",

                  textAlign:
                    "center",

                  padding:
                    "40px",

                  fontSize:
                    "20px",

                }}

              >

                Failed to load
                TV shows.

                <br />

                Please check your
                TMDB API key.

              </div>

            )}


          {/* =================================================
              TRENDING TV SHOWS
          ================================================= */}

          {!loadingShows &&
            trendingShows.length >
            0 && (

              <MovieRow

                title=
                  "Trending TV Shows"

                movies={
                  trendingShows
                }

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
              POPULAR TV SHOWS
          ================================================= */}

          {!loadingShows &&
            popularShows.length >
            0 && (

              <MovieRow

                title=
                  "Popular TV Shows"

                movies={
                  popularShows
                }

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
              TOP RATED
          ================================================= */}

          {!loadingShows &&
            topRatedShows.length >
            0 && (

              <MovieRow

                title=
                  "Top Rated TV Shows"

                movies={
                  topRatedShows
                }

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
              CURRENTLY AIRING
          ================================================= */}

          {!loadingShows &&
            onTheAirShows.length >
            0 && (

              <MovieRow

                title=
                  "Currently Airing"

                movies={
                  onTheAirShows
                }

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
              ACTION & ADVENTURE
          ================================================= */}

          {!loadingShows &&
            actionAdventureShows.length >
            0 && (

              <MovieRow

                title=
                  "Action & Adventure"

                movies={
                  actionAdventureShows
                }

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
              DRAMA
          ================================================= */}

          {!loadingShows &&
            dramaShows.length >
            0 && (

              <MovieRow

                title="Drama Shows"

                movies={
                  dramaShows
                }

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

          {!loadingShows &&
            comedyShows.length >
            0 && (

              <MovieRow

                title="Comedy Shows"

                movies={
                  comedyShows
                }

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

        </div>

      </section>


      {/* =================================================
          DETAILS MODAL
      ================================================= */}

      <MovieModal

        movie={
          selectedMovie
        }

        setSelectedMovie={
          setSelectedMovie
        }

        myList={
          myList
        }

        toggleMyList={
          toggleMyList
        }

        handlePlayMovie={
          handlePlayMovie
        }

      />


      {/* =================================================
          POPUP
      ================================================= */}

      <Popup

        movie={
          popupMovie
        }

        position={
          popupPosition
        }

        setPopupMovie={
          setPopupMovie
        }

        hideTimeout={
          hideTimeout
        }

        setSelectedMovie={
          handleSelectMovie
        }

        onPlay={
          handlePlayMovie
        }

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

        movie={
          heroTrailerMovie
        }

        trailer={
          heroTrailer
        }

        onClose={() => {

          setHeroTrailer(null);

          setHeroTrailerMovie(null);

        }}

      />


      {/* =================================================
          DETAILS LOADING
      ================================================= */}

      {loadingDetails && (

        <div
          className=
            "modal-overlay"
        >

          <div

            style={{

              color: "white",

              fontSize:
                "20px",

              fontWeight:
                "600",

            }}

          >

            Loading details...

          </div>

        </div>

      )}

    </>

  );

}


export default App;