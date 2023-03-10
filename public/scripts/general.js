//Wartet bis Page vollständig geladen ist! Im Gegensatz zu, OnDocumentLoaded!
window.onload = function () { 
    detectLogin();
}

function switchBannerImageAfterTime(){
    console.clear()
    let image = document.getElementById("LandingBannerImage").src;
    const images = ["http://localhost:3000/img/banner.png","http://localhost:3000/img/banner2.jpeg","http://localhost:3000/img/banner3.jpeg"]; 

    let index = 0;
    let currentImage=0;

    images.forEach((element) =>{
        if(element==image)
        {   
            currentImage= index;
        } 
        else{
            console.log("false")
        }
        index++;
    });

    if(currentImage==2)
    {
        currentImage=0;
    }
    else{
        currentImage= currentImage+1;
    }
    document.getElementById("LandingBannerImage").src = images[currentImage];
}

function changeToSearch(event){
    const target =event.target.getAttribute("id");
    console.log(target);
    if(target== "searchIcon"){
        console.log("Hallo");
        document.getElementById("navSearch").style.visibility = "visible";
        document.getElementById("startSearch").style.visibility = "visible";
        document.getElementById("searchIcon").style.visibility = "hidden";
    }
    else if(target=="navSearch"){
        console.log("HalloInput");
        document.getElementById("searchIcon").style.visibility = "visible";
        document.getElementById("startSearch").style.visibility = "hidden";
        document.getElementById("navSearch").style.visibility = "hidden";
    }
}

function importProducts(){
    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("GET", "api/products", true);
        xhttp.onload = () => {
            data = JSON.parse(xhttp.response)
            createProductDataList(data);
        };
        xhttp.send();
        //console.log(data);
    }
    catch{
        console.log("something didn't work!");
    }
}

function createProductDataList(data){
    document.getElementById("searchItems").innerHTML="";
    for(let i =0; i<data.length; i++)
    {
        let productName = data[i]["productName"];
        document.getElementById("searchItems").innerHTML += `<option value="`+productName+`">`;
    }
}

function detectLogin(){
    const userName = window.sessionStorage.getItem("userName");
    if(userName!="")
    {
        console.log(userName);
        document.getElementById("loginNav").innerHTML=`<img style=" width: 40px;height: 40px;margin-left:15px; margin-top:15px" src="img/Login.png" alt="Account Management"></img></br>`+userName;
        document.getElementById("loginNavButtonImage").innerHTML =  `<img src="img/LogoutButton.png" onClick="userLogout()" alt="Account Logout">`
    } 
}

function userLogout(){
    //Alert Banner
    document.getElementById("LoginBanner").style.backgroundColor="green";
    document.getElementById("LoginBanner").innerText="You Successfully logged out!";

    setTimeout(() => {
        document.getElementById("LoginBanner").style.backgroundColor="transparent";
        document.getElementById("LoginBanner").innerText="";
    }, "2500");

    window.sessionStorage.setItem("userName","");
    window.sessionStorage.setItem("userID","");

    document.getElementById("loginNav").innerHTML=``;
    document.getElementById("loginNavButtonImage").innerHTML =  `<a href="/login"><img src="img/Login.png" alt="Account Management"></a>`
}
  
function openProductPage(){
    const value = document.getElementById("navSearch").value;
    window.sessionStorage.setItem("productName",value);
    window.location.href = "/productDetailPage";
}