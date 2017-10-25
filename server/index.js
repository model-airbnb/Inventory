const express = require('express');
const app = express();
const dataGenerator = require('./data-generator');
const db = require('../database/index.js');

app.get('/reservations', function (req, res) {
  res.send();
});

app.listen(8080, function () {
  console.log('Server is listening on port 8080!');
});