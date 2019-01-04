    const email = document.getElementById("email");
var smd = "suck my dick";
document.getElementById("reset-button").onclick = function () {
    checkEmail(email.value);
    showSpinner();

    let partCode;
    let endCode = "";
    let i;
    for (i = 0; i < 3; i++) {
       partCode = Math.floor(Math.random()*(100-1+1)+1);
        endCode = endCode + "-" + String(partCode);
    }


    // let template_params = {
    //     "reply_to": "wetwinkel.reset@gmail.com",
    //     "from_name": "EWA-3",
    //     "to_name": "Wetwinkelier",
    //     "receiver_mail": String(email.value),
    //     "message_html": "Dit is om te testen" + smd + "check it :" + endCode
    // }

    let template_params = {
        "receiver_mail": String(email.value),
        "reply_to": "wetwinkel.reset@gmail.com",
        "from_name": "EWA-3",
        "to_name": "Wetwinkelier",
        "message_html": "Dit is om te testen" + smd + "check it :" + endCode
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
            hideSpinner();
        } else {
            showNotification("Email bestaat niet")
            hideSpinner();
        }
    });
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