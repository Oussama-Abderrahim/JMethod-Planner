
document.getElementById('dateCours').valueAsDate = new Date();

var signedIn = false;

/**
* Load the API and make an API call.  Display the results on the screen.
*/
function callScriptFunction(functionName, params) {
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
      alert("Done !");
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

function submitForm() {

  checkSignedIn(function() {
    var nomCours = document.getElementById("nameCours").value;
    var date = document.getElementById('dateCours').valueAsDate;

    if(inputValid(nomCours, date)) {
      callScriptFunction("addCours", [nomCours, date]);
    }
    else {
      alert("invalid input");
    }
  });

}


$('#add-form').submit(function(e){
    e.preventDefault();

    submitForm();
});
