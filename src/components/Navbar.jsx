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

  const [showSearch, setShowSearch] =
    useState(false);

  const [showProfile, setShowProfile] =
    useState(false);

  const [showLanguages, setShowLanguages] =
    useState(false);


  // =====================================================
  // HOME
  // =====================================================

  const handleHome = (e) => {

    e.preventDefault();

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

    if (onShows) {
      onShows(e);
    }

  };


  // =====================================================
  // MOVIES
  // =====================================================

  const handleMovies = (e) => {

    e.preventDefault();

    const moviesSection =
      document.getElementById(
        "movies-section"
      );

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

    const myListSection =
      document.getElementById(
        "my-list-section"
      );


    if (!myList || myList.length === 0) {

      alert(
        "Your My List is empty."
      );

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
  // BROWSE BY LANGUAGES
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


    // Close dropdown

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


  return (

    <nav>

      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="nav-left">

        {/* LOGO */}

        <img
          src={logo}
          className="logo"
          alt="Netflix Logo"
        />


        {/* =================================================
            NAVIGATION
        ================================================= */}

        <ul>

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


          {/* =================================================
              BROWSE BY LANGUAGES
          ================================================= */}

          <li className="language-menu">

            <a
              href="#"
              onClick={(e) => {

                e.preventDefault();

                setShowLanguages(
                  !showLanguages
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

            </a>


            {/* =================================================
                LANGUAGE DROPDOWN
            ================================================= */}

            {showLanguages && (

              <div className="language-dropdown">

                {/* ENGLISH */}

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


                {/* HINDI */}

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


                {/* TAMIL */}

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


                {/* TELUGU */}

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


                {/* KOREAN */}

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


                {/* JAPANESE */}

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


                {/* SPANISH */}

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
            onClick={() =>
              setShowSearch(
                !showSearch
              )
            }
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
            onClick={() =>
              setShowProfile(
                !showProfile
              )
            }
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
            onClick={() =>
              setShowProfile(
                !showProfile
              )
            }
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