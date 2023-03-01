document.addEventListener( "DOMContentLoaded", loadProducts());

function loadProducts() {
    console.log("Executed!")
    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("GET", "api/products", true);
        xhttp.onload = () => {
            data = JSON.parse(xhttp.response)
            craeateProductForms(data);
        };
        xhttp.send();
    }
    catch{
        console.log("something didn't work!");
    }
}

function craeateProductForms(body){
    for(let i=0; i<=body.length;i++)
    {
        const productImage = body[i].image[0];
        console.log(productImage);
        const productName = body[i].productName;
        const productDescription = body[i].productDescription;
        const productPrice = body[i].price;
        addProductBoxes(productName,productDescription,productPrice,productImage);
    }
}

function addProductBoxes(productName,productDescription,productPrice,productImage){
    document.getElementById("productGrid").innerHTML+= 
    `<div class="grid-item">
        <div class="grid-image"
            style="background-image:url(`+productImage+`);background-position:center center;background-size:cover;">
        </div>
        <div class="grid-text" id="grid-text1">
            <strong style="color: black;font-size: large">`+productName+`</strong><br><br>
            <strong>`+productDescription+`</strong><br><br><br>
            <strong>`+productPrice+`€</strong>
        </div>
    </div>`
}






