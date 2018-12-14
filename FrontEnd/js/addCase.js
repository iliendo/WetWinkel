// Fill comboboxes when page is loaded
werknemerDDL();
clientDDL();
jurisdictieDDL();

document.getElementById("add_button").onclick = function () {
    addCase();
};

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
        return response.json();
    }).then(function (value) {
        console.log(value);
        for (let i = 0; i < value.length; i++) {

            let rechtsgebied = value[i];

            let option = document.createElement("OPTION");
            let txt = document.createTextNode(rechtsgebied);
            option.appendChild(txt);
            jurisdictie.add(option);
        }
    });
}

function addCase() {

    let naam = document.getElementById("client").value;
    let rechtsgebied = document.getElementById("jurisdictie").value;
    let status = "open";
    let feiten = document.getElementById("feiten").value;
    let advies = document.getElementById("advies").value;
    let gearchiveerd = false;
    let idClient = document.getElementById("client");
    let user1 = document.getElementById("werknemer1").value;
    let user2 = document.getElementById("werknemer2").value;

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
            //TODO show it worked (redirect to all cases page)
            console.log("its all good man");
        } else {
            //TODO show it didnt work and why (add snackbar)
            console.log("didn't work")
        }
    });
}