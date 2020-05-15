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
let activeLink = document.getElementsByTagName('a')[0]; // global for link item with class 'active_Selection'
let activeSection = document.getElementsByTagName('section')[0]; // global for section item with class 'active_Selection'

/**
 * End Global Variables
 * Start Helper Functions
 *
*/
// create navigation bar from list of sections
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
// identify active_Selection elements
function findActive() {
  const oldActives = document.getElementsByClassName('active_Selection');
  activeSection = document.getElementsByClassName('active_Selection')[1];
  activeLink = document.getElementsByClassName('active_Selection')[0];
}

// remove active_Selection
function removeFocus() {
  activeLink.setAttribute('class','');
  activeSection.setAttribute('class','');
}

// Add class 'active' to section when near top of viewport
function changeFocus(newActive,newLink){
//  removeFocus();
  newLink.setAttribute('class','active_Selection');
  newActive.setAttribute('class','active_Selection');
}

// compare pageTop to top of each section
function get(last_known_scroll_position) {
  const sectionList = document.getElementsByTagName('section'); // get list of sections
  let viewportTop = window.visualViewport.pageTop; // get current top value of viewport
  let viewportMid = (window.visualViewport.height / 2) + viewportTop;
  let viewportBottom = window.visualViewport.height + viewportTop;
  for(sectionItem of sectionList){ // compare top value of each section to viewportTop
    let bounding = sectionItem.getBoundingClientRect();
    let variance = viewportTop - bounding.top;
    let sectionItemID = sectionItem.id;
    let sectionItemLink = document.getElementById(`${sectionItemID}NavLink`);
    if(viewportTop < bounding.top && bounding.top < viewportMid) {
//      console.log(`${bounding}`)
//      console.log(sectionItem,sectionItemLink);
      changeFocus(sectionItem,sectionItemLink);
    } else if (viewportMid < bounding.bottom) {
      removeFocus();
    } else if (bounding.top < viewportMid) {
      removeFocus();
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


// Scroll to anchor ID using scrollTO event
function linkClicked(evt) { // function to listen for when a link is clicked
  const chosenElement = document.getElementById(evt.target.id);
  //console.log(chosenElement + " clicked");
  const chosenLink = chosenElement.getAttribute('localName');
  //console.log(chosenLink);
  const chosenAnchor = document.getElementById(chosenLink);
  //console.log(chosenAnchor);
  chosenAnchor.scrollTo({behavior: 'smooth'});
  findActive();
  removeFocus();
  changeFocus(chosenAnchor,chosenElement);

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
/* window.addEventListener('scroll', function(e) {
  let last_known_scroll_position = window.scrollY;
  get(last_known_scroll_position);
}); */
