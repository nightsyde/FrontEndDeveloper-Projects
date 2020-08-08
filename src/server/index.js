const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const app = express();
const portID = 9000;
let projectData = {};
let infoRequest = {};
let location = '';
let imageData = [];


const weatherAPIKEY = process.env["WeatherBitKey"];
const pixabayAPIKEY = process.env["PixabayKey"];
const geonamesAPIKEY = process.env["GeoNamesKey"]


app.use(express.static('dist'));

console.log(__dirname);

const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log(result.parsed)


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
});

// designates what port the app will listen to for incoming requests
app.listen(portID, function () {
    console.log(`Example app listening on port ${portID}!`);
});

app.get('/weather', async function(req,res) {
  console.log("server 39");
  console.log(weatherAPIKEY)
  res.send(weatherAPIKEY);

});

app.get('/pictures', async function(req,res) {
  console.log("server 45");
  console.log(pixabayAPIKEY)
  res.send(pixabayAPIKEY);
});

app.get('/zip2name', function(req,res) {
  console.log("server 50");
  console.log(geonamesAPIKEY)
  res.send(geonamesAPIKEY);
});
