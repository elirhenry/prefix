const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;
app.use(cors());
const knex = require('knex')( require('./knexfile')['development'])
const bcrypt = require('bcrypt');

app.use(express.json())

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log('Login attempt for username:', username);

    const user = await knex('users').where({ username }).first();
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

app.get('/', (req, res) => {
  res.send(['Database Available'])
})

//GET list of users and items

app.get("/users", function (req, res) {
  knex("users")
    .select("id", "first_name", "last_name", "username")
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
});

app.get("/items", function (req, res) {
  knex("items")
    .select("id", "user_id", "name", "quantity", 'image', 'description')
    .then((data) => res.status(200).json(data))
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching users" });
    });
});

// POST new users and items

app.post('/users', (req, res) => {
  console.log(req.body);
  res.status(201).send(`Body recieved : ${req.body.name}`)
})

// app.post('/users', async (req, res) => {
//   try {
//     const { first_name, last_name, username } = req.body;
//     const [newUserId] = await knex('users').insert({ first_name, last_name, username }).returning('id');
//     res.status(201).json({ id: newUserId, first_name, last_name, username });
//   } catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).json({ error: 'An error occurred while adding the user' });
//   }
// });

// app.post('/items', async (req, res) => {
//   try {
//     const { user_id, name, quantity, image, description } = req.body;
//     const [newItemId] = await knex('items').insert({ user_id, name, quantity, image, description }).returning('id');
//     res.status(201).json({ id: newItemId, user_id, name, quantity, image, description });
//   } catch (error) {
//     console.error('Error adding item:', error);
//     res.status(500).json({ error: 'An error occurred while adding the item' });
//   }
// });


app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) })
