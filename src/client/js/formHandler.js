const baseURL = "http://localhost";
const portID = 9000;
const totalUrl = `${baseURL}:${portID}/data`


function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);
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
  console.log(`formHandler 24: ${totalUrl}`);
  console.log("formHandler 25 initInfo: ");
  console.log(initInfo);
  console.log(requestURL);
  const res = await fetch(requestURL,initInfo);
  console.log("formHandler 29 res: "+res);
  try {
    const data = res.json();
    document.getElementById('results').innerHTML = res.message;
    console.log(res);
    console.log("formHandler 34 "+data);
  }catch(error) {
    console.log("formHandler 36 error", error);  // appropriately handle the error
  }
}



export { handleSubmit }
