const AWS = require('aws-sdk');
const Consumer = require('sqs-consumer');
const db = require('../database/index.js');

const sqs = new AWS.SQS({ region: 'us-west-1' });

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

//simulates a user booking
const sqsParamsInventory = {
  MessageBody: JSON.stringify({ topic: 'Inventory', payload: { listings_id: 10000005, date: ['2017-12-29', '2017-12-30', '2017-12-31'], is_available: 0 } }),
  QueueUrl: process.env.INVENTORY_QUEUE_URL,
};

sqs.sendMessage(sqsParamsInventory, (err, data) => {
  if (err) {
    console.log('ERR', err);
  }
  console.log(data);
});

//handles a user booking
const app = Consumer.create({
  queueUrl: process.env.INVENTORY_QUEUE_URL,
  handleMessage: (message, done) => {
    message = JSON.parse(message.Body);
    db.updateAvailability(message.payload, (err, data) => {
      if (err) {
        console.log('Error', err);
        throw err;
      }

      const sqsParamsRecommendations = {
        MessageBody: JSON.stringify({ topic: 'Inventory', payload: data[0] }),
        QueueUrl: process.env.RECOMMENDATIONS_QUEUE_URL,
      };

      sqs.sendMessage(sqsParamsRecommendations, (err, data) => {
        if (err) {
          console.log('ERR', err);
          throw err;
        }
        console.log(data);
      });

      const sqsParamsSearch = {
        MessageBody: JSON.stringify({ topic: 'Availability', payload: data[1] }),
        QueueUrl: process.env.SEARCH_QUEUE_URL,
      };

      sqs.sendMessage(sqsParamsSearch, (err, data) => {
        if (err) {
          console.log('ERR', err);
          throw err;
        }
        console.log(data);
      });
    });
    done();
  },
  sqs: new AWS.SQS({ region: 'us-west-1' }),
});

app.on('error', (err) => {
  console.log(err.message);
});

app.start();
