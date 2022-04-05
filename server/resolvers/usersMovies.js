const pool = require('../db');

module.exports = {
  Query: {
    async getMovies(_, { username }, { dataSources }) {
      try {
        const query = {
          text: 'SELECT * FROM Users_Movies WHERE username = $1',
          values: [username],
        };
        const movie = await pool.query(query);
        const promiseArr = movie.rows.map(({ movie_id }) =>
          dataSources.MovieAPI.getMovieInfo({ movie_id })
        );
        const movieInfoArr = await Promise.all(promiseArr);
        return movie.rows.map((cur,i)=>({...cur, ...movieInfoArr[i]}));

      } catch (error) {
        throw new Error(error);
      }
    },
    async getMovieInfo(_, { movie_id, username }, { dataSources }) {
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
  },

  Mutation: {
    async addMovie(_, { username, movie_id, rating, comment, watched }) {
      try {
        const query = {
          text: 'INSERT INTO Users_Movies(username, movie_id, rating, comment, watched) VALUES($1, $2, $3, $4, $5) RETURNING *',
          values: [username, movie_id, rating, comment, watched],
        };
        const user = await pool.query(query);
        return user.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    async editMovie(_, { username, movie_id, rating, comment, watched }) {
      try {
        const query = {
          text: `UPDATE Users_Movies SET 
          rating = COALESCE($3, rating),
          comment = COALESCE($4, comment),
          watched = COALESCE($5, watched)
          WHERE username=$1 AND movie_id=$2 RETURNING *`,
          values: [username, movie_id, rating, comment, watched],
        };
        console.log(query);
        const user = await pool.query(query);
        return user.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteMovie(_, { username, movie_id }) {
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
