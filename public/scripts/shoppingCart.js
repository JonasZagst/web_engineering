function getShoppingCartItems() {
  try {
    const userID = window.sessionStorage.userID;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `api/users/${userID}/shoppingCart`, true);
    xhttp.onload = () => {
      console.log(xhttp.response);
      const data = JSON.parse(xhttp.response)
      createShoppingCart(data);
    };
    xhttp.send();
  } catch (error) {
    console.error(`getShoppingCartItems: ${error}`)
  }
}

function createShoppingCart(data) {
  console.log(data);
  for (const productID of data) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `api/products/${productID}`, true);
    xhttp.onload = () => {
      let product = JSON.parse(xhttp.response);

      const productImage = product.image[0];
      const productName = product.productName;
      const productDescription = product.productDescription;
      const productPrice = product.price;
      const productID = product._id;

      addProductBoxes(productName, productDescription, productPrice, productImage, productID);
    };

    xhttp.send();
  }
}

function addProductBoxes(productName, productDescription, productPrice, productImage, productID) {
  document.getElementById("productGrid").innerHTML +=
    `<div class="grid-item">
        <div class="grid-image" onclick="openProductPage" style="background-image:url(${productImage});background-position:center center;background-size:cover">
        </div>
        <div class="grid-text" id="grid-text1">
            <strong style="color: black;font-size: large">${productName}</strong><br><br>
            <strong>${productDescription}</strong><br><br><br>
            <strong>${productPrice}€</strong>
            <button style="background-color:transparent" data-productID="${productID}" type="button" onclick="removeFromShoppingCart"><img style="width:30px;height:30px;vertical-align:middle" src="img/shoppingCart.png" alt="Remove from shopping cart"></button>
        </div>
    </div>`
}
