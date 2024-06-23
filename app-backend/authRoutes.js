const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile')[process.env.NODE_ENV || 'development']);

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await knex('users').where({ username }).first();

    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'An error occurred during login' });
  }
});

module.exports = router;