function login(event) {
    username = document.getElementById("loginInputUsername").value;
    password = document.getElementById("loginInputPassword").value;
    sendLoginRequest(username, password);
}

function sendLoginRequest(username, password) {
    var data;
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "api/users/password", true);
        xhttp.onload = () => {
            showLogin(xhttp.responseText);
        };
        xhttp.setRequestHeader("username", username);
        xhttp.setRequestHeader("passcode", password);
        xhttp.send();
        //console.log(data);
    }
    catch {
        console.log("something didn't work!");
    }
}


function showLogin(data) {
    if (data == "Login succesfull!") {
        document.getElementById("loginInputUsername").style.borderColor = "#4ed679";
        document.getElementById("loginInputPassword").style.borderColor = "#4ed679";
        setTimeout(() => {
            window.location.href = "/";
        }, "1000")
    }
    else {
        document.getElementById("loginInputUsername").style.borderColor = "red";
        document.getElementById("loginInputPassword").style.borderColor = "red";
        let windowParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=200";
        let newWin = window.open("about:blank", "Login Failed", windowParams);
        newWin.document.write("Login Failed, Username or Password wrong!");
    }
}

