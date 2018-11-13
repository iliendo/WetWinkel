clientDDL(); //fill comboboxes when page is loaded

document.getElementById("add_button").onclick = function () {
    myFunction();
};

function clientDDL() {
    var clientDDL = document.getElementById("client");
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
            option.value = value[i].idClient;
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
    var idClient = document.getElementById("client");

    var url = "http://localhost:8080/wetwinkel_war/rest/case/"; //TODO change this url when the server is online
    var data = {
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
            'authorization': 'bearer ' + sessionStorage.getItem("token"),
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