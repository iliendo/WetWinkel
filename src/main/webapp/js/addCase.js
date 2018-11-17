// Fill comboboxes when page is loaded
clientDDL();
werknemerDDL();
jurisdictieDDL();

document.getElementById("add_button").onclick = function () {
    myFunction();
};

/**
 * Fills the client dropdownlist with the client of the database
 */
function clientDDL() {
    let client = document.getElementById("client");
    let url = "http://localhost:8080/wetwinkel_war/rest/case/clients";

    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (value) {
        console.log(value);
        for (let i = 0; i < value.length; i++) {

            let client = value[i].initialen + " " + value[i].achternaam + " (" + value[i].postcode
                + ", " + value[i].huisnummer + ")";


            let option = document.createElement("OPTION");
            option.value = value[i].idClient;
            client.add(option);
        }
    });
}

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
        console.log(value);
        for (let i = 0; i < value.length; i++) {
            let employee;

            if (value[i].tussenvoegsel === undefined) {
                employee = value[i].naam + " " + value[i].achternaam;
            } else {
                employee = value[i].naam + " " + value[i].tussenvoegsel + " " + value[i].achternaam;
            }


            console.log(werknemer[0]);
            console.log(werknemer[1]);


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

function jurisdictieDDL() {
    let jurisdictie = document.getElementById("client");
    let url = "http://localhost:8080/wetwinkel_war/rest/case/clients";

    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (value) {
        for (let i = 0; i < value.length; i++) {

            let client = value[i].initialen + " " + value[i].achternaam + " (" + value[i].postcode
                + ", " + value[i].huisnummer + ")";


            let option = document.createElement("OPTION");
            let txt = document.createTextNode(client);
            option.appendChild(txt);
            option.value = value[i].idClient;
            jurisdictie.insertBefore(option, jurisdictie.lastChild);
        }
    });
}

function myFunction() {

    let naam = document.getElementById("client").value;
    let rechtsgebied = null;
    let status = null;
    let feiten = document.getElementById("feiten").value;
    let advies = document.getElementById("advies").value;
    let gearchiveerd = false;
    let idClient = document.getElementById("client");

    let url = "http://localhost:8080/wetwinkel_war/rest/case/"; //TODO change this url when the server is online
    let data = {
        'naam': naam,
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
            console.log("Shiiiit")
        }
    });
}