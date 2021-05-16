// script.js

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;
const body = document.querySelector("body");
const title = document.querySelector("h1");


// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);

        newPost.addEventListener('click', () => {
          var num = Array.prototype.indexOf.call(document.querySelector('main').children, newPost);
          router.setState("entry",num+1, newPost);
        });
      });
    });
});


const settingButton = document.querySelector("[alt='settings']");
settingButton.addEventListener('click', () => { 
  router.setState("settings");
});

title.addEventListener('click', () => { 
  router.setState("home");
 
});

window.onpopstate = function(event){
  if(event.state == null || event.state.page == "home"){
    router.setState("home");
  } else if(event.state.page == "settings"){
    router.setState("settings"); 
  } else {
    router.setState("entry", event.state.page, document.querySelector('main').children[event.state.page-1]);
    
  }
}

