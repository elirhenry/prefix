const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const knex = require('knex');
const config = require('./knexfile');

const app = express();
const port = 8080;

app.use(cors());
app.use(express.json());

const db = knex(config.development);

//GET welcome to the database

app.get('/', (req, res) => {
  res.send('Welcome to the lightsaber inventory database!');
});

//GET list of users

app.get('/users', (req, res) => {
  db('users')
    .select('id', 'first_name', 'last_name', 'username')
    .then(data => res.status(200).json(data))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching users' });
    });
});

//GET list of items

app.get('/items', (req, res) => {
  db('items')
    .select('id', 'user_id', 'name', 'quantity', 'image', 'description')
    .then(data => res.status(200).json(data))
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while fetching items' });
    });
});

//POST login endpoint

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    const user = await db('users').where({ username }).first();
    console.log('User from database:', user);

    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('User found, comparing passwords');
    const validPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', validPassword);

    if (!validPassword) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    console.log('Login successful for user:', username);
    const { password: _, ...userData } = user;
    res.json(userData);
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});

// GET items based on user_id

app.get('/items/:user_id', async (req, res) => {
  const { user_id } = req.params;

  try {
    const userItems = await db('items').where({ user_id });
    res.json(userItems);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// POST new users

app.post('/auth/signup', async (req, res) => {
  try {
    const { first_name, last_name, username, password } = req.body;
    const existingUser = await db('users').where({ username }).first();
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const [newUserId] = await db('users').insert({
      first_name,
      last_name,
      username,
      password: hashedPassword
    }).returning('id');
    res.status(201).json({ id: newUserId, first_name, last_name, username });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
});

//POST a new item

app.post('/items', async (req, res) => {
  try {
    const { user_id, name, quantity, description, image } = req.body;
    const [newItemId] = await db('items').insert({
      user_id,
      name,
      quantity,
      image,
      description
    }).returning('id');
    res.status(201).json({ id: newItemId, user_id, name, quantity, image, description });
  } catch (error) {
    console.error('Error adding item:', error);
    res.status(500).json({ error: 'An error occurred while adding the item' });
  }
});

// DELETE an item

app.delete('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id } = req.body;
    const item = await db('items').where({ id, user_id }).first();

    if (!item) {
      return res.status(404).json({ error: 'Item not found or you do not have permission to delete this item' });
    }
    await db('items').where({ id }).del();
    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Error deleting item:', error);
    res.status(500).json({ error: 'An error occurred while deleting the item' });
  }
});

// PATCH an item

app.patch('/items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { user_id, name, quantity, description, image } = req.body;
    const item = await db('items').where({ id, user_id }).first();

    if (!item) {
      return res.status(404).json({ error: 'Item not found or you do not have permission to edit this item' });
    }
    await db('items').where({ id }).update({
      name,
      quantity,
      image,
      description
    });
    res.json({ message: 'Item updated successfully' });
  } catch (error) {
    console.error('Error updating item:', error);
    res.status(500).json({ error: 'An error occurred while updating the item' });
  }
});

//GET product details

app.get('/details/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await db('items').where({ id }).first();

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ error: 'An error occurred while fetching the item' });
  }
});


app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) })
