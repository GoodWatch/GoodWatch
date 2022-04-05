const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const pool = require('../db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const query = {
    text: 'SELECT * FROM Users WHERE username = $1',
    values: [username],
  };
  const user = await pool.query(query);
  if (user.rows) {
    const match = await bcrypt.compare(password, user.rows[0].password);
    if (match) {
      const token = jwt.sign(
        { username: user.rows[0].username },
        process.env.SECRET_JWT
      );
      res.cookie('access_token', token, { httpOnly: true }).send({
        success: true,
        message: 'Logged in',
      });
    } else {
      res.status(401).send({
        success: false,
        message: 'Incorrect credentials',
      });
    }
  } else {
    res.status(404).send({
      success: false,
      message: 'Username or password does not match',
    });
  }
});

router.get('/test', async (req, res) => {
  const token = jwt.sign({ username: 'ariHash' }, process.env.SECRET_JWT);
  res
    .cookie('access_token', token, {
      // httpOnly: true,
      sameSite: 'none',
      secure: 'true',
    })
    .send({
      success: true,
      message: 'Logged in',
    });
});

module.exports = router;
