// Setup empty JS object to act as endpoint for all routes
const projectData = [];

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

// Dependencies
const bodyParser = require('body-parser');
const http = require("http");

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 9000;
const server = app.listen(port, listening);

// callback to debug
function listening(){
  console.log('server running');
  console.log(`running on localhost: ${port}`);
};

// server side code for addEntry
app.post('', addEntry);
function addEntry(req,res){
  newEntry = {
    date: req.body.date,
    temp: req.body.temp,
    content: req.body.content
  }
  let count = projectData.push(newEntry);
  console.log(newEntry);
  console.log(projectData);
  res.send(newEntry);
}

app.get('', reportData);
function reportData(req,res){
  res.sent(projectData);
}
