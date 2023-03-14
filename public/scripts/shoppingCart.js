/** JS File for /shoppingCart */

/** Retrieves all shopping cart items for the current user and displays them. */
function getShoppingCartItems() {
  try {
    const userID = window.sessionStorage.userID;
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `api/users/${userID}/shoppingCart`, true);
    xhttp.onload = () => {
      const shoppingCartProducts = JSON.parse(xhttp.response)
      createShoppingCart(shoppingCartProducts);
    };
    xhttp.send();
  } catch (error) {
    console.error(`getShoppingCartItems: ${error}`)
  }
}

/** Create the content for te shopping cart.
 *
 * For each product ID in the shopping cart a request to the backend is made to get the full content for the product.
 * @param {string[]} shoppingCartProducts The list of product IDs in the shopping cart of the current user. */
function createShoppingCart(shoppingCartProducts) {
  for (const productID of shoppingCartProducts) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", `api/products/${productID}`, true);
    xhttp.onload = () => {
      let product = JSON.parse(xhttp.response);

      const productImage = product.image[0];
      const productName = product.productName;
      const productDescription = product.productDescription;
      const productPrice = product.price;
      const productID = product._id;

      _addProductBoxes(productName, productDescription, productPrice, productImage, productID);
    };

    xhttp.send();
  }
}

/** @ignore
 * Helper function to display the fill an HTML string with the appropriate information of the product.
 * @param {string} productName
 * @param {string} productDescription
 * @param {number} productPrice
 * @param {string} productImage The url to the thumbnail image for the product.
 * @param {string} productID */
function _addProductBoxes(productName, productDescription, productPrice, productImage, productID) {
  // FIXME: Add a shopping cart remove icon.
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

/**Function to delete current Shopping Cart content */
function checkoutShoppingCart() {
  try {
    const userID = window.sessionStorage.userID;
    const xhttp = new XMLHttpRequest();
    xhttp.open("DELETE", `api/users/${userID}/shoppingCart`, true);
    xhttp.onload = () => {
      const deletionResponse = xhttp.responseText;
      openPopUpBanner(deletionResponse);
    };
    xhttp.send();
  } catch (error) {
    console.error(`deletionResponse: ${error}`)
  }
}

/** Displays a banner for the user to let them know about the state of their shopping cart.
 * @param {String} deletionResponse */
function openPopUpBanner(deletionResponse) {
  if (deletionResponse == "OK") {
    document.getElementById("LoginBanner").style.backgroundColor = "green";
    document.getElementById("LoginBanner").innerText = "You succesfully checked out your Shopping Cart!";
  }
  else {
    document.getElementById("LoginBanner").style.backgroundColor = "red";
    document.getElementById("LoginBanner").innerText = "There was a problem when trying to checkout!";
  }

  setTimeout(() => {
    document.getElementById("LoginBanner").style.backgroundColor = "transparent";
    document.getElementById("LoginBanner").innerText = "";
    window.location.href = "/shoppingCart"
  }, "3000")
}
