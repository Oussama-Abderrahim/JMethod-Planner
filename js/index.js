
document.getElementById('dateCours').valueAsDate = new Date();



// Client ID and API key from the Developer Console
var CLIENT_ID = '59984866590-pduc6g4te31dc440auimjt5mpjsmakf5.apps.googleusercontent.com';

// Array of API discovery doc URLs for APIs used by the quickstart
var DISCOVERY_DOCS = ["https://script.googleapis.com/$discovery/rest?version=v1"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
var SCOPES = 'https://www.googleapis.com/auth/calendar https://www.google.com/calendar/feeds';

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

/**
*  On load, called to load the auth2 library and API client library.
*/
function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

/**
*  Initializes the API client library and sets up sign-in state
*  listeners.
*/
function initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(signIn);
}


/**
* Load the API and make an API call.  Display the results on the screen.
*/
function callScriptFunction() {
    var scriptId = "M03gl6uGURqOwJt4wg-IiZAMT48mCopNc";

    var nomCours = document.getElementById("nameCours").value;
    var date = document.getElementById('dateCours').valueAsDate;

    // Call the Execution API run method
    //   'scriptId' is the URL parameter that states what script to run
    //   'resource' describes the run request body (with the function name
    //              to execute)
    gapi.client.script.scripts.run({
      'scriptId': scriptId,
      'resource': {
        "function": "addCours",
        "parameters": [
          nomCours,
          date
        ]
      }
    }).then(function(resp) {
      alert("Done !");
    });
}

function signIn() {
    gapi.auth2.getAuthInstance().signIn().then(callScriptFunction);
}

$('#add-form').submit(function(e){
    e.preventDefault();

    handleClientLoad();

});
