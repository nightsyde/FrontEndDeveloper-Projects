function checkZipCode(inputText) {
    console.log("::: Running checkZipCode :::", inputText);
    var pattern = /[0-9]{5}([- ]?[0-9]{4})?/;



    if(!!pattern.test(inputText)) {
       alert("You submitted a City.")
    }
    return !!pattern.test(inputText);
}

export { checkZipCode }
