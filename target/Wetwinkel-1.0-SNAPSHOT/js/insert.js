function myFunction() {

    var initialen = document.getElementById("initialen").value;
    var tussenvoegsel = document.getElementById("tussenvoegsel").value;
    var achternaam = document.getElementById("achternaam").value;
    var straatnaam = document.getElementById("straatnaam").value;
    var postcode = document.getElementById("postcode").value;
    var huisnummer = document.getElementById("huisnummer").value;
    var toevoeging = document.getElementById("toevoeging").value;
    var land = document.getElementById("land").value;
    var telefoonnummer = document.getElementById("telefoonnummer").value;
    var email = document.getElementById("email").value;

       document.getElementById("demo").innerHTML = initialen;

       var mysql = require('mysql');

       var con = mysql.createConnection({
         host: "oege.ie.hva.nl",
         user: "tourakm0011",
         password: "FBJFf4sFjV3Wg3",
         database: "ztourakm0011"
       });

       con.connect(function(err) {
         if (err) throw err;
         var sql = "INSERT INTO client (initialen, tussenvoegsel, achternaam, straatnaam, postcode, huisnummer, toevoeging, land, telefoonnummer, email, ontdekkingWw) VALUES ('a', 'b', 'c', 'd', 'e', 1, 'g', 'h', 2, 'j', 'k')";
         con.query(sql, function (err, result) {
           if (err) throw err;
           console.log("1 record inserted, ID: " + result.insertId);
         });
       });
}