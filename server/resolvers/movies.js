const pool = require('../db');

// function shuffleArray(array) {
//   for (var i = array.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var temp = array[i];
//     array[i] = array[j];
//     array[j] = temp;
//   }
// }

module.exports = {
  Query: {
    async getMovies(_, { pageNum = 1 }, { dataSources, username }) {
      try {
        const querySize = 10; // set number of results per query
        const query = {
          text: 'SELECT * FROM Users_Movies WHERE username = $1 offset $2 limit $3',
          values: [username, (pageNum - 1) * querySize, querySize],
        };
        const movie = await pool.query(query);
        const promiseArr = movie.rows.map(({ movie_id }) =>
          dataSources.MovieAPI.getMovieInfo({ movie_id })
        );
        const movieInfoArr = await Promise.all(promiseArr);
        const movieInforArrComplete = movie.rows.map((cur, i) => ({
          ...cur,
          ...movieInfoArr[i],
        }));
        return {
          success: true,
          message: 'Movies collected',
          username: username,
          data: movieInforArrComplete,
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    async getMovieInfo(_, { movie_id }, { dataSources, username }) {
      const query = {
        text: 'SELECT * FROM Users_Movies WHERE username = $1 AND movie_id = $2',
        values: [username, movie_id],
      };
      const [movieApiInfo, userMovieInfo] = await Promise.all([
        dataSources.MovieAPI.getMovieInfo({ movie_id }),
        pool.query(query),
      ]);
      return {
        ...movieApiInfo,
        ...userMovieInfo.rows[0],
      };
    },
    searchMovies: (_, { searchTerm, pageNum = 1 }, { dataSources }) => {
      return dataSources.MovieAPI.searchMovies({ searchTerm, pageNum });
    },
    getMovieRecs: async (_, __, { username, dataSources }) => {
      const querySize = 3;
      const query = {
        text: `SELECT * FROM Users_Movies 
        WHERE username = $1
        ORDER BY rating DESC
        limit $2`,
        values: [username, querySize],
      };
      const movies = await pool.query(query);
      // console.log(movies.rows);
      const promiseArr = movies.rows.map(({ movie_id }) =>
        dataSources.MovieAPI.getMovieRecs({ movie_id })
      );
      const movieInfoArr = await Promise.all(promiseArr);
      const recMovies = movieInfoArr.flat();
      const indices = [];
      while (indices.length < 5) {
        const index = Math.floor(recMovies.length * Math.random());
        if (!indices.includes(index)) {
          indices.push(index);
        }
      }
      return indices.map((s) => recMovies[s]);
    },
  },

  Mutation: {
    async addMovie(
      _,
      { movie_id, rating = 0, comment = '', watched },
      { username, dataSources }
    ) {
      try {
        const query = {
          text: 'INSERT INTO Users_Movies(username, movie_id, rating, comment, watched) VALUES($1, $2, $3, $4, $5) RETURNING *',
          values: [username, movie_id, rating, comment, watched],
        };
        const [movieApiInfo, userMovieInfo] = await Promise.all([
          dataSources.MovieAPI.getMovieInfo({ movie_id }),
          pool.query(query),
        ]);
        return {
          success: true,
          message: 'Added Movie to Library',
          username,
          data: [{
            ...movieApiInfo,
            ...userMovieInfo.rows[0],
          }],
        };
      } catch (error) {
        if (error.code === '23505') {
          return {
            success: false,
            message: 'Movie is already in library',
            username: '',
            data: [],
          };
        }
        throw new Error(error);
      }
    },
    async editMovie(_, { movie_id, rating, comment, watched }, { username }) {
      try {
        const query = {
          text: `UPDATE Users_Movies SET 
          rating = COALESCE($3, rating),
          comment = COALESCE($4, comment),
          watched = COALESCE($5, watched)
          WHERE username=$1 AND movie_id=$2`,
          values: [username, movie_id, rating, comment, watched],
        };
        await pool.query(query);
        return {
          success: true,
          message: 'Added changes',
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteMovie(_, { movie_id }, { username }) {
      try {
        const query = {
          text: 'DELETE FROM Users_Movie WHERE username=$1 && movie_id=$2',
          values: [username, movie_id],
        };
        await pool.query(query);
        return 'Movie deleted';
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
