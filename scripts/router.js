// router.js

export const router = {};


/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state, number, journal) {
  let body = document.querySelector("body");
  let title = document.querySelector("h1");
  let entryPage = document.querySelector("entry-page");
  
  if(state == "entry"){
    entryPage.remove(); 
    let newEntry = document.createElement("entry-page");
    newEntry.entry = journal.entry;
    body.appendChild(newEntry);
    body.className = "single-entry";
    let url = "#entry" + number;
    title.innerHTML = "Entry " + number;
    history.pushState({page:number}, title.innerHTML, url);

  } else if(state == "settings") {
    body.className = "settings";
    title.innerHTML = "Settings";
    var settings = "settings";
    history.pushState({page: settings}, title.innerHTML,  "#settings");
  } else { 
    body.className="";
    title.innerHTML = "Journal Entries";
    var home = "home"; 
    history.pushState({page: home}, title.innerHTML,  " ");
  }
}


