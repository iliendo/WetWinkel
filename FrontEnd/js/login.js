const email = document.getElementById("email");
const password = document.getElementById("password");

document.getElementById("login-button").onclick = function () {
    document.getElementById("lock-icon").hidden = true;
    document.getElementById("spinner").hidden = false;
    login(email.value, password.value);

};

password.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("login-button").click();
    }
});

function login(email, password) {
    const url = "http://localhost:8080/wetwinkel_war/rest/user"; //TODO change this url when the server is online
    const data = {'email': email, 'wachtwoord': password};
    const url2 = "http://localhost:8080/wetwinkel_war/rest/casesOverview"; //TODO change this url when the server is online

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            return response.text()
        } else {
            showLoginFailed();
        }
    }).then(function (value) {

        localStorage.setItem("token", value);
        return fetch(url2, {
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
            } else {
                throw new Error();
            }
        });
    }).catch(function () {
        document.getElementById("lock-icon").hidden = false;
        document.getElementById("spinner").hidden = true;
    });

}

function showLoginFailed() {
    const snackbarContainer = document.getElementById("login-failed-warning");
    const data = {message: 'Email of wachtwoord is verkeerd.', timeout: 5000};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);

}




