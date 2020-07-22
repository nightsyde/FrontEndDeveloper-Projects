const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const portID = 9000;
const projectData = []

const app = express();
// Require the Aylien npm package
var AYLIENTextAPI = require("aylien_textapi");
var textapi = new AYLIENTextAPI({
  application_id: process.env.API_ID,
  application_key: process.env.API_KEY
});

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(portID, function () {
    console.log(`Example app listening on port ${portID}!`);
});


app.post('/data', function (req,res){
  const infoRequest = req.query.information;
  console.log("server 34 infoRequest: "+infoRequest);
  const responseInfo = getData(infoRequest);
  console.log("server 36 response: "+responseInfo);
  res.send({responseInfo});
});

function getData(dataSet){
  console.log("server 41 apiID: "+textapi.application_id);
  console.log("server 42 apiKey: "+textapi.application_key);
  let apiRequest = textapi.entities({
    text: dataSet
  }, function(error, response) {
    if (error === null) {
      Object.keys(response.entities).forEach(function(e) {
        console.log(e + ": " + response.entities[e].join(","));
      });
    }else{
      console.log("server 51 error: "+error);
    }
  });
  console.log("server 54 apiRequest: "+apiRequest);
}
