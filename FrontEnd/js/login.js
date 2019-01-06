const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("newPassword2").value;

//when login is clicked it will show a loading spinner and the login function is fired
document.getElementById("login-button").onclick = function () {
    showSpinner();
    login(email.value, password.value);

};

//when save (within popup) it will show a loading spinner and the setPassword function is fired
document.getElementById("save-password-button").onclick = function (event) {
    event.preventDefault();
    showSpinner();
    setPassword();
};

//when enter is pressed it will automatically fire the click event of the login button
password.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("login-button").click();
    }
});

//when enter is pressed within popup it will automatically fire the click event of the save button
password2.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("save-password-button").click();
    }
});

function login(email, password) {
    const url = "http://localhost:8080/wetwinkel_war/rest/user/cred"; //TODO change this url when the server is online
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
            showError('Email of wachtwoord is verkeerd.')
        }
    }).then(function (value) {

        let valueArray = value.split(",");
        let nieuw = valueArray[2];
        let idUser = valueArray[3];

        //when user is new show popup
        if (nieuw === "true") {
            showPasswordPrompt();
            sessionStorage.setItem("token", valueArray[0]);
            sessionStorage.setItem("id", idUser);
            sessionStorage.setItem("email", email);
            throw new Error("Account is nieuw, en moet een nieuw wachtwoord krijgen");
        } else {
            //save token to localstorage and save whether the user is a super user or not to localstorage
            localStorage.setItem("token", valueArray[0]);
            localStorage.setItem("superUser", valueArray[1]);
            return fetch(url2, {
                method: 'GET',
                headers: {
                    'authorization': 'bearer ' + localStorage.getItem("token")
                }
            }).then(function (value) {
                if (value.ok) {
                    value.text().then(function (url) {
                        url = url.substring(1, url.length - 1);
                        window.open(url, '_self') //open the url returned from the server
                    });
                } else {
                    throw new Error();
                }
            });
        }
    }).catch(function () {
        hideSpinner(); //hide the spinner when an error accured (finally didnt work)
    });

}

function setPassword() {
    const password1 = document.getElementById("newPassword1").value;
    const password2 = document.getElementById("newPassword2").value;
    if (password1 === password2) {
        setPasswordInDb(password1);
        document.getElementById("popup").style.display = "none";
    } else {
        showError('De twee wachtwoorden komen niet overeen.')
        hideSpinner();
    }
}

function showPasswordPrompt() {
    document.getElementById("popup").style.display = "block";
}

function setPasswordInDb(password) {
    const email = sessionStorage.getItem("email");
    const idUser = sessionStorage.getItem("id");

    let url = "http://localhost:8080/wetwinkel_war/rest/user/password"; //TODO change this url when the server is online

    let data = {
        'idUser': idUser,
        'email': email,
        'wachtwoord': password
    };

    fetch(url, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'authorization': 'bearer ' + sessionStorage.getItem("token")
        }
    }).then(function (response) {
        if (response.ok) {
            //TODO show it worked (redirect to all users page)
            console.log("its all good man");
        } else {
            //TODO show it didnt work and why (add snackbar)
            console.log("didn't work")
        }
    }).finally(function () {
        hideSpinner();
        sessionStorage.clear();
    });
}

function showError(message) {
    const snackbarContainer = document.getElementById("login-failed-warning");
    const data = {message: message, timeout: 5000};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}

function showSpinner() {
    document.getElementById("lock-icon").hidden = true;
    document.getElementById("spinner").hidden = false;
}

function hideSpinner() {
    document.getElementById("lock-icon").hidden = false;
    document.getElementById("spinner").hidden = true;
}




