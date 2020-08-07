const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const app = express();
const portID = 9000;
const projectData = {};
let infoRequest = {};

const weatherAPIKEY = process.env["WeatherBitKey"];
const pixabayAPIKEY = process.env["PixabayKey"];


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

app.get('/weatherCity', async function(req,res) {
  const location = req.query.location;
  const fetchURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${location}&key=${weatherAPIKEY}`;
  fetch(fetchURL);
});

app.get('/weatherZIP', async function(req,res) {
  const location = req.query.location;
  const fetchURL = `https://api.weatherbit.io/v2.0/forecast/daily?&postal_code=${location}&country=US&key=${weatherAPIKEY}`;
  fetch(fetchURL);
});

app.get('/views', async function(req,res) {
  const location = req.query.location;
  const fetchURL = `https://pixabay.com/api/?key=${pixabayAPIKEY}&q=${location}&image_type=photo;`
  fetch(fetchURL)
});

app.post('/data', async function(req,res){
  opts.title = req.query.information;
  api.listStories(opts, (error, data, response)=> {
      console.log("server 57: callback");
      if (error) {
        console.error(error);
      } else {
        console.log("API called successfully. Returned data: ");
        console.log("========================================");
        for (var i = 0; i < data.stories.length; i++) {
          console.log(data.stories[i].title + " / " + data.stories[i].source.name);
          projectData[i] = data.stories[i];
        }
        // console.log(projectData);
        response = projectData;
        console.log("server 63: ");
        console.log(projectData);
        res.send(projectData);
      }
  });
  // res.send(projectData);
});
