import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk, current } from '@reduxjs/toolkit';
import 'regenerator-runtime/runtime';
import axios from 'axios';

const initialState = {
  username: '',
  myMoviesList: [],
  recommendedMovies: [],
  success: false,
  message: null,
  pageNum: 1,
};

export const signup = createAsyncThunk(
  '/signup', // <- unique string
  async ({ username, password, email }) => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          mutation SignUp($username: String!, $password: String!, $email: String!) {
            signUp(username: $username, password: $password, email: $email) {
              success
              message
              username
              data {
                id
              }
            }
          }
          `,
          variables: {
            username,
            password,
            email,
          },
        },
      });
      return response.data.data.signUp;
    } catch (e) {
      console.log(e);
    }
  }
);

export const login = createAsyncThunk(
  '/login', // <- unique string
  async ({ username, password }) => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query Login($username: String!, $password: String!) {
            login(username: $username, password: $password) {
              success
              message
              username
              data {
                adult
                id
                original_language
                original_title
                overview
                popularity
                poster_path
                release_date
                title
                video
                vote_average
                vote_count
                backdrop_path
                homepage
                imdb_id
                revenue
                runtime
                status
                tagline
                rating
                comment
                watched
              }
            }
          }
          `,
          variables: { username, password },
        },
      });
      return response.data.data.login;
    } catch (e) {
      console.log(e);
    }
  }
);

export const logout = createAsyncThunk(
  '/logout', // <- unique string
  async () => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query Query {
            logout
          }
          `,
        },
      });
      return response.data.data.logout;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getMovieRecs = createAsyncThunk(
  '/getMovieRecs', // <- unique string
  async () => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query GetMovieRecs {
            getMovieRecs {
              adult
              genre_ids
              id
              original_language
              original_title
              overview
              popularity
              poster_path
              release_date
              title
              video
              vote_average
              vote_count
            }
          }
          `,
        },
      });
      return response.data.data.getMovieRecs;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getMovies = createAsyncThunk(
  '/getMoreMovies', // <- unique string
  async (_, { getState }) => {
    const state = getState();

    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          query SearchMovies($pageNum: Int) {
            getMovies(pageNum: $pageNum) {
              success
              message
              username
              data {
                adult
                id
                original_language
                original_title
                overview
                popularity
                poster_path
                release_date
                title
                video
                vote_average
                vote_count
                backdrop_path
                homepage
                imdb_id
                revenue
                runtime
                status
                tagline
                rating
                comment
                watched
              }
            }
          }
          `,
          variables: { pageNum: state.myMovies.pageNum },
        },
      });
      return response.data.data.getMovies;
    } catch (e) {
      console.log(e);
    }
  }
);

export const addMovie = createAsyncThunk(
  '/addMovie', // <- unique string
  async ({ movieId, watched }) => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          mutation AddMovie($movieId: Int!, $watched: Boolean!, $rating: Int) {
            addMovie(movie_id: $movieId, watched: $watched, rating: $rating) {
              success
              message
              data {
                adult
                id
                original_language
                original_title
                overview
                popularity
                poster_path
                release_date
                title
                video
                vote_average
                vote_count
                backdrop_path
                homepage
                imdb_id
                revenue
                runtime
                status
                tagline
                rating
                comment
                watched
              }
            }
          }
          `,
          variables: { movieId, watched },
        },
      });
      return response.data.data.addMovie;
    } catch (e) {
      console.log(e);
    }
  }
);

export const deleteMovie = createAsyncThunk(
  '/deleteMovie',
  async ({ movieId }) => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
            mutation DeleteMovie($movieId: Int!) {
              deleteMovie(movie_id: $movieId) {
                success
                message
              }
            }
          `,
          variables: { movieId },
        },
      });
      response.data.data.deleteMovie.movieId = movieId;
      return response.data.data.deleteMovie;
    } catch (e) {
      console.log(e);
    }
  }
);

export const editMovie = createAsyncThunk(
  '/editMovie', // <- unique string
  async ({ movieId, comment, rating, watched }) => {
    try {
      const response = await axios({
        url: '/graphql',
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          query: `
          mutation Mutation($movieId: Int!, $rating: Int, $comment: String, $watched: Boolean) {
            editMovie(movie_id: $movieId, rating: $rating, comment: $comment, watched: $watched) {
              success
              message
              data {
                adult
                id
                original_language
                original_title
                overview
                popularity
                poster_path
                release_date
                title
                video
                vote_average
                vote_count
                backdrop_path
                homepage
                imdb_id
                revenue
                runtime
                status
                tagline
                rating
                comment
                watched
              }
            }
          }
          `,
          variables: { movieId, comment, rating, watched },
        },
      });
      console.log('try block', response.data.data);
      response.data.data.editMovie.comment = comment;
      response.data.data.editMovie.movieId = movieId;
      response.data.data.editMovie.rating = rating;
      // response.data.data.editMovie.watched = watched;
      // console.log('try block response', rating);
      return response.data.data.editMovie;
    } catch (e) {
      console.log(e);
    }
  }
);

export const myMoviesSlice = createSlice({
  name: 'myMovies',
  initialState,
  reducers: {
    // addMovie: (state, action) => {
    //   const movie = { ...action.payload };
    //   movie.watched = true;
    //   state.myMoviesList.push(movie);
    // },
    // deleteMovie: (state, action) => {
    //   state.myMoviesList = state.myMoviesList.filter(
    //     (movie) => movie != action.payload
    //   );
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.myMoviesList = action.payload.data;
          state.success = action.payload.success;
          state.message = action.payload.message;
          state.username = action.payload.username;
        }
      })
      .addCase(signup.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload.success) {
          state.myMoviesList = action.payload.data;
          state.success = action.payload.success;
          state.message = action.payload.message;
          state.username = action.payload.username;
        }
      })
      .addCase(getMovies.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.myMoviesList.push(...action.payload.data);
          state.success = action.payload.success;
          state.message = action.payload.message;
          state.username = action.payload.username;
          state.pageNum += 1;
        }
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.myMoviesList = [];
        state.success = false;
        state.message = '';
        state.username = '';
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.myMoviesList.unshift(action.payload.data[0]);
        } else console.log(action.payload.message);
      })
      .addCase(deleteMovie.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.myMoviesList = state.myMoviesList.filter(
            (movie) => movie.id !== action.payload.movieId
          );
          // state.myMoviesList.splice(state.myMoviesList.findIndex((movie) => movie.id === action.payload.movieId), 1);
        } else console.log(action.payload.message);
      })
      .addCase(editMovie.fulfilled, (state, action) => {
        if (action.payload.success) {
          state.myMoviesList = state.myMoviesList.map((movie) => {
            if (movie.id === action.payload.movieId) {
              movie.rating = action.payload.rating;
              movie.comment = action.payload.comment;
            }
            return movie;
          });
        } else console.log(action.payload.message);
      })
      .addCase(getMovieRecs.fulfilled, (state, action) => {
        state.recommendedMovies = action.payload;
      });
  },
});

// export const { deleteMovie } = myMoviesSlice.actions;

export default myMoviesSlice.reducer;
