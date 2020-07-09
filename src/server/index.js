const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const portID = 9000;

const app = express();
// Require the Aylien npm package
var aylien = require("aylien_textapi");
var textapi = new aylien({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
});

// designates what port the app will listen to for incoming requests
app.listen(portID, function () {
    console.log(`Example app listening on port ${portID}!`)
});

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});

app.get('/bioFetch' function (req, res) {
  var projectData = function (
    textapi.entities({
      'text': req
    },
    function(error, response) {
      if (error === null) {
        console.log(response);
      }
    });
  res.send(projectData);
})
