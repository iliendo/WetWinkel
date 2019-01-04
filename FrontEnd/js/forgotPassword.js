const email = document.getElementById("email");

var smd = "suck my dick";
document.getElementById("reset-button").onclick = function () {
    checkEmail(email.value);
    showSpinner();
    var code;
    var tekst = "";
    var i;
    for (i = 0; i < 5; i++) {
        code = Math.floor(Math.random() * (100 - 1 + 1) + 1);
        tekst = tekst + String(code);
    }

    var template_params = {
        "reply_to": "wetwinkel.reset@gmail.com",
        "from_name": "EWA-3",
        "to_name": "Wetwinkelier",
        "message_html": "Dit is om te testen " + smd + " check it : " + tekst
    }
    var service_id = "default_service";
    var template_id = "template_ZPtmHmwg";
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