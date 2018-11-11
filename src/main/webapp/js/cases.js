ajax = new XMLHttpRequest();
method = "GET";
url = "http://localhost:8080/wetwinkel_war/rest/casesOverview/";
asynchronous = true;

ajax.open(method, url, asynchronous);

//sending ajax request
ajax.send();

var naam = null;
var rechtsgebied = null;
var status = null;
var html = "";
var data;

ajax.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        // converting JSON back to array
        data = $.getJSON("http://localhost:8080/wetwinkel_war/rest/casesOverview/")
        data = JSON.parse(this.responseText);
        console.log(data); // for debugging

        // html value for <div> where the data will be showing
        // looping through the data
        for (a = 0; a < data.length; a++) {
            naam = data[a].naam;
            rechtsgebied = data[a].rechtsgebied;
            status=data[a].status;


            html += "<div class=col-md-4>";
            html += "<div class=\"demo-card-square mdl-card mdl-shadow--2dp\">\n" +
                "    <div class=\"mdl-card__title mdl-card--expand\">\n" +
                "        <h2 class=\"mdl-card__title-text\" id=\"clientNaam\"> naam</h2>\n" +
                "    </div>\n" +
                "    <div class=\"mdl-card__supporting-text\" id=\"card-text\">\n" +
                "       rechtsgebied" +
                "status\n" +
                "    </div>\n" +
                "    <div class=\"mdl-card__actions mdl-card--border\">\n" +
                "        <a class=\"mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect\" id=\"button\">\n" +
                "            View\n" +
                "        </a>\n" +
                "    </div>\n" +
                "</div>";


        }
        // replacing the <div>
        document.getElementById("data").innerHTML = html;


    }