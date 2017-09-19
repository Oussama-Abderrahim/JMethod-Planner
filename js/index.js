
var SCRIPT_ID = "M03gl6uGURqOwJt4wg-IiZAMT48mCopNc";

$(document).ready(function() {
	document.getElementById('dateCours').valueAsDate = new Date();

	$('#add-form').submit(function(e){
	    e.preventDefault();

	    submitForm();
	});

	$('#days-form').submit(function(e){
	    e.preventDefault();

	    updateDays();
	});

	$("#btn-days").on("click", function(e){
	  e.preventDefault();
	});
		
	if(isSignedIn()) {
		signInAction();
	};
});


/**
* Load the API and make an API call.  call cb() with response .
*/
function callScriptFunction(functionName, params, cb) {
    // Call the Execution API run method
    //   'scriptId' is the URL parameter that states what script to run
    //   'resource' describes the run request body (with the function name
    //              to execute)
    gapi.client.script.scripts.run({
      'scriptId': SCRIPT_ID,
      'resource': {
        "function": functionName,
        "parameters": params
      }
    }).then(function(resp) {
      cb(resp);
    });
}


function isSignedIn(){
	if(!gapi.auth2 || !gapi.auth2.getAuthInstance())
  		return false;

  	return gapi.auth2.getAuthInstance().isSignedIn.get();
}

/**
*  Check if user is signed in, if not sign in, and call cb()
*/
function checkSignedIn(cb) {
	if(!isSignedIn()) {
	    googleSignIn(function(){
	      cb();  
		});
	}
	else {
		cb();
	}
}


function signInAction() {
  checkSignedIn(function(){
    showDays();
    $("#signin-splash").fadeOut(500);
  });
}


function inputValid(nom, date) {
  if(nom === undefined || nom === "") return false; 
  if(date === undefined || date == "") return false; 
  return true;
}


function submitForm() {
  checkSignedIn(function() {
    var nomCours = document.getElementById("nameCours").value;
    var date = document.getElementById('dateCours').valueAsDate;

    if(inputValid(nomCours, date)) {
      callScriptFunction("addCours", ["Cours", nomCours, date], function(){
        alert("Done !");
      });
    }
    else {
      alert("Vous avez bien tout tappé ? ^_^");
    }
  });
}

/**
*  set days in Google calendar script, 
*  call showDays()
*/
function updateDays(){
  checkSignedIn(function() {
    var days = [];

    for(var i = 0; i < 6; i++) {
      days.push($("#j"+i+"-block").val());
    }
    var strDays = days.join("-");

    //check days here
    callScriptFunction("updateDays", [strDays], function(resp){
      showDays();  
      alert("done");
    });
  });
}

/**
*  get days from Google calendar script, 
*  print days on inputs and #jours text
*/
function showDays() {
  checkSignedIn(function(){
    callScriptFunction("getDays", [], function(resp){
      var days = resp.result.response.result;

      $("#jours").html("Jours : " + days);
      var i = 0;

      days.forEach(function(v){
        $("#j"+i+"-block").val(v);
        i++;
      });
    });
  })
}