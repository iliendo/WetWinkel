const email = document.getElementById("email");

document.getElementById("reset-button").onclick = function () {
    checkEmail(email.value);
    showSpinner();
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