const express = require('express');
const app = express();
// app.use('/static', express.static(path.join(__dirname, 'public')));
const bodyParser = require('body-parser');
const dataGenerator = require('./data-generator');
const db = require('../database/index.js');
app.use(bodyParser.json());

app.get('/reservations', function (req, res) {
  var listings = dataGenerator.listingsGenerator();
  // db.insertListings(listings, function(err, data) {
  //   if (err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //   }
  // });
  db.insertListings(listings);
  res.send();
});

app.listen(8080, function () {
  console.log('Server is listening on port 8080!');
});