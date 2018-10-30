document.getElementById("insert-button").onclick = function () {
    console.log("hoi ik ben henk");
    myFunction();
};

function myFunction() {

    var initialen = document.getElementById("initialen").value;
    var tussenvoegsel = document.getElementById("tussenvoegsel").value;
    var achternaam = document.getElementById("achternaam").value;
    var straatnaam = document.getElementById("straatnaam").value;
    var postcode = document.getElementById("postcode").value;
    var huisnummer = document.getElementById("huisnummer").value;
    var toevoeging = document.getElementById("toevoeging").value;
    var land = document.getElementById("land").value;
    var telefoonnummer = document.getElementById("telefoonnummer").value;
    var email = document.getElementById("email").value;


    var url = "http://localhost:8080/wetwinkel_war/rest/client/add"; //TODO change this url when the server is online
    var data = {'initialen': initialen, 'tussenvoegsel': tussenvoegsel, 'achternaam': achternaam, 'straatnaam': straatnaam, 'postcode': postcode, 'huisnummer': huisnummer, 'toevoeging': toevoeging, 'land': land, 'telefoonnummer': telefoonnummer, 'email': email, 'ontdekkingWw': 1};

    console.log(sessionStorage.getItem("token"));

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'authorization': 'bearer ' + sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    }).then();

    window.open("client.html", "_SELF");
}