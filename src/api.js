// =====================================================
// TMDB API CONFIGURATION
// =====================================================

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL =
  "https://image.tmdb.org/t/p/w500";

const BACKDROP_URL =
  "https://image.tmdb.org/t/p/w1280";


// =====================================================
// TMDB GENRES
// =====================================================

const genreMap = {

  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",

};


// =====================================================
// CREATE TMDB URL
// =====================================================

function createUrl(endpoint) {

  const url =
    new URL(`${BASE_URL}${endpoint}`);

  url.searchParams.set(
    "api_key",
    API_KEY
  );

  url.searchParams.set(
    "language",
    "en-US"
  );

  return url.toString();

}


// =====================================================
// FETCH MOVIES
// =====================================================

async function fetchMovies(endpoint) {

  try {

    console.log(
      "Fetching:",
      endpoint
    );


    const response =
      await fetch(
        createUrl(endpoint)
      );


    if (!response.ok) {

      throw new Error(
        `TMDB request failed: ${response.status} ${response.statusText}`
      );

    }


    const data =
      await response.json();


    if (!data.results) {

      throw new Error(
        "TMDB response does not contain results"
      );

    }


    return data.results.map(
      (movie) => {

        const genres =
          movie.genre_ids
            ?.map(
              (id) =>
                genreMap[id]
            )
            .filter(Boolean)
            .join(" • ");


        return {

          // =================================================
          // BASIC INFORMATION
          // =================================================

          id:
            movie.id,

          title:
            movie.title ||
            "Unknown",

          description:
            movie.overview ||
            "No description available.",


          // =================================================
          // IMAGES
          // =================================================

          image:
            movie.poster_path
              ? `${IMAGE_URL}${movie.poster_path}`
              : "",

          backdrop:
            movie.backdrop_path
              ? `${BACKDROP_URL}${movie.backdrop_path}`
              : "",


          // =================================================
          // RATING
          // =================================================

          match:
            movie.vote_average
              ? `${Math.round(
                  movie.vote_average * 10
                )}% Match`
              : "N/A",

          rating:
            movie.vote_average || 0,

          popularity:
            movie.popularity || 0,


          // =================================================
          // RELEASE DATE
          // =================================================

          releaseDate:
            movie.release_date ||
            "Unknown",


          // =================================================
          // GENRE
          // =================================================

          genre:
            genres ||
            "Movie",


          // =================================================
          // TEMPORARY DATA
          // =================================================

          time:
            "Movie",

          age:
            "U/A 16+",

        };

      }
    );

  } catch (error) {

    console.error(
      `Error fetching ${endpoint}:`,
      error
    );

    throw error;

  }

}


// =====================================================
// TRENDING MOVIES
// =====================================================

export async function getTrendingMovies() {

  return fetchMovies(
    "/trending/movie/week"
  );

}


// =====================================================
// POPULAR MOVIES
// =====================================================

export async function getPopularMovies() {

  return fetchMovies(
    "/movie/popular"
  );

}


// =====================================================
// ACTION MOVIES
// =====================================================

export async function getActionMovies() {

  return fetchMovies(
    "/discover/movie?with_genres=28"
  );

}


// =====================================================
// COMEDY MOVIES
// =====================================================

export async function getComedyMovies() {

  return fetchMovies(
    "/discover/movie?with_genres=35"
  );

}


// =====================================================
// GET MOVIE DETAILS
// =====================================================

export async function getMovieDetails(
  movieId
) {

  try {

    console.log(
      "Fetching details for movie ID:",
      movieId
    );


    // =================================================
    // GET MOVIE DETAILS
    // =================================================

    const response =
      await fetch(
        createUrl(
          `/movie/${movieId}`
        )
      );


    if (!response.ok) {

      throw new Error(
        `Movie details request failed: ${response.status} ${response.statusText}`
      );

    }


    const movie =
      await response.json();


    console.log(
      "Movie details received:",
      movie
    );


    // =================================================
    // GET CERTIFICATION
    // =================================================

    let certification = "NR";


    try {

      const certificationResponse =
        await fetch(
          createUrl(
            `/movie/${movieId}/release_dates`
          )
        );


      if (certificationResponse.ok) {

        const certificationData =
          await certificationResponse.json();


        // ---------------------------------------------
        // TRY INDIA
        // ---------------------------------------------

        const indiaRelease =
          certificationData.results?.find(
            (country) =>
              country.iso_3166_1 === "IN"
          );


        // ---------------------------------------------
        // OTHERWISE TRY US
        // ---------------------------------------------

        const usRelease =
          certificationData.results?.find(
            (country) =>
              country.iso_3166_1 === "US"
          );


        const releaseInfo =
          indiaRelease ||
          usRelease;


        // ---------------------------------------------
        // GET CERTIFICATION
        // ---------------------------------------------

        if (
          releaseInfo &&
          releaseInfo.release_dates &&
          releaseInfo.release_dates.length > 0
        ) {

          const certificationDataItem =
            releaseInfo.release_dates.find(
              (release) =>
                release.certification
            );


          if (
            certificationDataItem &&
            certificationDataItem.certification
          ) {

            certification =
              certificationDataItem.certification;

          }

        }

      }

    } catch (certificationError) {

      // Certification is optional.
      // Movie details should still work.

      console.warn(
        "Could not fetch certification:",
        certificationError
      );

    }


    // =================================================
    // RETURN FORMATTED MOVIE
    // =================================================

    return {

      // =================================================
      // BASIC
      // =================================================

      id:
        movie.id,

      title:
        movie.title ||
        "Unknown",

      description:
        movie.overview ||
        "No description available.",


      // =================================================
      // IMAGES
      // =================================================

      image:
        movie.poster_path
          ? `${IMAGE_URL}${movie.poster_path}`
          : "",

      backdrop:
        movie.backdrop_path
          ? `${BACKDROP_URL}${movie.backdrop_path}`
          : "",


      // =================================================
      // MATCH
      // =================================================

      match:
        movie.vote_average
          ? `${Math.round(
              movie.vote_average * 10
            )}% Match`
          : "N/A",


      // =================================================
      // RATING
      // =================================================

      rating:
        movie.vote_average || 0,


      // =================================================
      // RELEASE DATE
      // =================================================

      releaseDate:
        movie.release_date ||
        "Unknown",


      // =================================================
      // AGE / CERTIFICATION
      // =================================================

      age:
        certification,


      // =================================================
      // RUNTIME
      // =================================================

      time:
        movie.runtime
          ? `${Math.floor(
              movie.runtime / 60
            )}h ${
              movie.runtime % 60
            }m`
          : "Unknown",


      // =================================================
      // GENRES
      // =================================================

      genre:
        movie.genres &&
        movie.genres.length > 0
          ? movie.genres
              .map(
                (genre) =>
                  genre.name
              )
              .join(" • ")
          : "Unknown",


      // =================================================
      // POPULARITY
      // =================================================

      popularity:
        movie.popularity || 0,

    };

  } catch (error) {

    console.error(
      "ERROR IN getMovieDetails():",
      error
    );

    throw error;

  }

}


// =====================================================
// GET MOVIE TRAILER
// =====================================================

export async function getMovieTrailer(
  movieId
) {

  try {

    console.log(
      "Fetching trailer for movie ID:",
      movieId
    );


    const response =
      await fetch(
        createUrl(
          `/movie/${movieId}/videos`
        )
      );


    if (!response.ok) {

      throw new Error(
        `Trailer request failed: ${response.status}`
      );

    }


    const data =
      await response.json();


    // =================================================
    // FIND OFFICIAL YOUTUBE TRAILER
    // =================================================

    const officialTrailer =
      data.results?.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official === true
      );


    // =================================================
    // FALLBACK TRAILER
    // =================================================

    const trailer =
      officialTrailer ||
      data.results?.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );


    // =================================================
    // NO TRAILER FOUND
    // =================================================

    if (!trailer) {

      console.log(
        "No trailer found for movie:",
        movieId
      );

      return null;

    }


    // =================================================
    // RETURN TRAILER DATA
    // =================================================

    return {

      key:
        trailer.key,

      name:
        trailer.name,

      site:
        trailer.site,

      type:
        trailer.type,

    };

  } catch (error) {

    console.error(
      "Error fetching movie trailer:",
      error
    );

    throw error;

  }

}


// =====================================================
// SEARCH MOVIES
// =====================================================

export async function searchMovies(
  query
) {

  // =================================================
  // CHECK EMPTY SEARCH
  // =================================================

  if (
    !query ||
    query.trim() === ""
  ) {

    return [];

  }


  try {

    console.log(
      "Searching movies for:",
      query
    );


    // =================================================
    // ENCODE SEARCH TEXT
    // =================================================

    const encodedQuery =
      encodeURIComponent(
        query.trim()
      );


    // =================================================
    // SEARCH TMDB
    // =================================================

    return await fetchMovies(
      `/search/movie?query=${encodedQuery}&include_adult=false&page=1`
    );

  } catch (error) {

    console.error(
      "Search API failed:",
      error
    );

    return [];

  }

}