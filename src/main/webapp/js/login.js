var email = document.getElementById("email");
var password = document.getElementById("password");

document.getElementById("login-button").onclick = function () {
    login(email.value, password.value);
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

function login(email, password) {
    // xhr = new XMLHttpRequest();
    var url = "http://localhost:8080/wetwinkel_war/rest/login";
    // xhr.open("POST", url, true);
    // xhr.setRequestHeader("Content-type", "application/json");
    // xhr.onreadystatechange = function () {
    //     if (xhr.readyState === 4 && xhr.status === 200) {
    //         var json = JSON.parse(xhr.responseText);
    //         console.log(json);
    //     } else {
    //         console.log(xhr.status);
    //     }
    // };
    var data = {'email':email,'wachtwoord':password};
    // xhr.send(data);

    console.log(JSON.stringify(data));
    fetch(url,  {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(function (value) { value.json().then(function (value1) { console.log(value1.toString()) })});

}
