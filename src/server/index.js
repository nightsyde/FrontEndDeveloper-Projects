const dotenv = require('dotenv');
dotenv.config();
var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const portID = 9000;
const projectData = []

const app = express();
// Require the Aylien npm package
var AylienNewsApi = require("aylien-news-api");

var defaultClient = AylienNewsApi.ApiClient.instance;

var app_id = defaultClient.authentications["app_id"];
app_id.apiKey = process.env["NEWSAPI_APP_ID"];

var app_key = defaultClient.authentications["app_key"];
app_key.apiKey = process.env["NEWSAPI_APP_KEY"];

var api = new AylienNewsApi.DefaultApi();

var opts = {
  title: "trump",
  sortBy: "social_shares_count.facebook",
  notLanguage: ["en"],
  publishedAtStart: "NOW-7DAYS",
  publishedAtEnd: "NOW",
  entitiesBodyLinksDbpedia: [
    "http://dbpedia.org/resource/Donald_Trump",
    "http://dbpedia.org/resource/Hillary_Rodham_Clinton"
  ]
};

var callback = function(error, data, response) {
  if (error) {
    console.error(error);
  } else {
    console.log("API called successfully. Returned data: ");
    console.log("========================================");
    for (var i = 0; i < data.stories.length; i++) {
      console.log(data.stories[i].title + " / " + data.stories[i].source.name);
    }
  }
};

api.listStories(opts, callback);

app.use(express.static('dist'));

console.log(__dirname);

const result = dotenv.config()

if (result.error) {
  throw result.error
}

console.log(result.parsed)

app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    // res.sendFile(path.resolve('src/client/views/index.html'));
});

// designates what port the app will listen to for incoming requests
app.listen(portID, function () {
    console.log(`Example app listening on port ${portID}!`);
});


app.post('/data', async function (req,res){
  const infoRequest = req.query.information;
  console.log("server 42 infoRequest: ");
  console.log(infoRequest);
  await res.send(await textapi.entities({
    text: infoRequest
    }, function(error, response) {
      if (error === null) {
        Object.keys(response.entities).forEach(function(e) {
          console.log(e + ": " + response.entities[e].join(","));
        });
      }else{
        console.log("server 57 error: "+error);
      }
    }));
});
