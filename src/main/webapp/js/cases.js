var idCase = 0;
var naam = null;
var datum = null;
var laatsteUpdate = 0;
const rechtsgebied = {
    rechtstraf: 'rechtstraf',
    auto: 'auto'
};
var status = {
    Open: 1,
    Close: 2
};
var feiten = null;
var advies = null;
var gearchiveerd = false;
var idClient = 0;
var html;
var a;
var buttonName;

var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    generatecards();
};
xmlhttp.open("GET", "http://localhost:8080/wetwinkel_war/rest/casesOverview", true);
xmlhttp.send();


function myFunction(idCase) {



    if (idCase == 5) {
        alert("I am an alert box000");

    } else if (idCase == 4) {

        alert("I am an alert box!11111");
    }

}

function generatecards() {
    if (this.readyState == 4 && this.status == 200) {
        var myObj = JSON.parse(this.responseText);
        for (a = 0; a < myObj.length; a++) {

            idCase = myObj[a].idCase;
            naam = myObj[a].naam;
            datum = myObj[a].datum;
            rechtsgebied.valueOf(myObj[a].rechtsgebied);
            status = myObj[a].status;
            feiten = myObj[a].feiten;
            advies = myObj[a].advies;
            laatsteUpdate = myObj[a].laatsteUpdate;
            gearchiveerd = myObj[a].gearchiveerd;
            idClient = myObj[a].idClient;
            buttonName = "button" + idCase;

            html += getCardHtml(naam, rechtsgebied, status, buttonName);


        }
        document.getElementById("data").innerHTML = html;

        for (let i = 0; i < myObj.length; i++) {

            if (buttonName != null){
                document.getElementById(buttonName).onclick = function () {
                    myFunction(idCase);
                }
            }

        }
    }
}

function getCardHtml(naam, rechtsgebied, status, buttonName) {

    return "<div class=\"demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--1-col\">\n" +
        "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
        "        <h2 class=\"mdl-card__title-text\" >" + naam + "</h2>\n" +
        "    </div>\n" +
        "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n" + rechtsgebied +
        "       " + status +
        "\n" +
        "    </div>\n" +
        "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
        "        <a class=\"mdl-button--colored mdl-js-button\" id=buttonName >\n" +
        "            View\n" +
        "        </a>\n" +
        "    </div>\n" +
        "</div>";
    //onclick='myFunction()'
}
