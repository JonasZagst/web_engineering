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
    for(let i=0; i<body.length;i++)
    {
        const productImage = body[i].image[0];
        const productName = body[i].productName;
        const productDescription = body[i].productDescription;
        const productPrice = body[i].price;
        const productID = body[i]._id;
        addProductBoxes(productName,productDescription,productPrice,productImage,productID);
    }
}

function addProductBoxes(productName,productDescription,productPrice,productImage,productID){
    document.getElementById("productGrid").innerHTML+= 
    `<div class="grid-item">
        <div class="grid-image"
            style="background-image:url(`+productImage+`);background-position:center center;background-size:cover;">
        </div>
        <div class="grid-text" id="grid-text1">
            <strong style="color: black;font-size: large">`+productName+`</strong><br><br>
            <strong>`+productDescription+`</strong><br><br><br>
            <strong>`+productPrice+`€</strong>
            <button style="background-color:transparent"id="`+productID+`" type="button" onclick="addToShoppingCart(event)"><img style="width:30px;height:30px;vertical-align:middle" src="img/shoppingCart.png" alt="Home"></button>
        </div>
    </div>`
}


function addToShoppingCart(event){
    const currentButton = event.path[1];
    const productID  =  currentButton.id;
    console.log(productID);

    const userID = window.sessionStorage.getItem("userID");
    console.log("Starting Execution!");

    try{
        var xhttp = new XMLHttpRequest();   
        xhttp.open("POST", "/api/users/"+userID+"/shoppingCart/"+productID, true);
        xhttp.send();
    }
    catch{
        console.log("something didn't work!");
    }
}






