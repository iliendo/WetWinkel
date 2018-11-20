let idCase = 0;
let naam = null;
let datum = null;
let laatsteUpdate = 0;
let rechtsgebied = {
    rechtstraf: 'rechtstraf',
    auto: 'auto'
};
let status = {
    Open: 1,
    Close: 2
};
let feiten = null;
let advies = null;
let gearchiveerd = false;
let idClient = 0;
let html = '';
let html1 = '';
let a;
let buttonName;
let casesOfUser = [];

// console.log("1");
getCasesOfUser();

function getCasesOfUser() {
    const url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/openablecases"; //TODO change this
    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        console.log("Henk");
        // response.json.then(function (value) {
        //     //console.log(suit.idCase);
        //     const myObj = JSON.parse(value);
        //     for (let i = 0; i < myObj.length; i++) {
        //         console.log(myObj[i].idCase);
        //     }
        //
        // });
        return response.json();
    }).then(function (cases) {
        console.log("cases: "+cases);
        // for (let i = 0; i < cases ; i++) {
        //
        // }
        for (let suit in cases) {
            console.log(cases[suit]['idCase']);
            casesOfUser.push(cases[suit]['idCase']);
        }
        showCases();
    })
}

function getUserID() {
    let url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/user";
    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.text()
    }).then(function (value) {
        console.log(value);
        return value;
    });
}

function showCases() {
    let xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            // console.log(this.responseText);
            const myObj = JSON.parse(this.responseText);
            for (let a in myObj) {
                let suit = myObj[a];

                idCase = suit.idCase;
                naam = suit.naam;
                datum = suit.datum;
                rechtsgebied = suit.rechtsgebied;
                status = suit.status;
                feiten = suit.feiten;
                advies = suit.advies;
                laatsteUpdate = suit.laatsteUpdate;
                gearchiveerd = suit.gearchiveerd;
                idClient = suit.idClient;
                buttonName = idCase;


                console.log(idCase);
                if (casesOfUser.indexOf(idCase) !== -1) {
                    html += "<div class=\"demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--1-col\">\n" +
                        "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
                        "        <h2 class=\"mdl-card__title-text\" >" + naam + "</h2>\n" +
                        "    </div>\n" +
                        "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n Rechtsgebied: " + rechtsgebied +
                        " <br>      Status:  " + status +
                        "    </div>\n" +
                        "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
                        "        <a class=\"mdl-button--colored mdl-js-button\" onclick=getCase(" + buttonName + ") >\n" +
                        "            View\n" +
                        "        </a>\n" +
                        "    </div>\n" +
                        "</div>";
                    console.log("added with button");
                } else {
                    html += "<div class=\"demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--1-col\">\n" +
                        "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
                        "        <h2 class=\"mdl-card__title-text\" >" + naam + "</h2>\n" +
                        "    </div>\n" +
                        "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n Rechtsgebied: " + rechtsgebied +
                        "     <br>    Status: " + status +
                        "\n" +
                        "    </div>\n" +
                        "</div>";
                    console.log("added without button");
                }

            }
            document.getElementById("data").innerHTML = html;
        }

    };

    xmlhttp.open("GET", "http://localhost:8080/wetwinkel_war/rest/casesOverview", true);
    xmlhttp.setRequestHeader('authorization', 'bearer ' + localStorage.getItem("token"));
    xmlhttp.send();
}

function getCase(idCase) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);


            idCase = myObj.idCase;
            naam = myObj.naam;
            datum = myObj.datum;
            rechtsgebied = myObj.rechtsgebied;
            status = myObj.status;
            feiten = myObj.feiten;
            advies = myObj.advies;
            laatsteUpdate = myObj.laatsteUpdate;
            gearchiveerd = myObj.gearchiveerd;
            idClient = myObj.idClient;



            html1 += "<br>\n" +
                "<br>\n" +
                "<br>\n" +

                "<div>\n" +
                "    <div class=\"mdl-grid\">\n" +
                "\n" +
                "            <div class=\"demo-card-wide mdl-card mdl-shadow--2dp mdl-grid \">\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label \">Client naam:</label>\n" +
                "                    <h6 id=\"clientNaam\">"+naam+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Aanmaak datum van de zaak:</label>\n" +
                "                    <h6 id=\"datum\">"+datum+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label \">Status van de zaak:</label>\n" +
                "                    <h6 id=\"status\">"+status+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Rechtsgebied:</label>\n" +
                "                    <h6 id=\"rechtsgebied\">"+rechtsgebied+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Feiten:</label>\n" +
                "                    <h6 id=\"feiten\">"+feiten+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Advies:</label>\n" +
                "                    <h6 id=\"advise\">"+advies+"</h6>\n" +
                "                </div>\n" +
                "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
                "        <a class=\"mdl-button--colored mdl-js-button\" onclick=editCase(" + idCase + ") >\n" +
                "            Bewerken\n" +
                "        </a>\n" +
                "        <a class=\"mdl-button--colored mdl-js-button\" id=\"goback\" onClick=fresh() >\n" +
                "            Terug\n" +
                "        </a>\n" +
                "    </div>\n" +
                "            </div>\n" +
                "    </div>\n" +
                "</div>";

            // idUser = myObj.idUser;
            // naamUser = myObj.naam;
            // tussenvoegsel = myObj.tussenvoegsel;
            // achternaam = myObj.achternaam;
            // emailUser = myObj.emailUser;
            // wachtwoord = myObj.wachtwoord;
            // superUser = myObj.superUser;


            document.getElementById("data").innerHTML = html1;
        }

    };

    xmlhttp.open("GET", "http://localhost:8080/wetwinkel_war/rest/casesOverview/case/"+idCase, true);
    xmlhttp.setRequestHeader('authorization', 'bearer ' + localStorage.getItem("token"));
    xmlhttp.send();
}

function editCase(idCase) {
    //alert("summinsummin");
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);


            toUseIdCase = idCase;
            naam = myObj.naam;
            datum = myObj.datum;
            rechtsgebied = myObj.rechtsgebied;
            status = myObj.status;
            feiten = myObj.feiten;
            advies = myObj.advies;
            laatsteUpdate = myObj.laatsteUpdate;
            gearchiveerd = myObj.gearchiveerd;
            idClient = myObj.idClient;

            // let toUseA = document.getElementById("advies").value;
            // let toUseF = document.getElementById("feiten").value;
            // alert("ADvies : " +toUseA + " Feiten : " +toUseF);

            html1 = "<br>\n" +
                "<br>\n" +
                "<br>\n" +

                "<div>\n" +
                "    <div class=\"mdl-grid\">\n" +
                "\n" +
                "        <div class=\"mdl-cell mdl-cell--7-col\">\n" +
                "            <div class=\"demo-card-wide mdl-card mdl-shadow--2dp mdl-grid \">\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label \">Client naam:</label>\n" +
                "                    <h6 id=\"naamChange\">"+naam+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Aanmaak datum van de zaak:</label>\n" +
                "                    <h6 id=\"datumChange\">"+datum+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label \">Status van de zaak:</label>\n" +
                "                    <h6 id=\"statusChange\">"+status+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Rechtsgebied:</label>\n" +
                "                    <h6 id=\"rechtsgebiedChange\">"+rechtsgebied+"</h6>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Feiten:</label>\n" +
                "                    <textarea class =\"mdl-textfield__input\" id=\"feitenChange\">"+feiten+"</textarea>\n" +
                "                </div>\n" +
                "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
                "                    <label class=\"label\">Advies:</label>\n" +
                "                    <textarea class =\"mdl-textfield__input\" id=\"adviesChange\">"+advies+"</textarea>\n" +
                "                </div>\n" +
                "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
                "        <a class=\"mdl-button--colored mdl-js-button\" onclick=mergeCase(toUseIdCase) >\n" + //
                "            Opslaan\n" +
                "        </a>\n" +
                "        <a class=\"mdl-button--colored mdl-js-button\" id=\"goback\" onClick=fresh() >\n" +
                "            Terug\n" +
                "        </a>\n" +
                "    </div>\n" +
                "            </div>\n" +
                "        </div>\n" +
                "        <div class=\"mdl-cell mdl-cell--2-col\"></div>\n" +
                "    </div>\n" +
                "</div>";

            // idUser = myObj.idUser;
            // naamUser = myObj.naam;
            // tussenvoegsel = myObj.tussenvoegsel;
            // achternaam = myObj.achternaam;
            // emailUser = myObj.emailUser;
            // wachtwoord = myObj.wachtwoord;
            // superUser = myObj.superUser;


            document.getElementById("data").innerHTML = html1;
        }

    };

    xmlhttp.open("GET", "http://localhost:8080/wetwinkel_war/rest/casesOverview/case/"+idCase, true);
    xmlhttp.setRequestHeader('authorization', 'bearer ' + localStorage.getItem("token"));
    xmlhttp.send();
}

function mergeCase(idCase) {
    // let passNaam = document.getElementById("naamChange").value;
    // let passRechtsgebied = document.getElementById("rechtsgebiedChange").value;
    // let passStatus = document.getElementById("statusChange").value;
    let passFeiten = document.getElementById("feitenChange").value;
    let passAdvies = document.getElementById("adviesChange").value;
    // let passGearchiveerd = null;
    // let passIdClient = idClient;


    var url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/updatecase/"+idCase; //TODO change this url when the server is online
    var data = {

        // 'naam': passNaam,
    // 'rechtsgebied': passRechtsgebied,
    // 'status': passStatus,
    'feiten': passFeiten,
        'advies': passAdvies,
    // 'gearchiveerd': passGearchiveerd,
    // 'idClient': passIdClient
};

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token"),
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            alert("De bewerking is succesvol opgeslagen!");
            fresh();
        } else {
            alert("Iets lijkt mis te zijn gegaan.");
        }
    });


}

function fresh() {
    window.location.reload();

}

