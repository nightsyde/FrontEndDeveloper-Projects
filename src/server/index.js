const dotenv = require('dotenv');
dotenv.config();
const path = require('path');
const express = require('express');
const portID = 9000;
const projectData = {}

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
  language: ["en"],
  publishedAtStart: "NOW-7DAYS",
  publishedAtEnd: "NOW",
  sort_by: 'relevance',
};

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
  opts.title = infoRequest;
  api.listStories(opts, (error, data, response)=> {
    console.log("server 30: callback");
    if (error) {
      console.error(error);
    } else {
      console.log("API called successfully. Returned data: ");
      console.log("========================================");
      for (var i = 0; i < data.stories.length; i++) {
        console.log(data.stories[i].title + " / " + data.stories[i].source.name);
        projectData[i] = data.stories[i];
      }
      console.log(projectData);
      res.send(projectData);
    }
  }
  );
});
