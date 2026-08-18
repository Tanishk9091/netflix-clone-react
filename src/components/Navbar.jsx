import { useState } from "react";
import "../styles/style.css";

import logo from "../assets/Images/netflix-logo.png";
import profile from "../assets/Images/profile.png";


function Navbar({
  searchTerm,
  setSearchTerm,
  myList = [],
  currentUser,
  onLogout,
  onShows,
  onLanguageSelect,
}) {

  // =====================================================
  // STATES
  // =====================================================

  const [showSearch, setShowSearch] = useState(false);

  const [showProfile, setShowProfile] = useState(false);

  const [showBrowse, setShowBrowse] = useState(false);

  const [showLanguages, setShowLanguages] = useState(false);


  // =====================================================
  // HOME
  // =====================================================

  const handleHome = (e) => {

    e.preventDefault();

    setShowBrowse(false);
    setShowLanguages(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };


  // =====================================================
  // SHOWS
  // =====================================================

  const handleShows = (e) => {

    e.preventDefault();

    setShowBrowse(false);
    setShowLanguages(false);

    if (onShows) {
      onShows(e);
    }

  };


  // =====================================================
  // MOVIES
  // =====================================================

  const handleMovies = (e) => {

    e.preventDefault();

    setShowBrowse(false);
    setShowLanguages(false);

    const moviesSection =
      document.getElementById("movies-section");

    if (moviesSection) {

      moviesSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }

  };


  // =====================================================
  // MY LIST
  // =====================================================

  const handleMyList = (e) => {

    e.preventDefault();

    setShowBrowse(false);
    setShowLanguages(false);

    const myListSection =
      document.getElementById("my-list-section");


    if (!myList || myList.length === 0) {

      alert("Your My List is empty.");

      return;

    }


    if (myListSection) {

      myListSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

    }

  };


  // =====================================================
  // LANGUAGE
  // =====================================================

  const handleLanguage = (
    languageCode,
    languageName
  ) => {

    console.log(
      "Selected language:",
      languageName
    );


    if (onLanguageSelect) {

      onLanguageSelect(
        languageCode,
        languageName
      );

    }


    setShowLanguages(false);
    setShowBrowse(false);

  };


  // =====================================================
  // BROWSE
  // =====================================================

  const toggleBrowse = () => {

    setShowBrowse((previous) => !previous);

    // Close other menus
    setShowProfile(false);
    setShowLanguages(false);

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    setShowProfile(false);

    if (onLogout) {
      onLogout();
    }

  };


  // =====================================================
  // SEARCH
  // =====================================================

  const toggleSearch = () => {

    setShowSearch((previous) => !previous);

    // Close other menus
    setShowProfile(false);
    setShowBrowse(false);

  };


  // =====================================================
  // PROFILE
  // =====================================================

  const toggleProfile = () => {

    setShowProfile((previous) => !previous);

    // Close other menus
    setShowBrowse(false);
    setShowLanguages(false);

  };


  // =====================================================
  // UI
  // =====================================================

  return (

    <nav>


      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="nav-left">


        {/* =================================================
            LOGO
        ================================================= */}

        <img
          src={logo}
          className="logo"
          alt="Netflix Logo"
        />


        {/* =================================================
            DESKTOP NAVIGATION
        ================================================= */}

        <ul className="desktop-nav">


          {/* HOME */}

          <li>

            <a
              href="#"
              onClick={handleHome}
            >
              Home
            </a>

          </li>


          {/* SHOWS */}

          <li>

            <a
              href="#shows-section"
              onClick={handleShows}
            >
              Shows
            </a>

          </li>


          {/* MOVIES */}

          <li>

            <a
              href="#movies-section"
              onClick={handleMovies}
            >
              Movies
            </a>

          </li>



          {/* MY LIST */}

          <li>

            <a
              href="#my-list-section"
              onClick={handleMyList}
            >
              My List
            </a>

          </li>


          {/* BROWSE BY LANGUAGES */}

          <li className="language-menu">

            <a
              href="#"
              onClick={(e) => {

                e.preventDefault();

                setShowLanguages(
                  (previous) => !previous
                );

                setShowProfile(false);
                setShowBrowse(false);

              }}
            >

              Browse by Languages

              <i
                className={`fa-solid ${
                  showLanguages
                    ? "fa-chevron-up"
                    : "fa-chevron-down"
                }`}
              ></i>

            </a>


            {/* LANGUAGE DROPDOWN */}

            {showLanguages && (

              <div className="language-dropdown">


                <button
                  onClick={() =>
                    handleLanguage(
                      "en",
                      "English"
                    )
                  }
                >
                  🇬🇧 English
                </button>


                <button
                  onClick={() =>
                    handleLanguage(
                      "hi",
                      "Hindi"
                    )
                  }
                >
                  🇮🇳 Hindi
                </button>


                <button
                  onClick={() =>
                    handleLanguage(
                      "ta",
                      "Tamil"
                    )
                  }
                >
                  🇮🇳 Tamil
                </button>


                <button
                  onClick={() =>
                    handleLanguage(
                      "te",
                      "Telugu"
                    )
                  }
                >
                  🇮🇳 Telugu
                </button>


                <button
                  onClick={() =>
                    handleLanguage(
                      "ko",
                      "Korean"
                    )
                  }
                >
                  🇰🇷 Korean
                </button>


                <button
                  onClick={() =>
                    handleLanguage(
                      "ja",
                      "Japanese"
                    )
                  }
                >
                  🇯🇵 Japanese
                </button>


                <button
                  onClick={() =>
                    handleLanguage(
                      "es",
                      "Spanish"
                    )
                  }
                >
                  🇪🇸 Spanish
                </button>


              </div>

            )}

          </li>

        </ul>


        {/* =================================================
            MOBILE BROWSE
        ================================================= */}

        <div className="mobile-browse-container">


          <button
            className="browse-button"
            onClick={toggleBrowse}
          >

            Browse

            <i
              className={`fa-solid ${
                showBrowse
                  ? "fa-chevron-up"
                  : "fa-chevron-down"
              }`}
            ></i>

          </button>


          {/* =================================================
              MOBILE BROWSE DROPDOWN
          ================================================= */}

          {showBrowse && (

            <div className="browse-dropdown">


              {/* HOME */}

              <button
                onClick={handleHome}
              >
                Home
              </button>


              {/* SHOWS */}

              <button
                onClick={handleShows}
              >
                Shows
              </button>


              {/* MOVIES */}

              <button
                onClick={handleMovies}
              >
                Movies
              </button>



              {/* MY LIST */}

              <button
                onClick={handleMyList}
              >
                My List
              </button>


              {/* BROWSE BY LANGUAGES */}

              <button
                className="browse-language-button"
                onClick={() => {

                  setShowLanguages(
                    (previous) => !previous
                  );

                }}
              >

                Browse by Languages

                <i
                  className={`fa-solid ${
                    showLanguages
                      ? "fa-chevron-up"
                      : "fa-chevron-down"
                  }`}
                ></i>

              </button>


              {/* =================================================
                  MOBILE LANGUAGE LIST
              ================================================= */}

              {showLanguages && (

                <div className="mobile-language-list">


                  <button
                    onClick={() =>
                      handleLanguage(
                        "en",
                        "English"
                      )
                    }
                  >
                    🇬🇧 English
                  </button>


                  <button
                    onClick={() =>
                      handleLanguage(
                        "hi",
                        "Hindi"
                      )
                    }
                  >
                    🇮🇳 Hindi
                  </button>


                  <button
                    onClick={() =>
                      handleLanguage(
                        "ta",
                        "Tamil"
                      )
                    }
                  >
                    🇮🇳 Tamil
                  </button>


                  <button
                    onClick={() =>
                      handleLanguage(
                        "te",
                        "Telugu"
                      )
                    }
                  >
                    🇮🇳 Telugu
                  </button>


                  <button
                    onClick={() =>
                      handleLanguage(
                        "ko",
                        "Korean"
                      )
                    }
                  >
                    🇰🇷 Korean
                  </button>


                  <button
                    onClick={() =>
                      handleLanguage(
                        "ja",
                        "Japanese"
                      )
                    }
                  >
                    🇯🇵 Japanese
                  </button>


                  <button
                    onClick={() =>
                      handleLanguage(
                        "es",
                        "Spanish"
                      )
                    }
                  >
                    🇪🇸 Spanish
                  </button>


                </div>

              )}

            </div>

          )}

        </div>

      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="nav-right">


        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className={`search-box ${
            showSearch
              ? "active"
              : ""
          }`}
        >

          <i
            className="
              fa-solid
              fa-magnifying-glass
              search-icon
            "
            onClick={toggleSearch}
          ></i>


          {showSearch && (

            <input
              type="text"
              placeholder="Titles, people, genres"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(
                  e.target.value
                )
              }
              autoFocus
            />

          )}

        </div>


        {/* =================================================
            NOTIFICATION
        ================================================= */}

        <i
          className="
            fa-regular
            fa-bell
            nav-icon
          "
          title="Notifications"
        ></i>


        {/* =================================================
            PROFILE
        ================================================= */}

        <div className="profile-container">


          <img
            src={profile}
            className="profile"
            alt="Profile"
            onClick={toggleProfile}
          />


          <i
            className={`
              fa-solid
              ${
                showProfile
                  ? "fa-chevron-up"
                  : "fa-chevron-down"
              }
              profile-arrow
            `}
            onClick={toggleProfile}
          ></i>


          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          {showProfile && (

            <div className="profile-dropdown">


              <div className="profile-user">


                <img
                  src={profile}
                  alt="Profile"
                />


                <div>

                  <strong>
                    {currentUser?.name ||
                      "User"}
                  </strong>


                  <span>
                    {currentUser?.email ||
                      ""}
                  </span>

                </div>

              </div>


              <div className="dropdown-divider"></div>


              <button
                onClick={handleLogout}
                className="logout-btn"
              >

                <i className="fa-solid fa-right-from-bracket"></i>

                Logout

              </button>


            </div>

          )}

        </div>


      </div>

    </nav>

  );

}


export default Navbar;