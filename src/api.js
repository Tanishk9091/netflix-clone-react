// =====================================================
// TMDB API CONFIGURATION
// =====================================================

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const BASE_URL =
  "https://api.themoviedb.org/3";

const IMAGE_URL =
  "https://image.tmdb.org/t/p/w500";

const BACKDROP_URL =
  "https://image.tmdb.org/t/p/w1280";


// =====================================================
// MOVIE GENRES
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
// TV SHOW GENRES
// =====================================================

const tvGenreMap = {

  10759: "Action & Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  10762: "Kids",
  9648: "Mystery",
  10763: "News",
  10764: "Reality",
  10765: "Sci-Fi & Fantasy",
  10766: "Soap",
  10767: "Talk",
  10768: "War & Politics",
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

          id:
            movie.id,

          title:
            movie.title ||
            "Unknown",

          description:
            movie.overview ||
            "No description available.",


          image:
            movie.poster_path
              ? `${IMAGE_URL}${movie.poster_path}`
              : "",


          backdrop:
            movie.backdrop_path
              ? `${BACKDROP_URL}${movie.backdrop_path}`
              : "",


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


          releaseDate:
            movie.release_date ||
            "Unknown",


          genre:
            genres ||
            "Movie",


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
        // TRY US
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

      console.warn(
        "Could not fetch certification:",
        certificationError
      );

    }


    // =================================================
    // RETURN FORMATTED MOVIE
    // =================================================

    return {

      id:
        movie.id,


      title:
        movie.title ||
        "Unknown",


      description:
        movie.overview ||
        "No description available.",


      image:
        movie.poster_path
          ? `${IMAGE_URL}${movie.poster_path}`
          : "",


      backdrop:
        movie.backdrop_path
          ? `${BACKDROP_URL}${movie.backdrop_path}`
          : "",


      match:
        movie.vote_average
          ? `${Math.round(
              movie.vote_average * 10
            )}% Match`
          : "N/A",


      rating:
        movie.vote_average || 0,


      releaseDate:
        movie.release_date ||
        "Unknown",


      age:
        certification,


      time:
        movie.runtime
          ? `${Math.floor(
              movie.runtime / 60
            )}h ${
              movie.runtime % 60
            }m`
          : "Unknown",


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
    // OFFICIAL YOUTUBE TRAILER
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
    // NO TRAILER
    // =================================================

    if (!trailer) {

      console.log(
        "No trailer found for movie:",
        movieId
      );

      return null;

    }


    // =================================================
    // RETURN TRAILER
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


    const encodedQuery =
      encodeURIComponent(
        query.trim()
      );


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


// =====================================================
// =====================================================
// TV SHOW API
// =====================================================
// =====================================================


// =====================================================
// FETCH TV SHOWS
// =====================================================

async function fetchTVShows(endpoint) {

  try {

    console.log(
      "Fetching TV:",
      endpoint
    );


    const response =
      await fetch(
        createUrl(endpoint)
      );


    if (!response.ok) {

      throw new Error(
        `TMDB TV request failed: ${response.status} ${response.statusText}`
      );

    }


    const data =
      await response.json();


    if (!data.results) {

      throw new Error(
        "TMDB TV response does not contain results"
      );

    }


    return data.results.map(
      (show) => {

        const genres =
          show.genre_ids
            ?.map(
              (id) =>
                tvGenreMap[id]
            )
            .filter(Boolean)
            .join(" • ");


        return {

          // =================================================
          // BASIC INFORMATION
          // =================================================

          id:
            show.id,


          title:
            show.name ||
            "Unknown",


          description:
            show.overview ||
            "No description available.",


          // =================================================
          // IMAGES
          // =================================================

          image:
            show.poster_path
              ? `${IMAGE_URL}${show.poster_path}`
              : "",


          backdrop:
            show.backdrop_path
              ? `${BACKDROP_URL}${show.backdrop_path}`
              : "",


          // =================================================
          // RATING
          // =================================================

          match:
            show.vote_average
              ? `${Math.round(
                  show.vote_average * 10
                )}% Match`
              : "N/A",


          rating:
            show.vote_average || 0,


          popularity:
            show.popularity || 0,


          // =================================================
          // RELEASE DATE
          // =================================================

          releaseDate:
            show.first_air_date ||
            "Unknown",


          // =================================================
          // GENRES
          // =================================================

          genre:
            genres ||
            "TV Show",


          // =================================================
          // TV-SPECIFIC DATA
          // =================================================

          time:
            show.number_of_seasons
              ? `${show.number_of_seasons} Seasons`
              : "TV Show",


          age:
            "U/A 16+",


          // Useful later
          mediaType:
            "tv",

        };

      }
    );


  } catch (error) {

    console.error(
      `Error fetching TV shows from ${endpoint}:`,
      error
    );

    throw error;

  }

}


// =====================================================
// TRENDING TV SHOWS
// =====================================================

export async function getTrendingShows() {

  return fetchTVShows(
    "/trending/tv/week"
  );

}


// =====================================================
// POPULAR TV SHOWS
// =====================================================

export async function getPopularShows() {

  return fetchTVShows(
    "/tv/popular"
  );

}


// =====================================================
// TOP RATED TV SHOWS
// =====================================================

export async function getTopRatedShows() {

  return fetchTVShows(
    "/tv/top_rated"
  );

}


// =====================================================
// CURRENTLY AIRING TV SHOWS
// =====================================================

export async function getOnTheAirShows() {

  return fetchTVShows(
    "/tv/on_the_air"
  );

}


// =====================================================
// ACTION & ADVENTURE SHOWS
// =====================================================

export async function getActionAdventureShows() {

  return fetchTVShows(
    "/discover/tv?with_genres=10759"
  );

}


// =====================================================
// COMEDY SHOWS
// =====================================================

export async function getComedyShows() {

  return fetchTVShows(
    "/discover/tv?with_genres=35"
  );

}


// =====================================================
// DRAMA SHOWS
// =====================================================

export async function getDramaShows() {

  return fetchTVShows(
    "/discover/tv?with_genres=18"
  );

}


// =====================================================
// TV SHOW DETAILS
// =====================================================

export async function getShowDetails(
  showId
) {

  try {

    console.log(
      "Fetching TV show details for ID:",
      showId
    );


    const response =
      await fetch(
        createUrl(
          `/tv/${showId}`
        )
      );


    if (!response.ok) {

      throw new Error(
        `TV details request failed: ${response.status} ${response.statusText}`
      );

    }


    const show =
      await response.json();


    // =================================================
    // GENRES
    // =================================================

    const genres =
      show.genres &&
      show.genres.length > 0
        ? show.genres
            .map(
              (genre) =>
                genre.name
            )
            .join(" • ")
        : "TV Show";


    // =================================================
    // RETURN FORMATTED SHOW
    // =================================================

    return {

      id:
        show.id,


      title:
        show.name ||
        "Unknown",


      description:
        show.overview ||
        "No description available.",


      image:
        show.poster_path
          ? `${IMAGE_URL}${show.poster_path}`
          : "",


      backdrop:
        show.backdrop_path
          ? `${BACKDROP_URL}${show.backdrop_path}`
          : "",


      match:
        show.vote_average
          ? `${Math.round(
              show.vote_average * 10
            )}% Match`
          : "N/A",


      rating:
        show.vote_average || 0,


      releaseDate:
        show.first_air_date ||
        "Unknown",


      genre:
        genres,


      time:
        show.number_of_seasons
          ? `${show.number_of_seasons} Seasons`
          : "TV Show",


      age:
        "U/A 16+",


      popularity:
        show.popularity || 0,


      numberOfSeasons:
        show.number_of_seasons || 0,


      numberOfEpisodes:
        show.number_of_episodes || 0,


      mediaType:
        "tv",

    };


  } catch (error) {

    console.error(
      "ERROR IN getShowDetails():",
      error
    );

    throw error;

  }

}


// =====================================================
// GET TV SHOW TRAILER
// =====================================================

export async function getShowTrailer(
  showId
) {

  try {

    console.log(
      "Fetching TV trailer for ID:",
      showId
    );


    const response =
      await fetch(
        createUrl(
          `/tv/${showId}/videos`
        )
      );


    if (!response.ok) {

      throw new Error(
        `TV trailer request failed: ${response.status}`
      );

    }


    const data =
      await response.json();


    // =================================================
    // OFFICIAL TRAILER
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
          (
            video.type === "Trailer" ||
            video.type === "Teaser"
          )
      );


    // =================================================
    // NO TRAILER
    // =================================================

    if (!trailer) {

      console.log(
        "No TV trailer found for:",
        showId
      );

      return null;

    }


    // =================================================
    // RETURN TRAILER
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
      "Error fetching TV trailer:",
      error
    );

    throw error;

  }

}


// =====================================================
// SEARCH TV SHOWS
// =====================================================

export async function searchShows(
  query
) {

  if (
    !query ||
    query.trim() === ""
  ) {

    return [];

  }


  try {

    console.log(
      "Searching TV shows for:",
      query
    );


    const encodedQuery =
      encodeURIComponent(
        query.trim()
      );


    return await fetchTVShows(
      `/search/tv?query=${encodedQuery}&page=1`
    );


  } catch (error) {

    console.error(
      "TV search API failed:",
      error
    );

    return [];

  }

}

// =====================================================
// MOVIES BY LANGUAGE
// =====================================================

export async function getMoviesByLanguage(languageCode) {

  try {

    console.log(
      "Fetching movies for language:",
      languageCode
    );

    const movies = await fetchMovies(
      `/discover/movie?with_original_language=${languageCode}&sort_by=popularity.desc&page=1`
    );

    return movies || [];

  } catch (error) {

    console.error(
      "Language movies failed:",
      error
    );

    return [];

  }

}