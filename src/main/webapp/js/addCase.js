jurisdictieDDL(); //fill comboboxes when page is loaded

document.getElementById("add_button").onclick = function () {
    myFunction();
};

function jurisdictieDDL() {
    // TODO id toevoegen
    var jurisdictieDDL = document.getElementById("jurisdictie");
    var options = ["dit", "is", "een", "test"];

    for (var i = 0; i < options.length ; i++) {
        var option = document.createElement("OPTION");
        var txt = document.createTextNode(options[i]);
        option.appendChild(txt);
        jurisdictieDDL.insertBefore(option, jurisdictieDDL.lastChild);
    }
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
    var data = {'naam': naam, 'rechtsgebied': rechtsgebied, 'status': status, 'feiten': feiten, 'advies': advies, 'gearchiveerd': gearchiveerd, 'idClient': idClient};

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'authorization': 'bearer ' + sessionStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok){
            //TODO show it worked (redirect to all cases page)
        } else {
            //TODO show it didnt work and why (add snackbar)
        }
    });
}