const email = document.getElementById("email");

document.getElementById("save-button").onclick = function () {
    checkPassword();
};

function checkPassword() {
    const password1 = document.getElementById("newPassword1").value;
    const password2 = document.getElementById("newPassword2").value;
    const code = document.getElementById("code").value;
    const verzondenCode = 0;
    
    if (password1 === password2 && password1 !== "") {
        //setPasswordInDb(password1);
        showNotification('HUTS');
    } else {
        showNotification('De twee wachtwoorden komen niet overeen.');
    }

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