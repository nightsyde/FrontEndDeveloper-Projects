const baseURL = "http://localhost";
const portID = 9000;
const totalUrl = `${baseURL}:${portID}/data`


function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
//    Client.checkForName(formText);
    console.log("::: Form Submitted :::");
    getData(totalUrl,formText);
}

const getData = async (totalUrl, formText)=>{
  let requestURL = `${totalUrl}/?information=${formText}`;
  const initInfo = {
    method: 'POST',
    credentials: 'same-origin',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(formText), // body data type must match "Content-Type" header
  }
  const res = await fetch(requestURL,initInfo);
  try {
    const data = res.json();
    console.log(res);
    console.log("formHandler 28:");
    console.log("API called successfully. Returned data: ");
    console.log("========================================");
    for (var i = 0; i < data.stories.length; i++) {
      console.log(data.stories[i].title + " / " + data.stories[i].source.name);
    }
    document.getElementById('results').innerHTML = res.body;

  }catch(error) {
    console.log("formHandler 37 error", error);  // appropriately handle the error
  }
}

export { handleSubmit }
