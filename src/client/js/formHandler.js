const baseURL = "http://localhost";
const portID = 9000;
const totalUrl = `${baseURL}:${portID}/data`


function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);


    const initInfo = {
      method: 'POST',
      credentials: 'same-origin',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formText), // body data type must match "Content-Type" header
    }
    console.log(initInfo);

    console.log("::: Form Submitted :::");
    console.log(`${totalUrl} ${formText} ${initInfo} `);
    let requestURL = `${totalUrl}/?information=${formText}`;
    fetch(requestURL,initInfo)
    .then(res => res.json())
    .then(function(res) {
      document.getElementById('results').innerHTML = res.message;
      console.log(res);
    });
    getData(totalUrl,formText);


}

const getData = async (totalUrl, formText)=>{
  let requestURL = `${totalUrl}/?information=${formText}`;
  console.log(requestURL);
  const res = await fetch(requestURL);
  console.log(res);
  try {
    const data = await res.json();
    console.log(data);

  }catch(error) {
    console.log("error", error);  // appropriately handle the error
  }
}



export { handleSubmit }
