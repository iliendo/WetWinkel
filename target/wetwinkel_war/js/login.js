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
    switch (user.value) {
        case "admin@wetwinkel.nl":
            if (password.value = "12345") {
                window.open("Client.html", "_self");
                break;
            }
        default:
            console.log("email or password is wrong");
            break;
    }
}
