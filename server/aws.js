const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const sqs = new AWS.SQS({ region: 'us-west-1' });

const sqsParamsSearch = {
  MessageBody: JSON.stringify({ topic: 'Inventory', payload: 'Message for Search' }),
  QueueUrl: process.env.SEARCH_QUEUE_URL,
};

const sqsParamsRecommendations = {
  MessageBody: JSON.stringify({ topic: 'Inventory', payload: 'Message for Inventory' }),
  QueueUrl: process.env.RECOMMENDATIONS_QUEUE_URL,
};

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
