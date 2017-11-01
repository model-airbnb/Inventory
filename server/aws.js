const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sqs = new AWS.SQS({ region: 'us-west-1' });

const inventoryMessage = { topic: 'Inventory', payload: 'Test from Inventory' };
const searchMessage = { topic: 'Inventory', payload: 'Test from Inventory' };
const recommendationsMessage = { topic: 'Inventory', payload: 'Test from Inventory' };

const sqsParamsInventory = {
  MessageBody: JSON.stringify(inventoryMessage),
  QueueUrl: process.env.INVENTORY_QUEUE_URL,
};

const sqsParamsSearch = {
  MessageBody: JSON.stringify(searchMessage),
  QueueUrl: process.env.SEARCH_QUEUE_URL,
};

const sqsParamsRecommendations = {
  MessageBody: JSON.stringify(recommendationsMessage),
  QueueUrl: process.env.RECOMMENDATIONS_QUEUE_URL,
};

sqs.sendMessage(sqsParamsInventory, (err, data) => {
  if (err) {
    console.log('ERR', err);
  }
  console.log(data);
});

sqs.sendMessage(sqsParamsSearch, (err, data) => {
  if (err) {
    console.log('ERR', err);
  }
  console.log(data);
});

sqs.sendMessage(sqsParamsRecommendations, (err, data) => {
  if (err) {
    console.log('ERR', err);
  }
  console.log(data);
});
