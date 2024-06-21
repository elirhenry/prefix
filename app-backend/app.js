const express = require('express');
const app = express();
const port = 8081;

app.get('/users', () => {
  res.status(200).send('Response')
})

app.listen(port, () => console.log('Working'))