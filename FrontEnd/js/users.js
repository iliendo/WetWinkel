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

    fetch(url, {
        method: 'GET',
        headers: {
            'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        return response.json(); //Let javascript know it gets json
    }.then(function (user) {

    })
}