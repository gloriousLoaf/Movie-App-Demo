/* Demo Movie Finder App:
 * This is a fun, free API: themoviedb.org
 * Check out their site, see the docs to register for an API key if you like.
 * I will send you my API separately. I did not include it in the GitHub repo,
 * because it would then be visible to anyone on the internet. You eventually
 * want to protect your API keys, and not have them visible as plain text on the web.
 * You will learn ways to protect them later in the course, but if the API is
 * free and you didn't put down a credit card to register for a key then it is
 * not that big of a deal. For instance, your class repo's NY Times solution has
 * the API key exposed.
 */

// You'll learn about imports later. This is importing the key from a file that I did
// not push to GH. Checkout the /demo-env.js file to see what it would look like.
import { API_KEY } from './env.js';

// INSTEAD of imports, copy and paste the key I sent you here as the value of API_KEY:
// var API_KEY = '';

/* API Paths */
// this var adds the key to the basic path to load the app with currently
// trending movies as soon as the user launches the app
var API_URL =
  'https:/api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=' +
  API_KEY +
  '&PAGE=1';
// we'll use this later to get images for the app, see line 90
var IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
// this is the API path to search by keyword, this is what the Search box uses
var SEARCH_API =
  'https:/api.themoviedb.org/3/search/movie?api_key=' + API_KEY + '&query="';

/* DOM manipulation in plain vanilla JS,
 * in jQuery it would look like var $main = $("#main");
 */
var main = document.getElementById('main');
var form = document.getElementById('form');
var search = document.getElementById('search');
// google getElementById & querySelector to see more examples

// show some content on load by passing the first API path to showMovies
getMovies(API_URL);

/* This app originally used the new JavaScript fetch() method, which you
 * will learn about soon. I took it out and wrote a jQuery version so you
 * could have another example to look at. It's the only jQuery in this app.
 */
function getMovies(url) {
  // pass an object to the ajax method, with url & GET, then pass the response
  $.ajax({
    url: url,
    method: 'GET',
  }).then(function (response) {
    var data = response;
    console.log(data);
    showMovies(data.results);
  });
}

// write query results to DOM
function showMovies(movies) {
  // clear old movies by setting everything in #main equal to blank string
  main.innerHTML = '';
  // loop through movies object, grab the info we need and create HTML with it
  for (var i = 0; i < movies.length; i++) {
    // getting all the things we need from the response, I like to name vars
    // to match what they look like in the response. See console.log line 72
    var title = movies[i].title;
    var poster_path = movies[i].poster_path;
    var vote_average = movies[i].vote_average;
    var overview = movies[i].overview;
    console.log(title, poster_path, vote_average, overview);

    // this creates a div in the html, just like NYTimes example
    var movieCard = document.createElement('div');
    // jQuery would look like movieCard.addClass('movie');
    movieCard.classList.add('movie');
    // tab index is an accessibility feature for keyboard users
    movieCard.tabIndex = 0;

    /* here is the business, Add to movieCard to build the cards!
     * This looks tricky, and soon you'll learn template literals,
     * which will make this a little easier. But it's still just
     * putting the HTML tags between single quotes, and using your
     * variables. Remember to think about where you need double quotes
     * inside you HTML, like assigning classes etc.
     */
    movieCard.innerHTML =
      '<img src="' +
      IMG_PATH +
      poster_path +
      '" alt="' +
      title +
      '">' +
      '<div class="movieInfo">' +
      '<h3>' +
      title +
      '</h3>' +
      '<span class="' +
      getClassByRate(vote_average) +
      '">' +
      vote_average +
      '</span>' +
      '</div>' +
      '<div class="overview">' +
      '<h3>Overview</h3>' +
      overview +
      '</div>';
    // again, that looks janky, but open chrome devtools and inspect the cards!

    // appendChild is plain JS, jQuery would just be main.append(movieCard);
    main.appendChild(movieCard);
  }
}

// convert rating to class for css color application
// see line 100 where this function is used to add a class to the rating
// kind of like the workday scheduler!
function getClassByRate(vote) {
  if (vote >= 8) {
    return 'green';
  } else if (vote >= 5) {
    return 'orange';
  } else {
    return 'red';
  }
}

// search box listener
form.addEventListener('submit', function (event) {
  event.preventDefault();
  // this var is whatever the user entered
  var searchTerm = search.value;
  // if searchTerm has a text value and is not blank
  if (searchTerm && searchTerm !== '') {
    // add the searchTerm to the end of the long search url and go
    getMovies(SEARCH_API + searchTerm);
  } else {
    // else, meaning it was blank, just reload the page
    window.location.reload();
  }
  // clear the old text from the search box
  search.value = '';
});
