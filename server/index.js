const express = require('express');

const app = express();
const dataGenerator = require('./data-generator');
const db = require('../database/index.js');
const fs = require('fs');

const generate = () => {
  setInterval(() => {
    const listings = dataGenerator.listingsGeneratorImport();
    for (let i = 0; i < listings.length; i += 1) {
      let content = listings[i];
      fs.appendFile('./listings.csv', content + '\n', 'utf8', (err) => {
        if (err) {
          throw err;
        }
        console.log('The file was saved!');
      });
    }
    console.log('Finished');
  }, 5000);
};

app.post('/listings', (req, res) => {
  const listings = dataGenerator.listingsGenerator();
  for (let i = 0; i < listings.length; i += 1) {
    db.insertListings(listings[i], (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
      console.log(data);
    });
  }
  console.log('Finished');
  res.send();
});

app.post('/availability', (req, res) => {
  const availableListings = dataGenerator.availabilityGenerator();
  for (let i = 0; i < availableListings.length; i += 1) {
    db.insertAvailability(availableListings[i], (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
      console.log(data);
    });
  }
  console.log('Finished');
  res.send();
});

app.post('/update', (req, res) => {
  const updatedListings = dataGenerator.availabilityUpdateGenerator();
  console.log('Start', Date.now());
  for (let i = 0; i < updatedListings.length; i += 1) {
    db.updateAvailability(updatedListings[i], (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
      console.log(data);
    });
  }
  console.log('Finished');
  res.send();
});


app.listen(8080, () => {
  console.log('Server is listening on port 8080!');
});
