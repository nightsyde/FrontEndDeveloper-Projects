const baseURL = "http://localhost";
const portID = 9000;
function handleSubmit(event) {
    event.preventDefault();

    // check what text was put into the form field
    let formText = document.getElementById('name').value;
    Client.checkForName(formText);

    console.log("::: Form Submitted :::");
    fetch(`${baseURL}:${portID}/test`)
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = res.message;
        console.log(res);
    })
}

export { handleSubmit }
