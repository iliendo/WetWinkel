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
    var url = "http://localhost:8080/wetwinkel_war/rest/login"; //TODO change this url when the server is online
    var data = {'email': email, 'wachtwoord': password};
    var url2 = "http://localhost:8080/wetwinkel_war/rest/client"; //TODO change this url when the server is online

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        return response.text()
    }).then(function (value) {

        sessionStorage.setItem("token", value);

        console.log(sessionStorage.getItem("token"));

        fetch(url2, {
            method: 'GET',
            headers: {
                'authorization': 'bearer ' + sessionStorage.getItem("token")
            }
        }).then(function (value) {
            if (value.ok) {
                window.open("client.html", "_SELF")
            }
        });
    });

}