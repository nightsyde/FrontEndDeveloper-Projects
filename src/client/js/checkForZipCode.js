function checkZipCode(inputText) {
    console.log("::: Running checkZipCode :::", inputText);
    var pattern = /[0-9]{5}([- ]?[0-9]{4})?/;



    if(!!pattern.test(inputText)) {
//       alert(`${inputText} is a Zipcode`)
    } else {
//      alert(`${inputText} is a City`)
    }
    return !!pattern.test(inputText);
}

export { checkZipCode }
