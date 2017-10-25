const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('GET request received');
});

app.listen(8080, function () {
  console.log('Server is listening on port 8080!');
});