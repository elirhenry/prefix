const express = require('express');
const cors = require('cors');
const app = express();
const port = 8080;

// Enable CORS for all routes
app.use(cors());
app.get('/', (req, res) => {
  res.send(['Good', 'stuff'])
})

app.listen(port, () => { console.log(`App listening at http://localhost:${port}`) })
