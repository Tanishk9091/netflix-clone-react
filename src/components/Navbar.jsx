import { useState, useEffect, useRef } from "react";
import "../styles/style.css";

import logo from "../assets/Images/netflix-logo.png";
import profile from "../assets/Images/profile.png";


function Navbar({
  searchTerm,
  setSearchTerm,
  myList = [],
  currentUser,
  onLogout,
}) {

  const [showSearch, setShowSearch] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const profileRef = useRef(null);


  // =====================================================
  // CLOSE PROFILE WHEN CLICKING OUTSIDE
  // =====================================================

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };

  }, []);


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
  // MOVIES
  // =====================================================

  const handleMovies = (e) => {

    e.preventDefault();

    const moviesSection =
      document.getElementById("movies-section");

    if (moviesSection) {

      moviesSection.scrollIntoView({
        behavior: "smooth",
      });

    }

  };


  // =====================================================
  // MY LIST
  // =====================================================

  const handleMyList = (e) => {

    e.preventDefault();

    const myListSection =
      document.getElementById("my-list-section");


    if (!myList || myList.length === 0) {

      alert("Your My List is empty.");

      return;

    }


    if (myListSection) {

      myListSection.scrollIntoView({
        behavior: "smooth",
      });

    }

  };


  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = () => {

    setShowProfileMenu(false);

    if (onLogout) {
      onLogout();
    }

  };


  return (

    <nav className="navbar">


      {/* =================================================
          LEFT SIDE
      ================================================= */}

      <div className="nav-left">


        {/* LOGO */}

        <img
          src={logo}
          className="logo"
          alt="Netflix"
        />


        {/* NAVIGATION */}

        <ul>

          <li>
            <a
              href="#"
              onClick={handleHome}
            >
              Home
            </a>
          </li>


          <li>

            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Shows
            </a>

          </li>


          <li>

            <a
              href="#movies-section"
              onClick={handleMovies}
            >
              Movies
            </a>

          </li>


          <li>

            <a
              href="#my-list-section"
              onClick={handleMyList}
            >
              My List
            </a>

          </li>


          <li>

            <a
              href="#"
              onClick={(e) =>
                e.preventDefault()
              }
            >
              Browse by Languages
            </a>

          </li>

        </ul>

      </div>


      {/* =================================================
          RIGHT SIDE
      ================================================= */}

      <div className="nav-right">


        {/* SEARCH */}

        <div
          className={`search-box ${
            showSearch ? "active" : ""
          }`}
        >

          {showSearch && (

            <input
              type="text"
              placeholder="Titles, people, genres"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm(e.target.value)
              }
              autoFocus
            />

          )}


          <i
            className="fa-solid fa-magnifying-glass search-icon"
            onClick={() =>
              setShowSearch(!showSearch)
            }
          ></i>

        </div>


        {/* NOTIFICATION */}

        <i className="fa-regular fa-bell nav-icon"></i>


        {/* =================================================
            PROFILE
        ================================================= */}

        <div
          className="profile-wrapper"
          ref={profileRef}
        >

          <button
            className="profile-button"
            onClick={() =>
              setShowProfileMenu(
                !showProfileMenu
              )
            }
          >

            <img
              src={profile}
              className="profile"
              alt="Profile"
            />

            <i
              className={`fa-solid fa-chevron-down ${
                showProfileMenu
                  ? "profile-arrow open"
                  : "profile-arrow"
              }`}
            ></i>

          </button>


          {/* =================================================
              PROFILE DROPDOWN
          ================================================= */}

          {showProfileMenu && (

            <div className="profile-dropdown">


              <div className="profile-user">

                <img
                  src={profile}
                  alt="Profile"
                />


                <div>

                  <strong>
                    {currentUser?.name || "User"}
                  </strong>

                  <span>
                    {currentUser?.email || ""}
                  </span>

                </div>

              </div>


              <div className="profile-line"></div>


              <button
                className="logout-button"
                onClick={handleLogout}
              >

                <i className="fa-solid fa-right-from-bracket"></i>

                <span>
                  Sign out of Netflix
                </span>

              </button>


            </div>

          )}

        </div>

      </div>

    </nav>

  );
}


export default Navbar;