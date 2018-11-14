// variables of the first GET
var idCase = 0;
var naam = null;
var datum = null;
var laatsteUpdate = 0;
var rechtsgebied = {
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
var html= "";
var a;
var buttonName;

// variables of the second GET
var html1 = "";

// variables of the therd GET
var idUser =0;

var naamUser= null;
var tussenvoegsel= null;
var achternaam= null;
var emailUser= null;
var wachtwoord= null;
var superUser=false;


var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        myObj = JSON.parse(this.responseText);
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


            html += "<div class=\"demo-card-square mdl-card mdl-shadow--2dp mdl-cell mdl-cell--1-col\">\n" +
                "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
                "        <h2 class=\"mdl-card__title-text\" >" + naam + "</h2>\n" +
                "    </div>\n" +
                "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n" + rechtsgebied +
                "       " + status +
                "\n" +
                "    </div>\n" +
                "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
                "        <a class=\"mdl-button--colored mdl-js-button\" id="+buttonName +" onclick=myFunction("+buttonName+") >\n" +
                "            Open \n" +
                "        </a>\n" +
                "    </div>\n" +
                "</div>";


        }
        document.getElementById("data").innerHTML = html;
    }

};


xmlhttp.open("GET", "http://localhost:8080/wetwinkel_war/rest/casesOverview/cases", true);
xmlhttp.send();




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
                "        <div class=\"mdl-cell mdl-cell--2-col\"></div>\n" +
                "        <div class=\"mdl-cell mdl-cell--7-col\">\n" +
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
                "            </div>\n" +
                "        </div>\n" +
                "        <div class=\"mdl-cell mdl-cell--2-col\"></div>\n" +
                "    </div>\n" +
                "</div>";



            document.getElementById("da").innerHTML = html1;
        }

    };


    xmlhttp.open("GET", "http://localhost:8080/wetwinkel_war/rest/casesOverview/case/"+idCase, true);
    xmlhttp.send();
}

function getUser() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);

            idUser = myObj.idUser;
            naamUser = myObj.naam;
            tussenvoegsel=myObj.tussenvoegsel;
            achternaam = myObj.achternaam;
            emailUser=myObj.emailUser;
            wachtwoord = myObj.wachtwoord;
            superUser=myObj.superUser;



        }

    };
    xmlhttp.open("GET", "http://localhost:8080/wetwinkel_war/rest/casesOverview/user", true);
    xmlhttp.send();

}

function myFunction(idCase) {
    if(superUser = true){
        getCase(idCase);
    }


}



