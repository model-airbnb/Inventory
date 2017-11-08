const express = require('express');
const dataGenerator = require('./data-generator');
const db = require('../database/index.js');
const fs = require('fs');
const AWS = require('aws-sdk');

const sqs = new AWS.SQS({ region: 'us-west-1' });
const port = 8080 || process.env.INVENTORY_PORT;
const app = express();


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//writes new listings to a file to import
const writeListings = () => {
  setInterval(() => {
    const listings = dataGenerator.listingsGeneratorImport();
    for (let i = 0; i < listings.length; i += 1) {
      const content = JSON.stringify(listings[i]);
      fs.appendFile('./listings.json', content + '\n', 'utf8', (err) => {
        if (err) {
          console.log('Error', err);
          throw err;
        }
      });
    }
  }, 5000);
};

//uncomment below to write listings to a file
writeListings();

app.post('/listings', (req, res) => {
  const listings = dataGenerator.listingsGenerator();
  for (let i = 0; i < listings.length; i += 1) {
    db.insertListings(listings[i], (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
      //simulates a host listing
      const sqsParamsSearch = {
        MessageBody: JSON.stringify({ topic: 'Inventory', payload: data }),
        QueueUrl: process.env.SEARCH_QUEUE_URL,
      };
      sqs.sendMessage(sqsParamsSearch, (err, data) => {
        if (err) {
          console.log('Error', err);
        }
      });
    });
  }
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
      //simulates a new listing availability date
      const sqsParamsSearch = {
        MessageBody: JSON.stringify({ topic: 'Availability', payload: data }),
        QueueUrl: process.env.SEARCH_QUEUE_URL,
      };
      sqs.sendMessage(sqsParamsSearch, (err, data) => {
        if (err) {
          console.log('Error', err);
        }
      });
    });
  }
  res.send();
});

app.post('/update', (req, res) => {
  const updatedListings = dataGenerator.availabilityUpdateGenerator();
  for (let i = 0; i < updatedListings.length; i += 1) {
    db.updateAvailability(updatedListings[i], (err, data) => {
      if (err) {
        console.log('Error', err);
        res.sendStatus(500);
      }
    });
  }
  res.send();
});


app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
