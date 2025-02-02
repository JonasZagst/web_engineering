/** JS file for /login */

/** Handles the login. */
function login() {
    username = document.getElementById("loginInputUsername").value;
    password = document.getElementById("loginInputPassword").value;
    typeOfUser = document.getElementById("typeofUser").checked;
    if(typeOfUser==true)
    {
        sendLoginRequest(username, password,"business");
    }
    else{
        sendLoginRequest(username, password,"private");
    }
}

/** Sends a request to the server to check whether the provided `username` and `password` are correct.
 * @param {String} username
 * @param {String} password 
 * @param {String} typeofUser */
function sendLoginRequest(username, password,typeofUser) {
    try {
        var xhttp = new XMLHttpRequest();
        if(typeofUser=="business"){
            xhttp.open("GET", "api/companies/password", true);
        }
        else{
            xhttp.open("GET", "api/users/password", true);
        }
        xhttp.onload = () => {
            if (xhttp.responseText != "Invalid Authentication!") {
                const response = JSON.parse(xhttp.responseText);
                const userID = response._id;
                showLogin(xhttp.responseText, username, userID,typeofUser);
            }
            else {
                const userID = "";
                showLogin(xhttp.responseText, username, userID);
            }
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

/** Displays whether the login succeeded. Saves userName, userID and typeOfUser for later use to session Storage 
* @param {Number|any} data Response Message from HTTP Request
* @param {string} username
* @param {string} userID
* @param {string} typeOfUser */
function showLogin(data, username, userID,typeOfUser) {
    if (data != "Invalid Authentication!") {
        document.getElementById("LoginBanner").style.backgroundColor = "green";
        document.getElementById("LoginBanner").innerText = "Login Succesfull!";


        window.sessionStorage.setItem("userName", username);
        window.sessionStorage.setItem("userID", userID);
        window.sessionStorage.setItem("typeOfUser", typeOfUser);
        setTimeout(() => {
            document.getElementById("LoginBanner").style.backgroundColor = "transparent";
            document.getElementById("LoginBanner").innerText = "";
            window.location.href="/"
        }, "3000")
    }
    else {
        document.getElementById("loginInputUsername").style.borderColor = "red";
        document.getElementById("loginInputPassword").style.borderColor = "red";
        document.getElementById("loginInputPassword").value = "";

        document.getElementById("LoginBanner").style.backgroundColor = "red";
        document.getElementById("LoginBanner").innerText = "Login Failed!";

        setTimeout(() => {
            document.getElementById("LoginBanner").style.backgroundColor = "transparent";
            document.getElementById("LoginBanner").innerText = "";
        }, "3000")

    }
}



