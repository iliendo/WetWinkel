const email = document.getElementById("email");
let receivedCode = "";

let smd = "suck my dick";
document.getElementById("reset-button").onclick = function () {
    checkEmail(email.value);
    showSpinner();
    for (let i = 0; i < 5; i++) {
        receivedCode = Math.floor(Math.random() * (100 - 1 + 1) + 1).toString();
    }

    let template_params = {
        "reply_to": "wetwinkel.reset@gmail.com",
        "from_name": "EWA-3",
        "to_name": "Wetwinkelier",
        "message_html": "Dit is om te testen " + smd + " check it : "
    }
    let service_id = "default_service";
    let template_id = "template_ZPtmHmwg";
    emailjs.send(service_id, template_id, template_params);

};

function checkEmail(email) {
    const data = {'email': email};
    const url = "http://localhost:8080/wetwinkel_war/rest/mail/mailcheck"; //TODO change this url when the server is online

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

function checkPassword() {
    const password1 = document.getElementById("newPassword1").value;
    const password2 = document.getElementById("newPassword2").value;
    const inputCode = document.getElementById("code").value;

    if(inputCode !== receivedCode){
        showNotification("Verificatiecode klopt niet. Probeer het opnieuw")
    } else if (password1 === password2 && password1 !== "") {
        setPasswordInDb(password1);
        showNotification('Het wachtwoord is succesvol veranderd!');
        window.location.replace("index.html"); //TODO change this url when the server is online
    } else {
        showNotification('De twee wachtwoorden komen niet overeen.');
    }
}

function setPasswordInDb(password) {
    const email = "ilias.azagagh@gmail.com";
    const idUser = 76;


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

function sendMail() {

}