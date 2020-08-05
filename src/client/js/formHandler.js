const baseURL = "http://localhost";
const portID = 9000;
const totalUrl = `${baseURL}:${portID}/data`
let bufferDocument = new DocumentFragment(); // create fragment as change buffer

let formData = {};

import 'regenerator-runtime/runtime'


async function handleSubmit(event) {
  event.preventDefault();
// check what text was put into the form field
  let formText = document.getElementById('name').value;
  Client.checkURL(formText);
  console.log("::: Form Submitted :::");
  let requestURL = `${totalUrl}/?information=${formText}`;
  let res = await getDataFromServer(requestURL,formText)
  res=>res.json();
  console.log("formHandler 33:");
  console.log("API called successfully. Returned data: ");
  console.log("========================================");
  console.log(res);
  for (var id in res) {
    const storyTitle = res[id].title;
    const storySummary = res[id].summary[1];
    const storySource = res[id].source.name;
    const newStory = document.createElement('div');
    newStory.innerHTML = `${id}: ${storyTitle}: ${storySummary} (${storySource})` ;
    bufferDocument.appendChild(newStory);
  }
  let element = document.getElementById('results');
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
  element.appendChild(bufferDocument);
}

async function getDataFromServer(url = '',data = {}){
  const initInfo = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    redirect: 'follow',
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }
  const response = await fetch(url, initInfo);
  return response.json();
}


export { handleSubmit }
