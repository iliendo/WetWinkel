$('#addUser').on('submit', function(e) {
    e.preventDefault();
});


function addUser() {
    const voornaam = document.getElementById("voornaam").value;
    const tussenvoegsel = document.getElementById("tussenvoegsel").value;
    const achternaam = document.getElementById("achternaam").value;
    const email = document.getElementById("email").value;
    const geboortedatum = new Date(document.getElementById("geboortedatum").value);
    const isSuperuser = document.getElementById("superuser").options[document.getElementById("superuser").selectedIndex].value === "ja";
    const geboortejaar = geboortedatum.getFullYear();
    const standaardWachtwoord = voornaam + geboortejaar.toString();

    let url = "http://localhost:8080/wetwinkel_war/rest/user"; //TODO change this url when the server is online

    let data = {
        'naam': voornaam,
        'tussenvoegsel': tussenvoegsel,
        'achternaam': achternaam,
        'email': email,
        'superUser': isSuperuser,
        'wachtwoord': standaardWachtwoord,
        'nieuw': true
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            window.open("users.html", "_SELF");
        } else {
            //TODO show it didnt work and why (add snackbar)
            console.log("didn't work")
        }
    });
}