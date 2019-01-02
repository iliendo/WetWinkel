const email = document.getElementById("email");

function resetPassword(email){
    const url = "http://localhost:8080/wetwinkel_war/rest/mail/mailaings";
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        if (response.ok) {
            showNotification("Wachtwoord is hersteld")
        } else {
            showNotification("Email bestaat niet")
        }
    });
}

function showNotification(message) {
    const snackbarContainer = document.getElementById("warning-popup");
    const data = {message: message, timeout: 5000};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}