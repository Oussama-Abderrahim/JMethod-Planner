
document.getElementById('dateCours').valueAsDate = new Date();

var signedIn = false;

/**
* Load the API and make an API call.  Display the results on the screen.
*/
function callScriptFunction(functionName, params, cb) {
    var scriptId = "M03gl6uGURqOwJt4wg-IiZAMT48mCopNc";

    // Call the Execution API run method
    //   'scriptId' is the URL parameter that states what script to run
    //   'resource' describes the run request body (with the function name
    //              to execute)
    gapi.client.script.scripts.run({
      'scriptId': scriptId,
      'resource': {
        "function": functionName,
        "parameters": params
      }
    }).then(function(resp) {
      cb(resp);
    });
}


function checkSignedIn(cb) {
  if(!signedIn) {
    googleSignIn(function(){
      signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
      cb();  
    });
  }
  else {
    cb();
  }
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
        alert("done");
      });
    }
    else {
      alert("invalid input");
    }
  });

}

function updateDays(){
  checkSignedIn(function() {
    var days = [$("#j0-block").val(),
                $("#j1-block").val(),
                $("#j2-block").val(),
                $("#j3-block").val(),
                $("#j4-block").val(),
                $("#j5-block").val()
                ].join("-");

    //check days here

    callScriptFunction("updateDays", [days], function(resp){
      showDays([0, 2, 3, 7, 30, 60]);  
    });
  });
}

$('#add-form').submit(function(e){
    e.preventDefault();

    submitForm();
});

$('#days-form').submit(function(e){
    e.preventDefault();

    updateDays();
});

function signIn() {
  checkSignedIn(function(){
    showDays([0, 2, 3, 7, 30, 60]);
    $("#signin-splash").fadeOut(500);
  })

}

function showDays(days) {
  checkSignedIn(function(){
    $("#jours").val("Jours : " + days);
    var i = 0;

    days.forEach(function(v){
      $("#j"+i+"-block").val(v);
    });

  })
}