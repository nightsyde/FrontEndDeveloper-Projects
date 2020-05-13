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
  const navItemList = document.getElementsByTagName('section');
  for(const navItem of navItemList){
    const id = navItem.getAttribute('id'); /* get id of section */
    const navName = navItem.getAttribute('data-nav'); /* get data-nav of section */
    const li = document.createElement('li'); /* create new <li> */
    const newAnchor = document.createElement('a'); /* create new <a> */
    newAnchor.setAttribute('id',`${id}NavLink`);
    newAnchor.setAttribute('localName',id);
    newAnchor.href = `#${id}` /* set <a href=''> */
    newAnchor.innerHTML = navName; /* set link text */
    li.appendChild(newAnchor); /* add <a> to <li> */
    bufferDocument.appendChild(li); /* add <li> to DocumentFragment */
  }
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
function changeFocus(newActive){
  const oldActive = document.getElementsByClassName('active_Selection')[0];
  oldActive.setAttribute('class','');
  newActive.setAttribute('class','active_Selection');
}

// Scroll to anchor ID using scrollTO event
function linkClicked(evt) { // function to listen for when a link is clicked
  const chosenElement = document.getElementById(evt.target.id);
  //console.log(chosenElement + " clicked");
  const chosenLink = chosenElement.getAttribute('localName');
  //console.log(chosenLink);
  const chosenAnchor = document.getElementById(chosenLink);
  //console.log(chosenAnchor);
  chosenAnchor.scrollTo({behavior: 'smooth'});
  changeFocus(chosenAnchor);

}


/**
 * End Main Functions
 * Begin Events
 *
*/

// Build menu

// Scroll to section on link click
navBar.addEventListener('click', linkClicked);

// Set sections as active
