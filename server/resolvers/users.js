const pool = require('../db');

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
        const query = {
          text: 'INSERT INTO users(username, password, email) VALUES($1, $2, $3) RETURNING *',
          values: [username, password, email],
        };
        const user = await pool.query(query);
        return user.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    async editUser(_, { username, password, email }) {
      try {
        const query = {
          text: 'UPDATE users SET email=$3, password=$2 WHERE username=$1 RETURNING *',
          values: [username, password, email],
        };
        const user = await pool.query(query);
        return user.rows[0];
      } catch (error) {
        throw new Error(error);
      }
    },
    async deleteUser(_, { username }) {
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
