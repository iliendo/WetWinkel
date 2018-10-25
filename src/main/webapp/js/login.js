var user = document.getElementById("email");
var password = document.getElementById("password");

document.getElementById("login-button").onclick = function () {
    login(user, password);
};

password.addEventListener("keyup", function(event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("login-button").click();
    }
});

function login(user, password) {
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/wetwinkel_war/rest/login", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        "email": user,
        "password": password
    }));
}
