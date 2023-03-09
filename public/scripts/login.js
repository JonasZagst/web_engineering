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
            if(xhttp.responseText!="Invalid Authentication!"){
                const response = JSON.parse(xhttp.responseText);
                const userID = response._id;
                showLogin(xhttp.responseText,username, userID);
            }
            else{
                const userID="";
                showLogin(xhttp.responseText,username, userID);
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


function showLogin(data,username,userID){
    if(data!="Invalid Authentication!")
    {
        document.getElementById("loginInputUsername").style.borderColor ="#4ed679";
        document.getElementById("loginInputPassword").style.borderColor ="#4ed679";
        setTimeout(() => {
            window.location.href = "/";
        }, "1000")
        window.sessionStorage.setItem("userName",username);
        window.sessionStorage.setItem("userID",userID);
    }
    else {
        document.getElementById("loginInputUsername").style.borderColor = "red";
        document.getElementById("loginInputPassword").style.borderColor = "red";
        document.getElementById("loginInputPassword").value="";
        //let windowParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=200";
        //let newWin = window.open("about:blank", "Login Failed", windowParams);
        //newWin.document.write("Login Failed, Username or Password wrong!");
    }
}


