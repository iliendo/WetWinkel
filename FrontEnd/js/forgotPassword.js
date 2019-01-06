const email = document.getElementById("email");
let receivedCode = "";

// Generates verification code and sends the mail
document.getElementById("reset-button").onclick = function () {
    checkEmail(email.value);
    showSpinner();

    let partCode;

    for (let i = 0; i < 3; i++) {
        partCode = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        receivedCode += String(partCode);
    }

    let template_params = {
        "receiver_mail": String(email.value),
        "reply_to": "wetwinkel.reset@gmail.com",
        "from_name": "EWA-3",
        "to_name": "Wetwinkelier",
        "message_html": receivedCode
    }

    let service_id = "default_service";
    let template_id = "template_ZPtmHmwg";
    emailjs.send(service_id, template_id, template_params);
    postResetCode();
    checkResetCode(email);
};

// Checks of the email exists in the database
function checkEmail(email) {
    const data = {'email': email};
    const url = "http://localhost:8080/wetwinkel_war/rest/user/cred"; //TODO change this url when the server is online

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            showNotification("Email met instructies is naar het emailadres toe gestuurd")
            changeContent();
            hideSpinner();
        } else {
            showNotification("Email bestaat niet")
            hideSpinner();
        }
    });
}

document.getElementById("save-button").onclick = function () {
    checkPassword();
};

// Checks if the user can change the password
function checkPassword() {
    const password1 = document.getElementById("newPassword1").value;
    const password2 = document.getElementById("newPassword2").value;
    const inputCode = document.getElementById("code").value;

    if (inputCode !== receivedCode) {
        showNotification("Verificatiecode klopt niet. Probeer het opnieuw")
    } else if (password1 === password2 && password1 !== "") {
        setPasswordInDb(password1);
        showNotification('Het wachtwoord is succesvol veranderd!');
        window.location.replace("index.html"); //TODO change this url when the server is online
    } else {
        showNotification('De twee wachtwoorden komen niet overeen.');
    }
}

// Changes password in the database
function setPasswordInDb(password) {
    let url = "http://localhost:8080/wetwinkel_war/rest/user/password"; //TODO change this url when the server is online

    let data = {
        'email': email.value,
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
            console.log("works");
        } else {
            //TODO show it didnt work and why (add snackbar)
            console.log("didn't work")
        }
    }).finally(function () {
        hideSpinner();
        sessionStorage.clear();
    });
}

// Changes the html page dynamically
function changeContent() {
    document.getElementById("popup").style.display = "inherit";
}

function showNotification(message) {
    const snackbarContainer = document.getElementById("warning-popup");
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
    function postResetCode() {
        const data = {
            'email': email.value,
            'resetCode': receivedCode
        };
        const url = "http://localhost:8080/wetwinkel_war/rest/user/postReset";

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(function (response) {
            if (response.ok) {
                console.log("'Dit gedeelte is gelukt");
            } else {
                console.log("Of niet");
            }
        });
    }

// Checks if the resetcode exists in the database
function checkResetCode(email) {
    let url = "http://localhost:8080/wetwinkel_war/rest/user/getcode?email=" +email.value;
    console.log(email.value);
    fetch(url, {
        method: 'GET',
        headers: {
            //'authorization': 'bearer ' + localStorage.getItem("token")
        }
    }).then(function (response) {
        console.log(response)
        //return response.json();
    }).then(function (resetCode) {
        console.log("Deze moet je hebben " + String(resetCode));


    });
}




    // const data = {'resetCode': receivedCode};
    // const url = "http://localhost:8080/wetwinkel_war/rest/user/cred";
    //
    // fetch(url, {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }).then(function (response) {
    //     if (response.ok) {
    //         showNotification("Email met instructies is naar het emailadres toe gestuurd")
    //         changeContent();
    //         hideSpinner();
    //     } else {
    //         showNotification("Email bestaat niet")
    //         hideSpinner();
    //     }
    // });
//}