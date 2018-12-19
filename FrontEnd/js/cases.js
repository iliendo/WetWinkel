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

let html1 = '';
let a;
let suit;
let buttonName;
let casesOfUser = [];

const eigenCases = document.getElementById("eigen-cases");
const employment = document.getElementById("checkbox-Employment");
const adminastrive = document.getElementById("checkbox-Administratieve");
const rental = document.getElementById("checkbox-Rental");
const criminal = document.getElementById("checkbox-Criminal");
const pfl = document.getElementById("checkbox-PFL");
const socialInsurance = document.getElementById("checkbox-Social_Insurance_Law");
const otherCivil = document.getElementById("checkbox-Other_Civil");
const immigration = document.getElementById("checkbox-Immigration");
const other = document.getElementById("checkbox-Ohter_General");

let zoek = document.getElementById("zoeken");
zoek.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("zoekButton").click();
    }
});

getCasesOfUser();

function getCasesOfUser() {
    const url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/openablecases"; //TODO change this
    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (cases) {
        for (let suit in cases) {
            casesOfUser.push(cases[suit]['idCase']);
        }
        showCases();

    })
}

function inSearch(suit) {

    let caseInsensitiveSearchValue = getCaseInsensitiveRegex(zoek.value);
    let passed = suit.naam.search(caseInsensitiveSearchValue) !== -1 || suit.rechtsgebied.search(caseInsensitiveSearchValue) !== -1 ||
        suit.status.search(caseInsensitiveSearchValue) !== -1 || suit.feiten.search(caseInsensitiveSearchValue) !== -1 || suit.advies.search(caseInsensitiveSearchValue) !== -1 ||
        zoek.value.search(getCaseInsensitiveRegex(suit.naam)) !== -1 || zoek.value.search(getCaseInsensitiveRegex(suit.rechtsgebied)) !== -1 ||
        zoek.value.search(getCaseInsensitiveRegex(status)) !== -1 || zoek.value.search(getCaseInsensitiveRegex(feiten)) !== -1 || zoek.value.search(getCaseInsensitiveRegex(advies)) !== -1;

    if (employment.checked || adminastrive.checked || rental.checked || criminal.checked || pfl.checked || socialInsurance.checked || otherCivil.checked || immigration.checked || other.checked) {
        let inJurisdiction = false;

        if (employment.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Employment")) !== -1;
        }
        if (adminastrive.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Administratieve")) !== -1;
        }
        if (rental.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Rental")) !== -1;
        }
        if (criminal.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Criminal")) !== -1;
        }
        if (pfl.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("PFL")) !== -1;
        }
        if (socialInsurance.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Social_Insurance_Law")) !== -1;
        }
        if (otherCivil.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Other_Civil")) !== -1;
        }
        if (immigration.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Immigration")) !== -1;
        }
        if (other.checked) {
            inJurisdiction = inJurisdiction || suit.rechtsgebied.search(getCaseInsensitiveRegex("Other_General")) !== -1;
        }

        return passed && inJurisdiction;
    } else {
        return passed;
    }
}

function getCaseInsensitiveRegex(variable) {
    regex = new RegExp(variable, 'i');

    return regex;
}

function showCases() {

    let html2 = "";
    const url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/allcases"; //TODO change this url when the server is online
    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (cases) {

        const myObj = cases;
        cases = myObj.filter(inSearch);


        for (a in cases) {
            suit = cases[a];

            idCase = suit.idCase;
            naam = suit.naam;
            datum = suit.datum.toString().substr(0, 10);
            rechtsgebied = suit.rechtsgebied;
            status = suit.status;
            feiten = suit.feiten;
            advies = suit.advies;
            laatsteUpdate = suit.laatsteUpdate;
            gearchiveerd = suit.gearchiveerd;
            idClient = suit.idClient;
            buttonName = idCase;

                if (casesOfUser.indexOf(idCase) !== -1) {
                    html2 += "<div class=\"demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--1-col\">\n" +
                        "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
                        "        <h2 class=\"mdl-card__title-text\" >" + naam + "</h2>\n" +
                        "    </div>\n" +
                        "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n Rechtsgebied: " + rechtsgebied +
                        " <br>      Status:  " + status +
                      "</div>\n" +
                        "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
                        "        <a class=\"button\" onclick=getCase(" + buttonName + ") >\n" +
                        "            Open\n" +
                        "        </a>\n" +
                        "    </div>\n" +
                        "</div>";
                } else if (!eigenCases.checked) {
                    html2 += "<div class=\"demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--1-col\">\n" +
                        "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
                        "        <h2 class=\"mdl-card__title-text\" >" + naam + "</h2>\n" +
                        "    </div>\n" +
                        "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n Rechtsgebied: " + rechtsgebied +
                        "     <br>    Status: " + status +

                        "    </div>\n" +
                        "</div>";
                }
            }



        document.getElementById("data").innerHTML = html2;

    })


}

function getCase(idCase) {

    let html2 = "";
    const url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/case/" + idCase; //TODO change this url when the server is online
    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (cases) {
        const myObj = cases;

        idCase = myObj.idCase;
        naam = myObj.naam;
        datum = myObj.datum.toString().substr(0, 10);
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
            "                    <h6 id=\"clientNaam\">" + naam + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Aanmaak datum van de zaak:</label>\n" +
            "                    <h6 id=\"datum\">" + datum + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label \">Status van de zaak:</label>\n" +
            "                    <h6 id=\"status\">" + status + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Rechtsgebied:</label>\n" +
            "                    <h6 id=\"rechtsgebied\">" + rechtsgebied + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Feiten:</label>\n" +
            "                    <h6 id=\"feiten\">" + feiten + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Advies:</label>\n" +
            "                    <h6 id=\"advise\">" + advies + "</h6>\n" +
            "                </div>\n" +
            "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
            "        <a class=\"button\" onclick=editCase(" + idCase + ") >\n" +
            "            Bewerken\n" +
            "        </a>\n" +
            "        <a class=\"button\" id=\"goback\" onClick=fresh() >\n" +
            "            Terug\n" +
            "        </a>\n" +
            "    </div>\n" +
            "            </div>\n" +
            "    </div>\n" +
            "</div>";

        document.getElementById("data").innerHTML = html1;

    })


}

function editCase(idCase) {

    const url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/case/" + idCase; //TODO change this url when the server is online
    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (cases) {
        const myObj = cases;

        toUseIdCase = idCase;
        naam = myObj.naam;
        datum = myObj.datum.toString().substr(0, 10);
        rechtsgebied = myObj.rechtsgebied;
        status = myObj.status;
        feiten = myObj.feiten;
        advies = myObj.advies;
        laatsteUpdate = myObj.laatsteUpdate;
        gearchiveerd = myObj.gearchiveerd;
        idClient = myObj.idClient;

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
            "                    <h6 id=\"naamChange\">" + naam + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Aanmaak datum van de zaak:</label>\n" +
            "                    <h6 id=\"datumChange\">" + datum + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label \">Status van de zaak:</label>\n" +
            "                    <h6 id=\"statusChange\">" + status + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Rechtsgebied:</label>\n" +
            "                    <h6 id=\"rechtsgebiedChange\">" + rechtsgebied + "</h6>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Feiten:</label>\n" +
            "                    <textarea class =\"mdl-textfield__input\" id=\"feitenChange\">" + feiten + "</textarea>\n" +
            "                </div>\n" +
            "                <div class=\"mdl-cell mdl-cell--6-col\">\n" +
            "                    <label class=\"label\">Advies:</label>\n" +
            "                    <textarea class =\"mdl-textfield__input\" id=\"adviesChange\">" + advies + "</textarea>\n" +
            "                </div>\n" +
            "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
            "        <a class=\"button\" onclick=mergeCase(toUseIdCase) >\n" + //
            "            Opslaan\n" +
            "        </a>\n" +
            "        <a class=\"button\" id=\"goback\" onClick=fresh() >\n" +
            "            Terug\n" +
            "        </a>\n" +
            "    </div>\n" +
            "            </div>\n" +
            "        </div>\n" +
            "        <div class=\"mdl-cell mdl-cell--2-col\"></div>\n" +
            "    </div>\n" +
            "</div>";


        document.getElementById("data").innerHTML = html1;

    })
}


function mergeCase(idCase) {
    let passFeiten = document.getElementById("feitenChange").value;
    let passAdvies = document.getElementById("adviesChange").value;

    var url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/updatecase/" + idCase; //TODO change this url when the server is online
    var data = {
        'feiten': passFeiten,
        'advies': passAdvies
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


