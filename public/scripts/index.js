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
    console.log("Hassan: "+ event)  
    const target =event.target.getAttribute("id");
    console.log(target);
    if(target== "searchIcon"){
        console.log("Hallo");
        document.getElementById("navSearch").style.visibility = "visible";
        document.getElementById("searchIcon").style.visibility = "hidden";
    }
    else if(target=="navSearch"){
        console.log("HalloInput");
        document.getElementById("searchIcon").style.visibility = "visible";
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
    console.log(data);
    document.getElementById("searchItems").innerHTML="";
    for(let i =0; i<data.length; i++)
    {
        let productName = data[i]["productName"];
        document.getElementById("searchItems").innerHTML += `<option value="`+productName+`">`;
    }
}