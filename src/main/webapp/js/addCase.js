document.getElementById("add_button").onclick = function () {
    myFunction();
};

function myFunction() {

    var naam = document.getElementById("client").value;
    var rechtsgebied = null;
    var status = null;
    var feiten = document.getElementById("feiten").value;
    var advies = document.getElementById("advies").value;
    var gearchiveerd = false;
    var idClient = 10;



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
        if (!response.ok){
            window.open("addCase.html", "_SELF")
        }
    });

    window.open("addCase.html", "_SELF");
}