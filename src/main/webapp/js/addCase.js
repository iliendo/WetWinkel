clientDDL(); //fill comboboxes when page is loaded

document.getElementById("add_button").onclick = function () {
    myFunction();
};

function clientDDL() {
    var clientDDL = document.getElementById("jurisdictie");
    var url = "http://localhost:8080/wetwinkel_war/rest/case/clients";

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
                let option = document.createElement("OPTION");
                let txt = document.createTextNode(value[i].achternaam + " " + value[i].postcode);
                option.appendChild(txt);
                console.log(option);
                clientDDL.insertBefore(option, clientDDL.lastChild);
            }
    });
}

function clientDDL() {
    var clientDDL = document.getElementById("jurisdictie");
    var url = "http://localhost:8080/wetwinkel_war/rest/case/clients";

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
            let option = document.createElement("OPTION");
            let id = document.createElement("ID");
            let txt = document.createTextNode(value[i].achternaam + " " + value[i].postcode);
            option.appendChild(txt);
            clientDDL.insertBefore(option, clientDDL.lastChild);
        }
    });
}

function myFunction() {

    var naam = document.getElementById("client").value;
    var rechtsgebied = null;
    var status = null;
    var feiten = document.getElementById("feiten").value;
    var advies = document.getElementById("advies").value;
    var gearchiveerd = false;
    var idClient = 6;

    var url = "http://localhost:8080/wetwinkel_war/rest/case/"; //TODO change this url when the server is online
    var data = {
        'naam': naam,
        'rechtsgebied': rechtsgebied,
        'status': status,
        'feiten': feiten,
        'advies': advies,
        'gearchiveerd': gearchiveerd,
        'idClient': idClient
    };

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'authorization': 'bearer ' + sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            //TODO show it worked (redirect to all cases page)
        } else {
            //TODO show it didnt work and why (add snackbar)
        }
    });
}