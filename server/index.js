const express = require('express');

const app = express();
const dataGenerator = require('./data-generator');
const db = require('../database/index.js');
const fs = require('fs');
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({ region: 'us-west-1' });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});


const generate = () => {
  setInterval(() => {
    const listings = dataGenerator.listingsGeneratorImport();
    for (let i = 0; i < listings.length; i += 1) {
      const content = listings[i];
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

      //simulates a host listing
      const sqsParamsSearch = {
        MessageBody: JSON.stringify({ topic: 'Inventory', payload: data }),
        QueueUrl: process.env.SEARCH_QUEUE_URL,
      };

      sqs.sendMessage(sqsParamsSearch, (err, data) => {
        if (err) {
          console.log('ERR', err);
        }
        console.log(data);
      });
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
      //simulates a host listing
      const sqsParamsSearch = {
        MessageBody: JSON.stringify({ topic: 'Availability', payload: data }),
        QueueUrl: process.env.SEARCH_QUEUE_URL,
      };

      sqs.sendMessage(sqsParamsSearch, (err, data) => {
        if (err) {
          console.log('ERR', err);
        }
        console.log(data);
      });
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
