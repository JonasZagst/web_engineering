/**window.onloadstart = function () { 
    openProductPage();
}**/
document.addEventListener( "DOMContentLoaded", openProductPage());
function openProductPage() {
    const productName = window.sessionStorage.getItem("productName");
    console.log(productName);
    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("GET", "api/products", true);
        xhttp.onload = () => {
            data = JSON.parse(xhttp.response)
            showProductData(data,productName);
        };
        xhttp.send();
    }
    catch{
        console.log("something didn't work!");
    }
}

function showProductData(data,productName) {
    var currentData = identifyProductDataSet(data,productName);
    console.log(currentData);
    
    document.getElementById("productDetailName").innerText = currentData.productName;
    document.getElementById("productDetailPrice").innerText = currentData.price;
    document.getElementById("productDetailOS").innerText = currentData.productSpecification.operatingSystem;
    document.getElementById("productDetailamountRAM").innerText = currentData.productSpecification.amountRAM;
    document.getElementById("productDetailColor").innerText = currentData.productSpecification.color;
    document.getElementById("productDetailTypeCPU").innerText = currentData.productSpecification.typeCPU;
    document.getElementById("productDetailTypeGPU").innerText = currentData.productSpecification.typeGPU;

    document.getElementById("productDetailDescriptionText").innerText = currentData.productDescription;

    document.getElementById("productDetailImage").src = currentData.image[0] 

    document.getElementById("productDetailTitleName").innerText = currentData.productName;

    //On Success
    window.sessionStorage.setItem("productID",currentData._id);
}

function identifyProductDataSet(data, productName)
{
    for(var d=0; d<data.length; d++){
        if(data[d].productName==productName){
            console.log(data[d].productName);
            return data[d];
        }
        else{
        }
    }
    return null;
}


function addToShoppingCart(){
    const productID  = window.sessionStorage.getItem("productID");
    console.log(productID);
    const userID = window.sessionStorage.getItem("userID");
    if(userID!="")
    {
        console.log("Starting Execution!");
    }
    else{
        alert("You have to be logged In, to add products to your shopping Cart!")
    }
    

    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("POST", "/api/users/"+userID+"/shoppingCart/"+productID, true);
        xhttp.send();
    }
    catch{
        console.log("something didn't work!");
    }
}

