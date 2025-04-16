// mergedServer.js
const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(__dirname)); // serves HTML files

app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
  console.log('Veteran form submitted:', req.body);
  res.send('Veteran Registered!');
});

app.post('/volunteer-submit', (req, res) => {
  console.log('Volunteer form submitted:', req.body);
  res.send('Volunteer Registered!');
});



app.listen(3000, () => {
  console.log('Server is running at http://localhost:3000');
});
