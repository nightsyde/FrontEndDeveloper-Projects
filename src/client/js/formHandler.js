const baseURL = "http://localhost";
const portID = 9000;
const totalUrl = `${baseURL}:${portID}`
let bufferDocument = new DocumentFragment(); // create fragment as change buffer
let formData = {};
let imageURL = '';
let dataToPost = {};
let location = '';
let cityName = '';

const geoNamesKey='nightside1313';
const weatherAPIKEY='f77c86657daa470c98eea20e29af9467';
const pixabayAPIKEY='14246493-aa72736588a91c2f68f608bff';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getFullYear()+'-'+ d.getMonth()+'-'+ d.getDate();


import 'regenerator-runtime/runtime'

document.getElementById('generate').addEventListener('click', handleSubmit);


async function handleSubmit(e){
  event.preventDefault();
  location =  document.getElementById('locationData').value;
  const date = document.getElementById('travelDates').value;
  console.log(`25: ${location} ${date} ${newDate}`)
  if (Client.checkZipCode(location)){
    let fetchURL = `${totalUrl}/zip2name`;
//    const geoNamesKey = await fetch(fetchURL);
//    geoNamesKey=>geoNamesKey.json();
    console.log(`30: ${geoNamesKey}`)
    console.log(geoNamesKey);
    fetchURL = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${location}&country=US=&username=${geoNamesKey}`;
    let placeInfo = fetch(fetchURL);
    placeInfo=>placeInfo.json();
    console.log(`35: ${placeInfo}`)
    console.log(placeInfo);
  } else {
    cityName = location;
    console.log(`39: ${cityName}`);
  }
  console.log("41: "+date - newDate);
  await getWeather(totalUrl,cityName);

  await getPictures(totalUrl,cityName);
  postData();
}

const getPictures = async (homeURL,cityName) => {
  let fetchURL = `${homeURL}/pictures`;
  console.log("50:");
  console.log(fetchURL);
//  const pictureAPIKEY = await fetch(fetchURL);
  console.log("50:");
  console.log(pixabayAPIKEY);
  fetchURL = `https://pixabay.com/api/?key=${pixabayAPIKEY}&q=${cityName}&image_type=photo`
  const res = await getDataFromServer(fetchURL,cityName);
  try {
    const data = await res.json();
    imageURL = data.pageURL;
  }catch(error){
    console.log("error: ", error);
  }
}

const getWeather = async (homeURL, cityName)=>{
  let fetchURL = `${homeURL}/weather`;
  console.log("67:");
  console.log(fetchURL);
//  const weatherAPIKEY = await fetch(fetchURL);
  fetchURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}&key=${weatherAPIKEY}`;
  const weatherData = await fetch(fetchURL);
  try {
    const data = await weatherData.json();
    console.log(data)
    currentTemp = data.temp;
    currentConditions = data.condition;
    // const date = document.getElementById('dataData').value;
    dataToPost = {
      date: newDate,
      temp: currentTemp,
      condition: currentConditions
    };
    return dataToPost;
  }catch(error) {
    console.log("79:error", error);  // appropriately handle the error
  }
}

function postData() {
  const entryContainer = document.getElementById('entryHolder');
  const entryPicture = document.getElementById('picture');
  const newPicture = document.createElement('a');
  newPicture.innerHTML = `href=${imageURL}" alt="${cityName}"`;
  entryPicture.appendChild(newPicture);
  const entryLocation = document.getElementById('locationName');
  entryLocation.innerHTML = cityName;
  const entryDate = document.getElementById('date');
  entryDate.innerHTML = `Date: ${dataToPost.date}`;
  const entryTemp = document.getElementById('temp');
  entryTemp.innerHTML = `Tempurature: ${dataToPost.temp}`;

}

function parseWeatherData(data) {
  const currentTemp = Math.trunc((data.main.temp -273.15) * (9/5) + 32); // calculate F from K
  // console.log(`current temp: ${currentTemp}`);
  return currentTemp;
}

async function getDataFromServer(url,data){
  console.log("111:");
  console.log(url);
  const initInfo = {
    method: 'GET',
    credentials: 'omit',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow'

  }
  console.log(initInfo);
  const response = await fetch(url);
  response=>response.json();
  console.log("123:");
  console.log(response);
  return response;
}

export { handleSubmit }
