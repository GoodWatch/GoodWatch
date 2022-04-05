import { createSlice } from '@reduxjs/toolkit';

const dummyState = [{
  "poster_path": "/IfB9hy4JH1eH6HEfIgIGORXi5h.jpg",
  "adult": false,
  "overview": "Jack Reacher must uncover the truth behind a major government conspiracy in order to clear his name. On the run as a fugitive from the law, Reacher uncovers a potential secret from his past that could change his life forever.",
  "release_date": "2016-10-19",
  "genre_ids": [
    53,
    28,
    80,
    18,
    9648
  ],
  "id": 343611,
  "original_title": "Jack Reacher: Never Go Back",
  "original_language": "en",
  "title": "Jack Reacher: Never Go Back",
  "backdrop_path": "/4ynQYtSEuU5hyipcGkfD6ncwtwz.jpg",
  "popularity": 26.818468,
  "vote_count": 201,
  "video": false,
  "vote_average": 4.19,
  "watched": false
},
{
  "adult": false,
  "backdrop_path": "/7tNTPZMb13W0AhkcuoL6myRrNRr.jpg",
  "belongs_to_collection": {
      "id": 119,
      "name": "The Lord of the Rings Collection",
      "poster_path": "/nSNle6UJNNuEbglNvXt67m1a1Yn.jpg",
      "backdrop_path": "/bccR2CGTWVVSZAG0yqmy3DIvhTX.jpg"
  },
  "budget": 79000000,
  "genres": [
      {
          "id": 12,
          "name": "Adventure"
      },
      {
          "id": 14,
          "name": "Fantasy"
      },
      {
          "id": 28,
          "name": "Action"
      }
  ],
  "homepage": "http://www.lordoftherings.net/",
  "id": 121,
  "imdb_id": "tt0167261",
  "original_language": "en",
  "original_title": "The Lord of the Rings: The Two Towers",
  "overview": "Frodo and Sam are trekking to Mordor to destroy the One Ring of Power while Gimli, Legolas and Aragorn search for the orc-captured Merry and Pippin. All along, nefarious wizard Saruman awaits the Fellowship members at the Orthanc Tower in Isengard.",
  "popularity": 109.096,
  "poster_path": "/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg",
  "production_companies": [
      {
          "id": 12,
          "logo_path": "/iaYpEp3LQmb8AfAtmTvpqd4149c.png",
          "name": "New Line Cinema",
          "origin_country": "US"
      },
      {
          "id": 11,
          "logo_path": "/6FAuASQHybRkZUk08p9PzSs9ezM.png",
          "name": "WingNut Films",
          "origin_country": "NZ"
      },
      {
          "id": 5237,
          "logo_path": null,
          "name": "The Saul Zaentz Company",
          "origin_country": "US"
      }
  ],
  "production_countries": [
      {
          "iso_3166_1": "NZ",
          "name": "New Zealand"
      },
      {
          "iso_3166_1": "US",
          "name": "United States of America"
      }
  ],
  "release_date": "2002-12-18",
  "revenue": 926287400,
  "runtime": 179,
  "spoken_languages": [
      {
          "english_name": "English",
          "iso_639_1": "en",
          "name": "English"
      }
  ],
  "status": "Released",
  "tagline": "A New Power Is Rising.",
  "title": "The Lord of the Rings: The Two Towers",
  "video": false,
  "vote_average": 8.4,
  "vote_count": 17931,
  "watched": true,
}];

const initialState = {
  myMoviesList: [...dummyState],
};

export const myMoviesSlice = createSlice({
  name: 'myMovies',
  initialState,
  reducers: {
    addMovie: (state, action) => {
      state.myMoviesList = state.myMoviesList.push(action.payload);
    },
    deleteMovie: (state, action) => {
      state.myMoviesList = state.myMoviesList.filter(
        (movie) => movie != action.payload
      );
    },
  },
});

export const { addMovie, deleteMovie } = myMoviesSlice.actions;

export default myMoviesSlice.reducer;
