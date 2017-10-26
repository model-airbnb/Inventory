const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataGenerator = require('./data-generator');
const db = require('../database/index.js');
app.use(bodyParser.json());

app.post('/listings', function (req, res) {
  var listings = dataGenerator.listingsGenerator();
    for(var i = 0; i < listings.length; i++) {
      db.insertListings(listings[i], i, function(err, data) {
        if (err) {
          console.log("Error", err);
          res.sendStatus(500);
        } 
      });
    }  
  console.log("Finished");    
  res.send();
});

app.post('/availability', function (req, res) {
  var availableListings = dataGenerator.availabilityGenerator();
    for(var i = 0; i < availableListings.length; i++) {
      db.insertAvailability(availableListings[i], i, function(err, data) {
        if (err) {
          console.log("Error", err);
          res.sendStatus(500);
        } 
      });
    }  
  console.log("Finished");    
  res.send();
});

app.listen(8080, function () {
  console.log('Server is listening on port 8080!');
});