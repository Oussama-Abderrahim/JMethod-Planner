
var SCRIPT_ID = "M03gl6uGURqOwJt4wg-IiZAMT48mCopNc";

$(document).ready(function() {
	clearInputs();

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


/*=========================================================
          ***       Sign in Methods      ***
===========================================================*/

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
    loadModule();
    $("#signin-splash").fadeOut(500);
  });
}

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

/*=========================================================
          ***       Submit Forms      ***
===========================================================*/

function inputValid(module, nom, date) {
  if(module === undefined || module === "") return false; 
  if(nom === undefined || nom === "") return false; 
  if(date === undefined || date == "") return false; 
  return true;
}

function submitForm() {
  checkSignedIn(function() {
    var nomCours = document.getElementById("nameCours").value;
    var date = document.getElementById('dateCours').valueAsDate;
    var e = document.getElementById("nameModule");
    var module = e.options[e.selectedIndex].text;

    if(inputValid(module, nomCours, date)) {
      $("#load-screen").css("visibility", "visible");

      callScriptFunction("addCours", [module, nomCours, date], function(){
        clearInputs();
        $("#load-screen").css("visibility", "hidden");
      });
    }
    else {
      alert("Vous avez bien tout tappé ? ^_^");
    }
  });
}

/*=========================================================
          ***       Load methods       ***
===========================================================*/

function clearInputs() {
	document.getElementById("nameCours").value = "";
	document.getElementById('dateCours').valueAsDate = new Date();
}

function loadModule(){

  callScriptFunction("getCalendarsNames", [], function(resp){
    
    var selectBox = document.getElementById("nameModule");
    var modules = resp.result.response.result;

    // Clear all options 
    var i;
      for(i = selectBox.options.length - 1 ; i >= 0 ; i--)
      {
          selectBox.remove(i);
      }

      if(modules.length === 0) {
        // Add default option ( autres )
        var option = document.createElement("option");
      option.text = "Autres";
      selectBox.add(option);
    } else {
      // Add others
      modules.forEach(function(v){
        var option = document.createElement("option");
        option.text = v;
        selectBox.add(option);
      });
    }
  })
}

function changeModule(){
  var select = document.getElementById("nameModule");
  var module = e.options[e.selectedIndex].value;

  console.log("module");
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

    /// TODO : check days here
    $("#load-screen").css("visibility", "visible");
    callScriptFunction("updateDays", [strDays], function(resp){
      $("#load-screen").css("visibility", "hidden");
      showDays();  
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

      $("#jours").html("Jours : " + days.join(", "));
      var i = 0;

      days.forEach(function(v){
        $("#j"+i+"-block").val(v);
        i++;
      });
    });
  })
}