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
let navBar = document.getElementById('navbar__list'); // get navbar__list from index.html
let bufferDocument = new DocumentFragment(); // create fragment as change buffer
let activeSection = 'irma'; // global for section item with class 'active_Selection'
let activeLink = 'bob'; // global for link item with class 'active_Selection'

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// create navigation bar from list of sections
function createNavBar(){
  const navItemList = document.getElementsByTagName('section'); // create list of sections
  for(const navItem of navItemList){
    const id = navItem.getAttribute('id'); // get id of section
    const navName = navItem.getAttribute('data-nav'); // get data-nav of section
    const li = document.createElement('li'); // create new <li>
    const newAnchor = document.createElement('a'); // create new <a>
    newAnchor.setAttribute('id',`${id}NavLink`); // set 'id' attribute of new <a>
    newAnchor.setAttribute('localName',id); // set 'localName' attribute of new <a>
    newAnchor.href = `#${id}`; // set <a href=''>
    newAnchor.innerHTML = navName; // set link text
    li.appendChild(newAnchor); // add <a> to <li>
    bufferDocument.appendChild(li); // add <li> to DocumentFragment
  }
}
// set initial values for active element variables
function setActive() {
  activeLink = document.getElementsByTagName('a')[0]; // set to first <a>
  activeSection = document.getElementsByTagName('section')[0]; // set to first <section>
}
// identify active_Selection elements
function findActive() {
  const oldActives = document.getElementsByClassName('active_Selection'); // get list of active elements
  activeSection = document.getElementsByClassName('active_Selection')[1]; // set active section to second element in list
  activeLink = document.getElementsByClassName('active_Selection')[0]; // set active link to first element of list
}
// remove active_Selection
function removeFocus() {
  activeLink.setAttribute('class',''); // remove all 'class' attributes from active link
  activeSection.setAttribute('class',''); // remove all 'class' attributes from active section
}
// Add class 'active' to section when near top of viewport
function changeFocus(){
  activeLink.setAttribute('class','active_Selection'); // assign active link to 'active_Selection' 'class'
  activeSection.setAttribute('class','active_Selection'); // assign active section to 'active_Selection' 'class'
}
function isInView(element) {
  let viewportTop = window.visualViewport.pageTop; // get current top value of viewport
  let viewportMid = (window.visualViewport.height / 2); // compute midpoint of viewport
  let viewportBottom = window.visualViewport.height + viewportTop; // compute bottom of viewport
  let bounding = element.getBoundingClientRect(); // get values of section bountries
  if(bounding.top >= 0) { // is top of section below the top of the viewport?
    if(bounding.top <= viewportMid) { // is top of section above the midpoint of the viewport?
      return true;
    } else if(bounding.bottom < viewportMid){ // is the bottom of the section above the midpoint of the viewport?
      return false;
    } else {
      return false;
    }
  }
}
// compare pageTop to top of each section
function get(last_known_scroll_position) {
  const sectionList = document.getElementsByTagName('section'); // get list of sections
  for(sectionItem of sectionList){
    let sectionItemID = sectionItem.id;
    let sectionItemLink = document.getElementById(`${sectionItemID}NavLink`);
    if(isInView(sectionItem)) { // is the section visible?
      removeFocus();
      activeLink = sectionItemLink;
      activeSection = sectionItem;
      changeFocus();
    }
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
setActive();



// Scroll to anchor ID using scrollTO event
function linkClicked(evt) { // function to listen for when a link is clicked
  evt.preventDefault();
  removeFocus();
  activeLink = document.getElementById(evt.target.id);
  //console.log(chosenElement + " clicked");
  const chosenLink = activeLink.getAttribute('localName');
  //console.log(chosenLink);
  activeSection = document.getElementById(chosenLink);
  //console.log(chosenAnchor);
  activeSection.scrollIntoView({behavior: 'smooth'});
  changeFocus();

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
 window.addEventListener('scroll', function(e) {
  let last_known_scroll_position = window.scrollY;
  get(last_known_scroll_position);
});
