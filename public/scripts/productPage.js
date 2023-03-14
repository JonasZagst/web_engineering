/** JS File for /productPage */
document.addEventListener("DOMContentLoaded", loadProducts);

/** Load all products and display them */
function loadProducts() {
    try {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", "api/products", true);
        xhttp.onload = () => {
            window.sessionStorage.setItem("productArray", xhttp.response);
            data = JSON.parse(xhttp.response);
            _craeateProductForms(data);
        };
        xhttp.send();
    }
    catch (error) {
        console.error(`loadProducts: ${error}`);
    }
}


/** @ignore
* Collects all necessary informations foreach given Product
* @param {object} body The Parsed JSON Body, containg all Products */
function _createProductForms(body) {
    for (let i = 0; i < body.length; i++) {
        const productImage = body[i].image[0];
        const productName = body[i].productName;
        const productDescription = body[i].productDescription;
        const productPrice = body[i].price;
        const productID = body[i]._id;
        _addProductBoxes(productName, productDescription, productPrice, productImage, productID);
    }
}

/** @ignore
* Adds a product Box to the product Page Body, foreach Product
* @param {string} productName 
* @param {string} productDescription
* @param {Number} productPrice
* @param {string} productImage Filepath to local Image (img/productImages)
* @param {object} productID*/
function _addProductBoxes(productName, productDescription, productPrice, productImage, productID) {
    document.getElementById("productGrid").innerHTML +=
        `<div class="grid-item">
        <div class="grid-image" id="`+ productName + `" onclick="openProductPageClick(event)" style="background-image:url(` + productImage + `);background-position:center center;background-size:cover">
        </div>
        <div class="grid-text" id="grid-text1">
            <strong style="color: black;font-size: large">`+ productName + `</strong><br><br>
            <strong>`+ productDescription + `</strong><br><br><br>
            <strong>`+ productPrice + `€</strong>
        </div>
    </div>`
}


/** Opens the detailed page for a product. */
function openProductPageClick(event) {
    const productName = event.target.getAttribute("id");
    window.sessionStorage.setItem("productName", productName);
    window.location.href = "/productDetailPage";
}

/**Filters the current products Array regarding the specific given filter inputs  
    One Function for each Filter.
*/
function nameFilter(event) {
    const filterValue = event.target.value;
    var data = JSON.parse(window.sessionStorage.getItem("productArray"));
    const resultManufacturer = data.filter(dataSet => dataSet.productName.includes(filterValue));
    document.getElementById("productGrid").innerHTML = "";
    _craeateProductForms(resultManufacturer);
}

function priceFilter(event) {
    const filterValue = event.target.value;
    var data = JSON.parse(window.sessionStorage.getItem("productArray"));
    const result = data.filter(dataSet => dataSet.price < filterValue);
    document.getElementById("productGrid").innerHTML = "";
    _craeateProductForms(result);
}

function colorFilter(event) {
    const filterValue = event.target.value;
    var data = JSON.parse(window.sessionStorage.getItem("productArray"));
    const resultColor = data.filter(dataSet => dataSet.productSpecification.color.includes(filterValue));
    document.getElementById("productGrid").innerHTML = "";
    _craeateProductForms(resultColor);
}

function OSFilter(event) {
    const filterValue = event.target.value;
    var data = JSON.parse(window.sessionStorage.getItem("productArray"));
    const resultOS = data.filter(dataSet => dataSet.productSpecification.operatingSystem.includes(filterValue));
    document.getElementById("productGrid").innerHTML = "";
    _craeateProductForms(resultOS);
}

function CPUFilter(event) {
    const filterValue = event.target.value;
    var data = JSON.parse(window.sessionStorage.getItem("productArray"));
    const resultTypeCPU = data.filter(dataSet => dataSet.productSpecification.typeCPU.includes(filterValue));
    document.getElementById("productGrid").innerHTML = "";
    _craeateProductForms(resultTypeCPU);
}

function getCurrentPrice() {
    document.getElementById("currentPrice").innerText = document.getElementById("filterPrice").value + "€";
}

/**On Click Function: Collapses the filter, when clicked*/
function collapseFilter() {
    for (const d of document.getElementsByClassName("filterItems"))
        d.style.display = "none";

    document.getElementById("collapseFilter").innerHTML = `<img src="img/filter.png" alt="Filter" id="filterIcon" onclick="expandFilter()">`
}

function expandFilter() {
    for (const d of document.getElementsByClassName("filterItems"))
        d.style.display = "inline";

    document.getElementById("collapseFilter").innerHTML = `<img src="img/filter.png" alt="Filter" id="filterIcon" onclick="collapseFilter()">`
}
