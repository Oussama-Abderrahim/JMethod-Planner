
document.getElementById('dateCours').valueAsDate = new Date();

var apiUrl = "https://script.google.com/macros/s/AKfycbyt2ZPXEjEJIVnFAdyjoUppYixxTllF3y-2W28O8lT_k9M2gxN5/exec";



function makePost() {
    var name = document.getElementById("nameCours").textContent;

    var date = document.getElementById('dateCours').valueAsDate;

    post(apiUrl, {name, date});
}

function post(path, params, method) {
    method = method || "post"; // Set method to post by default if not specified.

    // The rest of this code assumes you are not using a library.
    // It can be made less wordy if you use one.
    var form = document.createElement("form");
    form.setAttribute("method", method);
    form.setAttribute("action", path);

    for(var key in params) {
        if(params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            form.appendChild(hiddenField);
         }
    }

    document.body.appendChild(form);
    form.submit();
}