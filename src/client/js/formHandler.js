const baseURL = "http://localhost";
const portID = 9000;



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

    console.log("::: Form Submitted :::");
    console.log(`${formText} ${baseURL} ${portID}`);
    fetch(`${baseURL}:${portID}/test`,initInfo)
    .then(res => res.json())
    .then(function(res) {
      document.getElementById('results').innerHTML = res.message;
        console.log(res);
    });
    console.log(initInfo);


}



export { handleSubmit }
