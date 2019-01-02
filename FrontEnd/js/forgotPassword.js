const email = document.getElementById("email");

//when enter is pressed it will automatically fire the click event of the login button
email.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("reset-button").click();
        showNotification("Wachtwoord is gereset");
    }
});

function showNotification(message) {
    const snackbarContainer = document.getElementById("reset-warning");
    const data = {message: message, timeout: 5000};
    snackbarContainer.MaterialSnackbar.showSnackbar(data);
}