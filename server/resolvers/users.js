const pool = require('../db');
const bcrypt = require('bcrypt');

module.exports = {
  Query: {
    async getUser() {
      try {
        console.log('getting users...');
        const user = await pool.query('SELECT * FROM users');
        return user.rows;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
  Mutation: {
    async addUser(_, { username, password, email }) {
      try {
        const hashPass = await bcrypt.hash(
          password,
          Number(process.env.SALT_WORK_FACTOR)
        );
        const query = {
          text: 'INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *',
          values: [username, hashPass, email],
        };
        const user = await pool.query(query);
        return user.rows[0];
      } catch (error) {
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
        return user.rows[0];
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
