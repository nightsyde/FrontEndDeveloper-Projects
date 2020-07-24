const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const portID = 9000;
const projectData = []

const app = express();
// Require the Aylien npm package
const AylienNewsApi = require("aylien-news-api");

const defaultClient = AylienNewsApi.ApiClient.instance;

const app_id = defaultClient.authentications["app_id"];
app_id.apiKey = process.env["NEWSAPI_APP_ID"];

const app_key = defaultClient.authentications["app_key"];
app_key.apiKey = process.env["NEWSAPI_APP_KEY"];

const api = new AylienNewsApi.DefaultApi();

let opts = {
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

let callback = function(error, data, response) {
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

// api.listStories(opts, callback);

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
  await res.send(await api.listStories(opts, callback));
});
