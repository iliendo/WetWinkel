var email = document.getElementById("email");
var password = document.getElementById("password");

document.getElementById("login-button").onclick = function () {
    login(email.value, password.value);
};

password.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("login-button").click();
    }
});

function login(email, password) {
    var url = "http://localhost:8080/wetwinkel_war/rest/user"; //TODO change this url when the server is online
    var data = {'email': email, 'wachtwoord': password};
    var url2 = "http://localhost:8080/wetwinkel_war/rest/casesOverview"; //TODO change this url when the server is online

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.text()
    }).then(function (value) {

        localStorage.setItem("token", value);

        fetch(url2, {
            method: 'GET',
            headers: {
                'authorization': 'bearer ' + localStorage.getItem("token")
            }
        }).then(function (value) {
            if (value.ok) {
                value.text().then(function (url) {
                    url = url.substring(1, url.length - 1);
                    window.open(url, '_self')
                });
            }
        });
    });

}