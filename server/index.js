const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const dataGenerator = require('./data-generator');
const db = require('../database/index.js');
app.use(bodyParser.json());

app.post('/listings', (req, res) => {
  const listings = dataGenerator.listingsGenerator();
  for (let i = 0; i < listings.length; i++) {
    db.insertListings(listings[i], i, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
    });
  }
  console.log('Finished');    
  res.send();
});

app.post('/availability', (req, res) => {
  const availableListings = dataGenerator.availabilityGenerator();
  for (let i = 0; i < availableListings.length; i++) {
    db.insertAvailability(availableListings[i], i, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
    });
  }
  console.log('Finished'); 
  res.send();
});

app.post('/update', (req, res) => {
  const updatedListings = dataGenerator.availabilityUpdateGenerator();
  for (let i = 0; i < updatedListings.length; i++) {
    db.updateAvailability(updatedListings[i], i, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
    });
  }
  console.log('Finished');  
  res.send();
});

app.get('/listings', (req, res) => {
  const listings = dataGenerator.listingsGenerator();
  for (let i = 0; i < listings.length; i++) {
    db.insertListings(listings[i], i, (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
    });
  }
  console.log('Finished');    
  res.send();
});


app.listen(8080, () => {
  console.log('Server is listening on port 8080!');
});
