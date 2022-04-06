const pool = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const movieResolver = require('./movies');

const setToken = (res, username) => {
  const token = jwt.sign({ username: username }, process.env.SECRET_JWT);
  res.cookie('access_token', token, {
    httpOnly: true,
    sameSite: 'none',
    secure: 'true',
  });
};

module.exports = {
  Query: {
    async login(_, { username, password }, { dataSources, res }) {
      try {
        const query = {
          text: 'SELECT * FROM Users WHERE username = $1',
          values: [username],
        };
        const user = await pool.query(query);
        if (user.rows.length) {
          const match = await bcrypt.compare(password, user.rows[0].password);
          if (match) {
            // Set users token
            setToken(res, user.rows[0].username);
            const allMovieInfoArr = await movieResolver.Query.getMovies(
              _,
              { pageNum: 1 },
              { dataSources, username }
            );
            return {
              success: true,
              message: 'Logged in',
              username,
              data: allMovieInfoArr.data,
            };
          } else {
            return {
              success: false,
              message: 'Incorrect credentials',
              username: '',
              data: [],
            };
          }
        } else {
          return {
            success: false,
            message: 'Username or password does not match',
            username: '',
            data: [],
          };
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async logout(_, __, { res }) {
      res.clearCookie('access_token');
      return 'logged out';
    },
  },
  Mutation: {
    async signUp(_, { username, password, email }, { res }) {
      try {
        const hashPass = await bcrypt.hash(
          password,
          Number(process.env.SALT_WORK_FACTOR)
        );
        const query = {
          text: 'INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *',
          values: [username, hashPass, email],
        };
        await pool.query(query);
        setToken(res, username);
        return {
          success: true,
          message: 'Signed Up',
          username,
          data: [],
        };
      } catch (error) {
        if (error.code === '23505') {
          return {
            success: false,
            message: 'Username already exists',
            username: '',
            data: [],
          };
        }
        throw new Error(error);
      }
    },
    async editUser(_, { password, email }, { username }) {
      try {
        const query = {
          text: `UPDATE users SET 
          email = COALESCE($3, email),
          password = COALESCE($2, password)
          WHERE username=$1 RETURNING *`,
          values: [username, password, email],
        };
        const user = await pool.query(query);
        return {
          success: true,
          message: 'Username info changed',
          username: user.rows[0].username,
          data: [],
        };
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteUser(_, __, { username }) {
      try {
        const query = {
          text: 'DELETE FROM users WHERE username=$1',
          values: [username],
        };
        await pool.query(query);
        return 'User deleted';
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
