window.onload = function () { 
    loadProducts();
}

function loadProducts() {
    console.log("Executed!")
    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("GET", "api/products", true);
        xhttp.onload = () => {
            data = JSON.parse(xhttp.response)
            showProductData(data);
        };
        xhttp.send();
    }
    catch{
        console.log("something didn't work!");
    }
}

function showProductData(data) {
    var currentData = data[0];
    console.log(currentData);

    document.getElementById("productName").innerText = currentData.productName;
    document.getElementById("productPrice").innerText = currentData.price;
    document.getElementById("productOS").innerText = currentData.productSpecification.operatingSystem;
    document.getElementById("productamountRAM").innerText = currentData.productSpecification.amountRAM;
    document.getElementById("productColor").innerText = currentData.productSpecification.color;
    document.getElementById("productTypeCPU").innerText = currentData.productSpecification.typeCPU;
    document.getElementById("productTypeGPU").innerText = currentData.productSpecification.typeGPU;

    document.getElementById("productDescriptionText").innerText = currentData.productDescription;

    document.getElementById("productDetailImage").src = currentData.image[0] 

    document.getElementById("productTitleName").innerText = currentData.productName;
}

