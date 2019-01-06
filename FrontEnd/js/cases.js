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

const zoek = document.getElementById("zoeken");
zoek.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("zoeken").click();
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
                    "        <button class=\"button mdl-button\" onclick=getCase(" + buttonName + ") >\n" +
                    "            Open\n" +
                    "        </button>\n" +
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

function deleteFile(fileName, idCase) {
    const url = "http://localhost:8080/wetwinkel_war/rest/file/" + idCase + "/" + fileName; //TODO change this url when the server is online


    fetch(url, {
        method: 'DELETE',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        if (response.ok) {
            loadDocuments(idCase);
        }
    });

    console.log("deleted " + fileName);
}

function loadDocuments(idCase) {

    const table = document.getElementById('fileTable').getElementsByTagName('tbody')[0];
    let newTable = document.createElement('tbody');
    let html = '';
    const url = "http://localhost:8080/wetwinkel_war/rest/file/" + idCase; //TODO change this url when the server is online


    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json();
    }).then(function (fileNames) {
        console.log(fileNames);
        for (let fileNamesKey in fileNames) {
            let fileName = fileNames[fileNamesKey];

            let fileRow = newTable.insertRow(newTable.rows.length);
            let nameCell = fileRow.insertCell(0);
            let deleteCell = fileRow.insertCell(1);
            let downloadCell = fileRow.insertCell(2);

            let deleteButton = document.createElement("button");
            deleteButton.className = "mdl-button mdl-js-button mdl-button--icon mdl-button--colored";
            deleteButton.innerHTML = '<i class="material-icons">delete</i>';
            let downloadButton = document.createElement("button");
            downloadButton.className = "mdl-button mdl-js-button mdl-button--icon mdl-button--colored btn-circle-download";
            downloadButton.innerHTML = '<i class="material-icons">save</i>';
            downloadButton.onclick = function (e) {

                    e.preventDefault();
                    downloadDocument(idCase, fileName);

            };

            deleteButton.onclick = function () {
                if (confirm("Weet je zeker dat je " + fileName + " wilt verwijderen?")) {
                    deleteFile(fileName, idCase);
                }
            };

            nameCell.appendChild(document.createTextNode(fileName));
            deleteCell.appendChild(deleteButton);
            downloadCell.appendChild(downloadButton);


        }
        table.parentNode.replaceChild(newTable, table);
    })
}

function downloadDocument(idCase, fileName) {
    const url = "http://localhost:8080/wetwinkel_war/rest/file/" + idCase + "/" + fileName; //TODO change this url when the server is online


    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.blob();
    }).then(function (blob) {

        let file = new File([blob], fileName);
        let fileURL = URL.createObjectURL(file);
        console.log(file.name);
        console.log(fileURL);
        var a = document.createElement("a");
        a.href = fileURL;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        setTimeout(function () {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);

    });
}

function getCase(idCase) {

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


        html2 += '  <header class="cards-layout-header mdl-layout__header" style="position: center">\n' +
            '                        <div class="mdl-layout__header-row">\n' +

            '                            <nav class="mdl-navigation">\n' +
            '                                <a class="nav-bar-made mdl-navigation__link"><h6>Zaak van ' + naam + '</h6></a>\n' +
            '                                <a class="nav-bar-made mdl-navigation__link" onclick="showDocument(' + idCase + ')">Bestanden van de zaak</a>\n' +
            '                            </nav>\n' +
            '                        </div>\n' +
            '                    </header>' +
            '<div class="mdl-grid">' +
            '    <div class="mdl-grid">\n' +
            '            <div class="demo-card-wide mdl-card mdl-shadow--2dp mdl-grid ">\n' +
            '                <div class="mdl-cell mdl-cell--6-col">\n' +
            '                    <label class="label ">Client naam:</label>\n' +
            '                    <h6 id="clientNaam">' + naam + '</h6>\n' +
            '                </div>\n' +
            '                <div class="mdl-cell mdl-cell--6-col">\n' +
            '                    <label class="label">Aanmaak datum van de zaak:</label>\n' +
            '                    <h6 id="datum">' + datum + '</h6>\n' +
            '                </div>\n' +
            '                <div class="mdl-cell mdl-cell--6-col">\n' +
            '                    <label class="label ">Status van de zaak:</label>\n' +
            '                    <h6 id="status">' + status + '</h6>\n' +
            '                </div>\n' +
            '                <div class="mdl-cell mdl-cell--6-col">\n' +
            '                    <label class="label">Rechtsgebied:</label>\n' +
            '                    <h6 id="rechtsgebied">' + rechtsgebied + '</h6>\n' +
            '                </div>\n' +
            '                <div class="mdl-cell mdl-cell--6-col">\n' +
            '                    <label class="label">Feiten:</label>\n' +
            '                    <h6 id="feiten">' + feiten + '</h6>\n' +
            '                </div>\n' +
            '                <div class="mdl-cell mdl-cell--6-col">\n' +
            '                    <label class="label">Advies:</label>\n' +
            '                    <h6 id="advise">' + advies + '</h6>\n' +
            '                </div>\n' +
            '    <div class="mdl-card__actions mdl-card--border mdl-cell mdl-cell--12-col"></div>\n' +
            '                <div class="mdl-cell mdl-cell--10-col">\n' +
            '                   <button class="button mdl-button" onclick=editCase(' + idCase + ') >Bewerken</button>\n' +
            '                </div>\n' +
            '                <div class="mdl-cell mdl-cell--2-col ">\n' +
            '                    <button class="button mdl-button" id="goback" onClick=fresh()>Terug</button>\n' +
            '                </div>\n' +
            '            </div>\n' +
            '    </div>\n' +
                        '</div>';

        document.getElementById("data").innerHTML = html2;




    })


}
function showDocument(idCase) {
    let html2 = "";

    html2 += '  <header class="cards-layout-header mdl-layout__header" style="position: center">\n' +
        '                        <div class="mdl-layout__header-row">\n' +
        '                            <nav class="mdl-navigation">\n' +
        '                                <a class="nav-bar-made mdl-navigation__link"  onclick="getCase(' + idCase + ')">Zaak van ' + naam + '</a>\n' +
        '                                <a class="nav-bar-made mdl-navigation__link" onclick="showDocument(' + idCase + ')"><h6>Bestanden van de zaak</h6></a>\n' +
        '                            </nav>\n' +
        '                        </div>\n' +
        '                    </header>' +
        '<div class="mdl-grid">' +
        '<div id="fileDiv">' +
        '<h6 class="mdl-cell mdl-cell--10-col">Toegevoegde bestanden</h6>' +
        '<form method="post" enctype="multipart/form-data" name="fileForm" class="center">\n' +
        ' <input class="inputfile " name="files" id="files" type="file" onchange="uploadFiles(' + idCase + ')" multiple\>' +
        '<label title="Voeg Bestanden aan de zaak" for="files" class="label-button mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect center">\n' +
        ' <i title="Voeg Bestanden aan de zaak" class=" material-icons center">add</i>\n' +
        ' </label>\n' +
        '</form> ' +
        '<table id="fileTable" class="mdl-data-table mdl-js-data-table mdl-shadow--2dp center">\n' +
        '        <thead>\n' +
        '            <tr>\n' +
        '                <th class=" mdl-data-table__cell--non-numeric">Naam</th>\n' +
        '                <th class="mdl-data-table__cell--non-numeric">Delete</th>\n' +
        '                <th class="mdl-data-table__cell--non-numeric">Download</th>\n' +
        '            </tr>\n' +
        '        </thead>\n' +
        '        <tbody>\n' +
        '        <!--files are added with the loadDocuments function-->\n' +
        '        </tbody>\n' +
        '    </table></div>' +
        '</div>' ;



    document.getElementById("data").innerHTML = html2;

    loadDocuments(idCase);
    
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
            "    <div class=\"mdl-card__actions mdl-card--border mdl-cell mdl-cell--12-col\"> </div>\n" +
            '                <div class="mdl-cell mdl-cell--10-col">\n' +
            '                   <button class="button mdl-button" onclick=mergeCase(toUseIdCase) >Opslaan</button>\n' +
            '                </div>\n' +
            '                <div class="mdl-cell mdl-cell--2-col ">\n' +
            '                    <button class="button mdl-button" id="goback" onClick=fresh()>Terug</button>\n' +
            '                </div>\n' +
            "            </div>\n" +
            "        </div>\n" +
            "        <div class=\"mdl-cell mdl-cell--2-col\"></div>\n" +
            "    </div>\n" +
            "</div>";


        document.getElementById("data").innerHTML = html1;

    })
}


function mergeCase(idCase) {
    const passFeiten = document.getElementById("feitenChange").value;
    const passAdvies = document.getElementById("adviesChange").value;

    const url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/updatecase/" + idCase; //TODO change this url when the server is online
    const data = {
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

function uploadFiles(idCase) {

    let fileForm = document.forms.namedItem("fileForm");

    const url = "http://localhost:8080/wetwinkel_war/rest/file"; //TODO change this url when the server is online
    let data;
    data = new FormData(fileForm);
    data.append("idCase", idCase);


    fetch(url, {
        method: 'POST',
        body: data,
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        if (response.ok) {
            loadDocuments(idCase);
        } else {
            //TODO show it failed
        }
    });


}


