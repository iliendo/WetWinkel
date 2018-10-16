var user = document.getElementById("email");
var password = document.getElementById("password");

document.getElementById("login-button").onclick = function () {
    login(user, password);
};

function login(user, password) {
    switch (user.value) {
        case "admin@wetwinkel.nl":
            if (password.value = "12345") {
                window.open("Cl.html", "_self")
            } else {
                console.log("password is wrong");
            }
        default:
            console.log("email wrong")
    }
}