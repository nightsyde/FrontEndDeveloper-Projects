function checkForName(inputText) {
    console.log("::: Running checkForName :::", inputText);
    let names = [
        "Picard",
        "Janeway",
        "Kirk",
        "Archer",
        "Georgiou",
        "Sisko",
        "Pike"
    ]

    if(names.includes(inputText)) {
        alert("Welcome, Captain!")
        fetch(`${baseURL}:${portID}/bioFetch`)
        .then(res => res.json())
        .then(function(res) {
            document.getElementById('results').innerHTML = res.message
        })

    }
}

export { checkForName }
