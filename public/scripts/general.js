/** General functions for the whole website. */

// Wait until the page is fully loaded
window.onload=function(){
    detectLogin();
    detectWindowWidth();
};
window.onresize = detectWindowWidth

/** Switches the main banner on the page after an amount of time. */
function switchBannerImageAfterTime() {
    let image = document.getElementById("LandingBannerImage").src;
    const images = ["img/banner.png", "img/banner2.jpeg", "img/banner3.jpeg"];

    let index = 0;
    let currentImage = 0;

    images.forEach((element) => {
        if (element == image) {
            currentImage = index;
        }
        index++;
    });

    if (currentImage == 2) {
        currentImage = 0;
    }
    else {
        currentImage = currentImage + 1;
    }
    document.getElementById("LandingBannerImage").src = images[currentImage];
}

/** Changes the search icon to the search field
 *
 * If the user clicks on the search icon then the icon is hidden and the search field is shown.
 * @param {Object} event The JavaScript Click-Event object. */
function changeToSearch(event) {
    const target = event.target.getAttribute("id");
    if (target == "searchIcon") {
        document.getElementById("navSearch").style.visibility = "visible";
        document.getElementById("startSearch").style.visibility = "visible";
        document.getElementById("searchIcon").style.visibility = "hidden";
    }
    else if (target == "navSearch") {
        document.getElementById("searchIcon").style.visibility = "visible";
        document.getElementById("startSearch").style.visibility = "hidden";
        document.getElementById("navSearch").style.visibility = "hidden";
    }
}

/** Requests all products from the backend. */
function importProducts() {
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "api/products", true);
        xhttp.onload = () => {
            data = JSON.parse(xhttp.response)
            _createProductDataList(data);
        };
        xhttp.send();
    }
    catch (error) {
        console.error(`Loading products: ${error}`);
    }
}

/** Inserts the html search elements based on the response of the server.
 * @param {Object} data JSON Array of the product objects. */
function _createProductDataList(data) {
    document.getElementById("searchItems").innerHTML = "";
    for (const product of data)
        document.getElementById("searchItems").innerHTML += `<option value="${product.productName}">`;
}

/** Detects wether the user is logged in.
 *
 * This is done by checking if the session storage contains a value for "userName". */
function detectLogin() {
    const userName = window.sessionStorage.getItem("userName");
    if (userName) {
        document.getElementById("loginNav").innerHTML = `<img style=" width: 40px;height: 40px" src="img/Login.png" alt="Account Management"></img></br> ${userName}`;
        document.getElementById("loginNavButtonImage").innerHTML = `<img src="img/LogoutButton.png" onClick="userLogout()" alt="Account Logout">`;

        for (const e of document.getElementsByClassName("requires-login"))
        {
            if(e.className.includes("requires-company-user")&&sessionStorage.getItem("typeOfUser")=="business")
            {
                e.className="requires-login requires-company-user navItems";
            }   
            else if(!(e.className.includes("requires-company-user"))&&sessionStorage.getItem("typeOfUser")=="private")
            {
                e.className="requires-login navItems";
            }
        }
    }
}

/** Handle when the user is logging out.
 *
 * Hides the User icon on the left of the header. */
function userLogout() {
    //Alert Banner
    document.getElementById("LoginBanner").style.backgroundColor = "green";
    document.getElementById("LoginBanner").innerText = "You Successfully logged out!";

    setTimeout(() => {
        document.getElementById("LoginBanner").style.backgroundColor = "transparent";
        document.getElementById("LoginBanner").innerText = "";
    }, "2500");

    for (const e of document.getElementsByClassName("requires-login"))
    {
        if(e.className.includes("requires-company-user")&&sessionStorage.getItem("typeOfUser")=="business")
        {
            e.className="requires-login requires-company-user";
            e.style.display="none"
        }   
        else if(!(e.className.includes("requires-company-user"))&&sessionStorage.getItem("typeOfUser")=="private")
        {
            e.className="requires-login";
            e.style.display="none"
        }
    }

    window.sessionStorage.setItem("userName", "");
    window.sessionStorage.setItem("userID", "");
    window.sessionStorage.setItem("typeOfUser", "");    

    document.getElementById("loginNav").innerHTML = ``;
    document.getElementById("loginNavButtonImage").innerHTML = `<a href="/login"><img src="img/Login.png" alt="Account Management"></a>`
}

/** Opens the detailed page for a product. */
function openProductPage(event) {
    let value ="";
    if(window.innerWidth<=1300){
        value = document.getElementById("navSearchSmall").value;
    }
    else{
            value = document.getElementById("navSearch").value;
    }
    window.sessionStorage.setItem("productName", value);
    window.location.href = "/productDetailPage";
}

/** Expand the nav bar, when button is clicked. */
function expandMenu(){
    document.getElementById("navExpandMenu").style.display="none";
    document.getElementById("navCollapseMenu").style.display="inline";
    for(const n of document.getElementsByClassName("navItems")){    
        n.style.display ="inline";
    }
}   

/** Collapses the nav bar, when button is clicked. */
function collapseMenu(){
    document.getElementById("navExpandMenu").style.display="inline";
    document.getElementById("navCollapseMenu").style.display="none";
    let navElements = document.getElementsByClassName("navItems");
    for(const n in navElements){
        navElements[n].style.display ="none";
    }
}   

function detectWindowWidth(){
    if(window.innerWidth<=1300){
        document.getElementById("searchFieldSmall").style.display = "block";
        document.getElementById("searchInput").style.display="none";
        document.getElementById("searchInput").className="";
    } 
    else{
        document.getElementById("searchFieldSmall").style.display = "none";
        document.getElementById("searchInput").className="navItems";
    }
}

