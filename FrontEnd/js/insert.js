

document.getElementById("clientForm").onsubmit = function (e){
    e.preventDefault();
};

document.getElementById("insert-button").onclick = function () {
    addClient();
};

function addClient() {

    console.log("adding Client insert.js:9");

    const initialen = document.getElementById("initialen").value;
    const tussenvoegsel = document.getElementById("tussenvoegsel").value;
    const achternaam = document.getElementById("achternaam").value;
    const straatnaam = document.getElementById("straatnaam").value;
    const postcode = document.getElementById("postcode").value;
    const huisnummer = document.getElementById("huisnummer").value;
    const toevoeging = document.getElementById("toevoeging").value;
    const land = document.getElementById("land").value;
    const telefoonnummer = document.getElementById("telefoonnummer").value;
    const email = document.getElementById("email").value;


    const url = "http://localhost:8080/wetwinkel_war/rest/client/"; //TODO change this url when the server is online
    const data = {'initialen': initialen, 'tussenvoegsel': tussenvoegsel, 'achternaam': achternaam, 'straatnaam': straatnaam, 'postcode': postcode, 'huisnummer': huisnummer, 'toevoeging': toevoeging, 'land': land, 'telefoonnummer': telefoonnummer, 'email': email, 'ontdekkingWw': 1};

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok){
            window.open("cases.html", "_SELF")
        }
    });

    // window.open("client.html", "_SELF");
}