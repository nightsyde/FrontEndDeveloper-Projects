const baseURL = "http://localhost";
const portID = 9000;
const totalUrl = `${baseURL}:${portID}`
let bufferDocument = new DocumentFragment(); // create fragment as change buffer
let formData = {};
let imageURL = '';
let dataToPost = {};
let location = '';
let cityName = '';
let stateName = '';
let travelDate = new Date();
let timeDifference = '';
let tempToPost = '';
let condToPost ='';

const geoNamesKey='nightside1313';
const weatherAPIKEY='f77c86657daa470c98eea20e29af9467';
const pixabayAPIKEY='14246493-aa72736588a91c2f68f608bff';

// Create a new date instance dynamically with JS
let today = new Date();
let newDate = today.getFullYear()+'-'+ today.getMonth()+'-'+ today.getDate();


import 'regenerator-runtime/runtime'

document.getElementById('generate').addEventListener('click', handleSubmit);


async function handleSubmit(e){
  event.preventDefault();
  location =  document.getElementById('locationData').value;
  travelDate.setTime(Date.parse(document.getElementById('travelDates').value));
  if (Client.checkZipCode(location)){
    let fetchURL = `${totalUrl}/zip2name`;
    fetchURL = `http://api.geonames.org/postalCodeLookupJSON?postalcode=${location}&country=US&username=${geoNamesKey}`;
    let res = await fetch(fetchURL);
    try {
      let placeInfo = await res.json();
      cityName = placeInfo.postalcodes[0].placeName;
      stateName = placeInfo.postalcodes[0].adminName1;
    }catch(error){
      console.log("46 error: ",error);
    }
  } else {
    cityName = location.substring(0,location.indexOf(","));
    stateName = location.substring(location.indexOf(",")+1,99);
    // console.log(`53: ${cityName} ${stateName}`);
  }
  var msPerDay = 24 * 60 * 60 * 1000;
  timeDifference = (travelDate.getTime() - today.getTime())/msPerDay;
  timeDifference = Math.round(timeDifference);
//  console.log("55: "+ timeDifference);
  if(timeDifference<15){
    await getWeather(totalUrl,cityName);
    tempToPost = dataToPost[timeDifference+1].temp;
    condToPost = dataToPost[timeDifference+1].conditions;
  }else{
    tempToPost = "Please choose a sooner date",
    condToPost = "Thank you"
  }

  await getPictures(totalUrl,cityName);


  postData();
}

const getPictures = async (homeURL,cityName) => {
  var searchCityName = cityName.substring(0,cityName.indexOf(" "))+"+"+cityName.substring(cityName.indexOf(" "),99);
  let fetchURL = `https://pixabay.com/api/?key=${pixabayAPIKEY}&q=${searchCityName}+${stateName}&image_type=photo&pretty=true`
//  console.log("69: ");
//  console.log(fetchURL);
  const res = await fetch(fetchURL);
  try {
    const data = await res.json();
//    console.log(data);
    if(data.totalHits > 0){
      imageURL = data.hits[0].previewURL;
//      console.log(imageURL);
    }else{
      imageURL = '/media/sadface.jpg';

    }
  }catch(error){
    console.log("75 error: ", error);
  }
}

const getWeather = async (homeURL, cityName)=>{
  let fetchURL = `${homeURL}/weather`;
//  console.log("81: ");
  // const weatherAPIKEY = await fetch(fetchURL);
  fetchURL = `https://api.weatherbit.io/v2.0/forecast/daily?city=${cityName}, ${stateName}&units=I&key=${weatherAPIKEY}`;
//  console.log(fetchURL);
  const weatherData = await fetch(fetchURL);
  try {
    const data = await weatherData.json();
//    console.log(data.data)
    for(var index in data.data){
      let forcastDate = data.data[index].valid_date;
      let forcastTemp = data.data[index].temp;
      let forcastConditions = data.data[index].weather.description;
      // const date = document.getElementById('dataData').value;
      dataToPost[index] = {
        date: forcastDate,
        temp: forcastTemp,
        conditions: forcastConditions
      }
    };
//    console.log(dataToPost);
    return dataToPost;
  }catch(error) {
    console.log("103: error", error);  // appropriately handle the error
  }
}

function postData() {
  let entryContainer = document.getElementById('tripDetails');
  const entryPicture = document.getElementById('destinationPicture');
  const newPicture = document.getElementById('picture');
    newPicture.setAttribute("src", `${imageURL}`);
    newPicture.setAttribute("alt",`${cityName}, ${stateName}`)
    entryPicture.appendChild(newPicture);
    bufferDocument.appendChild(entryPicture);
  const entryLocation = document.getElementById('locationName');
    entryLocation.innerHTML = `${cityName}, ${stateName}`;
    bufferDocument.appendChild(entryLocation);
  const entryWeatherData = document.getElementById('weatherInformation');
    const entryDate = document.getElementById('date');
      entryDate.innerHTML = `Date: ${travelDate}`;
      entryWeatherData.appendChild(entryDate);
    const entryTemp = document.getElementById('temp');
      entryTemp.innerHTML = `Tempurature: ${tempToPost}`;
      entryWeatherData.appendChild(entryTemp);
    const entryConditions = document.getElementById('conditions');
      entryConditions.innerHTML = `Conditions: ${condToPost}`;
      entryWeatherData.appendChild(entryConditions);
    bufferDocument.appendChild(entryWeatherData);
  let element = document.getElementById('tripDetails');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  };
  element.appendChild(bufferDocument);


}

function parseWeatherData(data) {
  const currentTemp = Math.trunc((data.main.temp -273.15) * (9/5) + 32); // calculate F from K
  // console.log(`current temp: ${currentTemp}`);
  return currentTemp;
}

async function getDataFromServer(url,data){
  console.log("125: ");
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
  console.log("137: ");
  console.log(response);
  return response;
}

export { handleSubmit }
