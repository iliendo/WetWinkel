// Fill comboboxes when page is loaded

$('#addCase').on('submit', function (e) {
    e.preventDefault();
});

$('#add_button').on('click', function (e) {
    e.preventDefault();
    addCase();
});

werknemerDDL();
clientDDL();
jurisdictieDDL();


function werknemerDDL() {
    let werknemer = document.getElementsByClassName("werknemer");
    let url = "http://localhost:8080/wetwinkel_war/rest/case/users";

    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + sessionStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (value) {
        for (let i = 0; i < value.length; i++) {
            let employee;

            if (value[i].tussenvoegsel === undefined) {
                employee = value[i].naam + " " + value[i].achternaam;
            } else {
                employee = value[i].naam + " " + value[i].tussenvoegsel + " " + value[i].achternaam;
            }

            for (let j = 0; j < werknemer.length; j++) {
                let option = document.createElement("OPTION");
                let txt = document.createTextNode(employee);
                option.appendChild(txt);
                option.value = value[i].idUser;

                werknemer[j].add(option);
            }
        }
    });
}

/**
 * Fills the client dropdown list with the client of the database
 */
function clientDDL() {
    let clientenDl = document.getElementById("client");
    let url = "http://localhost:8080/wetwinkel_war/rest/case/clients";

    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (clienten) {
        for (let i = 0; i < clienten.length; i++) {
            let client;

            if (clienten[i].tussenvoegsel === undefined) {
                client = clienten[i].initialen + " " + clienten[i].achternaam;
            } else {
                client = clienten[i].initialen + " " + clienten[i].tussenvoegsel + " " + clienten[i].achternaam;
            }

            let option = document.createElement("OPTION");
            let txt = document.createTextNode(client);
            option.appendChild(txt);
            option.value = clienten[i].idClient;
            clientenDl.add(option)
        }
    });
}

/**
 * Fills the client dropdown list with the client of the database
 */
function jurisdictieDDL() {
    let jurisdictie = document.getElementById("jurisdictie");
    let url = "http://localhost:8080/wetwinkel_war/rest/case/jurisdictie";

    fetch(url, {
        method: 'GET'
    }).then(function (response) {
        return response.text();
    }).then(function (value) {
        let jsons = value.split("-");
        let dutch = JSON.parse(jsons[0]);
        let constants = JSON.parse(jsons[1]);
        for (let i = 0; i < dutch.length; i++) {

            let jusridiction = dutch[i];

            let option = document.createElement("OPTION");
            let txt = document.createTextNode(jusridiction);
            option.appendChild(txt);
            option.value = constants[i];
            jurisdictie.add(option);
        }
    });
}

function addCase() {
    const rechtsgebied = document.getElementById("jurisdictie").value;
    const status = "OPEN";
    const feiten = document.getElementById("feiten").value;
    const advies = document.getElementById("advies").value;
    const gearchiveerd = false;
    const idClient = document.getElementById("client");
    const user1 = document.getElementById("werknemer1").value;
    const user2 = document.getElementById("werknemer2").value;

    let url = "http://localhost:8080/wetwinkel_war/rest/case?userIds=" + user1 + "&userIds=" + user2; //TODO change this url when the server is online

    let data = {
        'naam': idClient.options[idClient.selectedIndex].text,
        'rechtsgebied': rechtsgebied,
        'status': status,
        'feiten': feiten,
        'advies': advies,
        'gearchiveerd': gearchiveerd,
        'idClient': idClient.options[idClient.selectedIndex].value
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
            window.open("cases.html", "_self")
            //TODO show it worked (redirect to all cases page)
        } else {
            //TODO show it didnt work and why (add snackbar)
            console.log("didn't work")
        }
    });
}