
document.getElementById('dateCours').valueAsDate = new Date();

var apiUrl = "https://script.google.com/macros/s/AKfycbyt2ZPXEjEJIVnFAdyjoUppYixxTllF3y-2W28O8lT_k9M2gxN5/exec";

$( "#add-form" ).on( "submit", function( event ) {
    event.preventDefault();
    makePost();
  });

function makePost() {
    var name = document.getElementById("nameCours").textContent;

    var date = document.getElementById('dateCours').valueAsDate;

    post();
}

function post (){
    $.ajax({
        url: apiUrl,
        type:'post',
        data: $('#add-form').serialize(),
        success:function(){
            alert("worked");
        }
    });
}