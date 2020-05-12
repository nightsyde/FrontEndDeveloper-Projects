/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
*/

/**
 * Define Global Variables
 *
*/
let navBar = document.getElementById('navbar__list');
let bufferDocument = new DocumentFragment();

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
function createNavBar(){
  let navItemList = document.getElementsByClassName('landing__container');
  for(navItem of navItemList){
    let li = document.createElement('li'); /* create new <li> */
    let newAnchor = document.createElement('a'); /* create new <a> */
    newAnchor.href = '#' + document.navItem.name; /* set <a href=''> */
    newAnchor.innerHTML = document.navItem.text; /* set link text */
    li.appendChild(newAnchor); /* add <a> to <li> */
    bufferDocument.appendChild(li); /* add <li> to DocumentFragment */
  }
}
function changeFocus(){

}

/**
 * End Helper Functions
 * Begin Main Functions
 *
*/

// build the nav
createNavBar();
navBar.appendChild(bufferDocument);

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click

// Set sections as active
