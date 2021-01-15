# Movie App

### Search the most popular movies with ratings from API  
On loading the applet, the user receives search results for trending movies. The user can then use the search box to look up specific movies or query words related to what they want to view.  

This uses [The Movie Database's API](https://developers.themoviedb.org/3/getting-started/introduction) to pull data. It is free to use for developers, just sign up for an API key. I have hidden mine in an uncommitted JS file, but I did include a dummy version to show how the syntax works.  

For this version of the app, I have removed most of the advanced syntax and replaced it with old school JavaScript syntax. I also add jQuery into this version to show an AJAX call.  

---
### 🔎 Important!
To make this work, **paste the API key** into the value of this variable on *line 14* of `script.js`:
```
var API_KEY = '';
```