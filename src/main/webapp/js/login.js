var email = document.getElementById("email");
var password = document.getElementById("password");

document.getElementById("login-button").onclick = function () {
    login(email.value, password.value);
};

password.addEventListener("keyup", function (event) {
    // Cancel the default action, if needed
    event.preventDefault();
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        // Trigger the button element with a click
        document.getElementById("login-button").click();
    }
});

function login(email, password) {
    var url = "http://localhost:8080/wetwinkel_war/rest/login";
    var data = {'email': email, 'wachtwoord': password};

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (response) {
        setCookie("token", response.headers.get("token") , 4)
    });

    function setCookie(cname, cvalue, exhours) {
        var date = new Date();
        date.setTime(date.getTime() + (exhours * 1000 * 60 * 60));
        var expires = "expires=" + date.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
    }

}
