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
        document.getElementById("LoginBanner").style.backgroundColor="green";
        document.getElementById("LoginBanner").innerText="Login Succesfull!";

        setTimeout(() => {
            document.getElementById("LoginBanner").style.backgroundColor="transparent";
            document.getElementById("LoginBanner").innerText="";
            window.location.href = "/";
        }, "3000");

        window.sessionStorage.setItem("userName",username);
        window.sessionStorage.setItem("userID",userID);
    }
    else {
        document.getElementById("loginInputUsername").style.borderColor = "red";
        document.getElementById("loginInputPassword").style.borderColor = "red";
        document.getElementById("loginInputPassword").value="";

        document.getElementById("LoginBanner").style.backgroundColor="red";
        document.getElementById("LoginBanner").innerText="Login Failed!";

        setTimeout(() => {
            document.getElementById("LoginBanner").style.backgroundColor="transparent";
            document.getElementById("LoginBanner").innerText="";
        }, "3000")
        //let windowParams = "scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=200";
        //let newWin = window.open("about:blank", "Login Failed", windowParams);
        //newWin.document.write("Login Failed, Username or Password wrong!");
    }
}



