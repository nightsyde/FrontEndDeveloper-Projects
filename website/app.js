/* Global Variables */
let bufferDocument = new DocumentFragment(); // create fragment as change buffer


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// client side code for api
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
let apiKey = '&appid=e7e66ceeab7188cf96ef0bbe2e64b9ac';

document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const zipCode =  document.getElementById('zip').value;
  getWeather(baseURL,zipCode,apiKey);
}

function createNewPost(postData){
  // console.log(postData);
  const entryContainer = document.getElementById('entryHolder')
  const entryDate = document.getElementById('date');
  entryDate.innerHTML = `Date: ${postData.date}`;
  const entryTemp = document.getElementById('temp');
  entryTemp.innerHTML = `Tempurature: ${postData.temp}`;
  const entryContent = document.getElementById('content');
  entryContent.innerHTML = `Feeling: ${postData.content}`;
}

// parse weatherData for temperature
function parseWeatherData(data) {
  const currentTemp = Math.trunc((data.main.temp -273.15) * (9/5) + 32); // calculate F from K
  // console.log(`current temp: ${currentTemp}`);
  return currentTemp;
}

const getWeather = async (baseURL, zipCode, apiKey)=>{
  const res = await fetch(baseURL+zipCode+apiKey)
  try {
    const data = await res.json();
//    console.log(data)
    currentTemp = parseWeatherData(data);
    const feelings = document.getElementById('feelings').value;
    const dataToPost = {
      date: newDate,
      temp: currentTemp,
      content: feelings
    };
    const newData = await postData('',dataToPost);
    createNewPost(newData);
    return currentTemp;
  }catch(error) {
    console.log("error", error);  // appropriately handle the error
  }
}

// Post data to server cache
const postData = async ( url = 'http://localhost:9000', data = {})=>{
    // console.log(data);
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    try {
        const newData = await response.json();
        // console.log(newData);

        return newData
    }catch(error) {
      console.log('error:', error);
      // appropriately handle the error
    }
}

const reportProjectData = async (url = 'http://localhost:9000', data = {}) =>{
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
        'Content-Type': 'application/json',
    },
  })
  try {
    const projectData = await response.json();
    console.log(projectData);
    return;
  }catch(error) {
    console.log('error:', error);
    // appropriately handle the error
  }
}
