/* Global Variables */
let bufferDocument = new DocumentFragment(); // create fragment as change buffer
const homeURL = 'http://localhost:9000';
let weatherGet = '/weatherCity';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'-'+ d.getDate()+'-'+ d.getFullYear();

// client side code for api


document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const location =  document.getElementById('locationData').value;
  const date = document.getElementById('travelDates').value;
  if (checkZipCode(location)){
    weatherGet = '/weatherCity';
  }else{
    weatherGet = '/weatherZIP';
  }
  if(date - newDate <= 7){
    getWeather(homeURL,location);
  }
  getPictures(location);
}

function createNewPost(postData){
  // console.log(postData);
  const entryContainer = document.getElementById('entryHolder')
  const entryDate = document.getElementById('date');
  entryDate.innerHTML = `Date: ${postData.date}`;
  const entryTemp = document.getElementById('temp');
  entryTemp.innerHTML = `Tempurature: ${postData.temp}`;
}

// parse weatherData for temperature
function parseWeatherData(data) {
  const currentTemp = Math.trunc((data.main.temp -273.15) * (9/5) + 32); // calculate F from K
  // console.log(`current temp: ${currentTemp}`);
  return currentTemp;
}

const getPictures = async (homeURL,location) => {
  const fetchURL = `${homeURL}/pictures/?location=${location}`
  const res = await fetch(fetchURL)
  try {
    const data = await res.json();
    pictureLink = ;
  }catch(error){
    console.log("error: ", error);
  }
}

const getWeather = async (homeURL, location)=>{
  const fetchURL = `${homeURL}${weatherGet}/?location=${location}`
  const res = await fetch(fetchURL)
  try {
    const data = await res.json();
//    console.log(data)
    currentTemp = parseWeatherData(data);
    // const date = document.getElementById('dataData').value;
    const dataToPost = {
      date: newDate,
      temp: currentTemp,
    };
    const newData = await postData('',dataToPost);
    createNewPost(newData);
    return currentTemp;
  }catch(error) {
    console.log("error", error);  // appropriately handle the error
  }
}

// Post data to server cache
const postData = async ( url = homeURL, data = {})=>{
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

const reportProjectData = async (url = homeURL, data = {}) =>{
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
