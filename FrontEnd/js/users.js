const table = document.getElementById('userTable').getElementsByTagName('tbody')[0];

generateTable();

function generateTable() {
    const url = "http://localhost:8080/wetwinkel_war/rest/user"; //TODO change this url when the server is online

    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json(); //Let javascript know it gets json
    }).then(function (users) {
        for (let i = 0; i < users.length; i++) {
            // Insert a row in the table at the last row
            let userRow = table.insertRow(table.rows.length);
            // Insert a cell in the row at index 0
            let nameCell = userRow.insertCell(0);
            let emailCell = userRow.insertCell(1);
            let superUserCell = userRow.insertCell(2);
            let editCell = userRow.insertCell(3);
            let naam;
            let email = users[i].email;
            let superUser;

            if (users[i].tussenvoegsel !== undefined) {
                naam = users[i].naam + " " + users[i].tussenvoegsel + " " + users[i].achternaam;
            } else {
                naam = users[i].naam + " " + users[i].achternaam;
            }

            if (users[i].superUser === true) {
                superUser = "ja";
            } else {
                superUser = "nee";
            }

            let button = document.createElement("input");
            button.type = "button";
            button.value = "bewerk";
            button.className = "mdl-button mdl-js-button mdl-button--accent";
            button.onclick = function () {
                editUser(users[i].idUser);
            };

            nameCell.appendChild(document.createTextNode(naam));
            emailCell.appendChild(document.createTextNode(email));
            superUserCell.appendChild(document.createTextNode(superUser));
            editCell.appendChild(button);
        }
    });

}

function editUser(idUser) {
    const url = "http://localhost:8080/wetwinkel_war/rest/user/" + idUser; //TODO change this url when the server is online
    let html = "";

    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json(); //Let javascript know it gets json
    }).then(function (user) {
        html += '<div class="center">' +
            '<form id="addUser" autocomplete="off" method="post" onsubmit="editUserInDB(' + user.idUser + ')">' +
            '<table class="mdl-data-table mdl-js-data-table">\n' +
        '                    <tr>\n' +
        '                        <td colspan="3" class="titles">\n' +
        '                            <h5>Persoonsgegevens</h5>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td>\n' +
        '                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\n' +
        '                                <input class="mdl-textfield__input" type="text" id="voornaam" required tabindex="1" value="'+ user.naam +'">\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                        <td>\n' +
        '                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\n' +
        '                                <input class="mdl-textfield__input" type="email" id="email" required tabindex="4" value="'+ user.email +'">\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td>\n' +
        '                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\n' +
        '                                <input class="mdl-textfield__input" type="text" id="tussenvoegsel" tabindex="2"';


        if (user.tussenvoegsel !== undefined){
            html += 'value="'+ user.tussenvoegsel +'">\n';
        } else {
            html +='>\n' +
                '<label class="mdl-textfield__label"\n' +
                '        for="tussenvoegsel">Tussenvoegsel</label>\n'
        }

        html+= '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td>\n' +
        '                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\n' +
        '                                <input class="mdl-textfield__input" type="text" id="achternaam" required tabindex="3" value="'+ user.achternaam +'">\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                        <td>\n' +
        '                            <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">\n' +
            '<label style="margin-right: 100%"> super user?</label>\n'+
        '                                <select class="mdl-textfield__input" id="superuser" name="superuser" required tabindex="6">\n' +
        '                                    <option>nee</option>\n' +
        '                                    <option>ja</option>\n' +
        '                                </select>\n' +
        '                            </div>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                    <tr>\n' +
        '                        <td>\n' +
        '                            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent "\n' +
        '                                    id="cancel_button" tabindex="7">\n' +
        '                                Annuleren\n' +
        '                            </button>\n' +
        '                        </td>\n' +
        '                        <td>\n' +
        '                            <button type="submit"\n' +
        '                                    class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"\n' +
        '                                    id="save_button" tabindex="8" >\n' +
        '                                Opslaan\n' +
        '                            </button>\n' +
        '                        </td>\n' +
        '                    </tr>\n' +
        '                </table>\n' +
        '            </form>' +
            '</div>';

        document.getElementById("main").innerHTML = html;
        if (user.superUser) {
            document.getElementById("superuser").selectedIndex = 1;
        }


            $('#addUser').on('submit', function(e) {
                e.preventDefault();
            });


    })
}

function editUserInDB(idUser) {
    const voornaam = document.getElementById("voornaam").value;
    const tussenvoegsel = document.getElementById("tussenvoegsel").value || null;
    const achternaam = document.getElementById("achternaam").value;
    const email = document.getElementById("email").value;
    const isSuperuser = document.getElementById("superuser").options[document.getElementById("superuser").selectedIndex].value === "ja";

    let url = "http://localhost:8080/wetwinkel_war/rest/user"; //TODO change this url when the server is online

    let data = {
        "idUser": idUser,
        "naam": voornaam,
        "tussenvoegsel": tussenvoegsel,
        "achternaam": achternaam,
        "email": email,
        "superUser": isSuperuser
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
            //TODO show it worked (redirect to all users page)
            console.log("its all good man");
            window.location.reload();
        } else {
            //TODO show it didnt work and why (add snackbar)
            console.log("didn't work")
        }
    });
}