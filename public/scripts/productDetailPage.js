/** JS File for /productDetailPage */

document.addEventListener("DOMContentLoaded", openProductPage());

/** Opens the product page.
 *
 * For this a request to the backend is made. */
function openProductPage() {
    const productName = window.sessionStorage.getItem("productName");
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "api/products", true);
        xhttp.onload = () => {
            data = JSON.parse(xhttp.response)
            showProductData(data, productName);
        };
        xhttp.send();
    }
    catch (error) {
        console.error(`openProductPage: ${error}`);
    }
}

/** Display the information for a product.
 * @param {[Object]} data
 * @param {String} productName */
function showProductData(data, productName) {
    const currentData = data.find(e => e.productName == productName);
    if (!currentData) return;

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

    document.getElementById("productDetailPriceText").innerText = currentData.price;

    //On Success
    window.sessionStorage.setItem("productID", currentData._id);
}

function addToShoppingCart() {
    const productID = window.sessionStorage.getItem("productID");
    const userID = window.sessionStorage.getItem("userID");
    if (!userID) {
        openPopUpBanner(1)
    }

    else{
        try {
            var xhttp = new XMLHttpRequest();
            xhttp.open("POST", `/api/users/${userID}/shoppingCart/${productID}`, true);
            xhttp.send();
            openPopUpBanner(0);
        }
        catch (error) {
            console.error(`addToShoppingCart: ${error}`);
        }
    }
}

/**User Feedback: Succesfully added Product to ShoppingCart */
function openPopUpBanner(error){
    if(error==0){
        document.getElementById("LoginBanner").style.backgroundColor = "green";
        document.getElementById("LoginBanner").innerText = "You successfully added a product to your shopping Cart!";
    }
    else if(error==1){
        document.getElementById("LoginBanner").style.backgroundColor = "red";
        document.getElementById("LoginBanner").innerText = "You have to be logged in, to add products to your shopping Cart!";
    }
    setTimeout(() => {
        document.getElementById("LoginBanner").style.backgroundColor = "transparent";
        document.getElementById("LoginBanner").innerText = "";
    }, 4000);
}