function login(event) {
    username = document.getElementById("loginInputUsername").value;
    password = document.getElementById("loginInputPassword").value;
    sendLoginRequest(username,password);
  }

function sendLoginRequest(username,password){
    var data;
    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("GET", "api/users/password", true);
        xhttp.onload = () => {
            showLogin(xhttp.responseText,username);
            getUserID(username);
        };
        xhttp.setRequestHeader("username",username);
        xhttp.setRequestHeader("passcode",password);
        xhttp.send();
        //console.log(data);
    }
    catch{
        console.log("something didn't work!");
    }
}


function showLogin(data,username,userID){
    if(data=="Login succesfull!")
    {
        document.getElementById("loginInputUsername").style.borderColor ="#4ed679";
        document.getElementById("loginInputPassword").style.borderColor ="#4ed679";
        setTimeout(() => {
            window.location.href = "/";
          }, "1000")
          window.sessionStorage.setItem("userName",username);
    }
    else{
        document.getElementById("loginInputUsername").style.borderColor ="red";
        document.getElementById("loginInputPassword").style.borderColor ="red";
        let windowParams ="scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,width=400,height=200";
        let newWin = window.open("about:blank", "Login Failed", windowParams);
        newWin.document.write("Login Failed, Username or Password wrong!");
    }
}


function getUserID(username)
{
    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("GET", "api/users/name/"+username, true);
        xhttp.onload = () => {
            let data = JSON.parse(xhttp.responseText);
            const userID = data[0]["_id"];
            window.sessionStorage.setItem("userID",userID);
        };
        xhttp.send();
        //console.log(data);
    }
    catch{
        console.log("something didn't work!");
    }
}
