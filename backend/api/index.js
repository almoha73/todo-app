const express = require('express');
const cors = require('cors');
const app = express();

// Use cors middleware
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Hello from Express on Vercel!');
});

// Export the app for Vercel
module.exports = app;