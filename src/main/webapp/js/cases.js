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
let html;
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
            for (a = 0; a < myObj.length; a++) {

                idCase = myObj[a].idCase;
                naam = myObj[a].naam;
                datum = myObj[a].datum;
                rechtsgebied = myObj[a].rechtsgebied;
                status = myObj[a].status;
                feiten = myObj[a].feiten;
                advies = myObj[a].advies;
                laatsteUpdate = myObj[a].laatsteUpdate;
                gearchiveerd = myObj[a].gearchiveerd;
                idClient = myObj[a].idClient;
                buttonName = idCase;


                console.log(idCase);

                if (casesOfUser.indexOf(idCase) !== -1) {
                    html += "<div class=\"demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--1-col\">\n" +
                        "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
                        "        <h2 class=\"mdl-card__title-text\" >" + naam + "</h2>\n" +
                        "    </div>\n" +
                        "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n" + rechtsgebied +
                        "       " + status +
                        "\n" +
                        "    </div>\n" +
                        "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
                        "        <a class=\"mdl-button--colored mdl-js-button\" id=" + buttonName + " onclick=myFunction(" + buttonName + ") >\n" +
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
                        "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n" + rechtsgebied +
                        "       " + status +
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




