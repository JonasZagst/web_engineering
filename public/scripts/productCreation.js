/** JS File for /productCreation */

/** Stores the imageData in session Storage */
function getImagePreview(event) {
  const image = event.target.files[0];
  const imageName = image.name;
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.addEventListener('load', () => {
    window.sessionStorage.setItem('imageData', reader.result);
  });
}

/** Opens a  preview of the created Product in a new Window */
function showPreview() {
  generateProductPreviewObject();
  window.open('/productDetailPreviewPage', 'ProductPreview');
}

/** Generates JSON Array and stores it in Session Storage, So that previewPage can read in the window */
function generateProductPreviewObject() {
  const previewObject = [];
  try {
    //Initialize Object
    const title = document.getElementById("productTitle").value;
    const description = document.getElementById("productDescription").value;
    const price = document.getElementById("productPrice").value;
    const manufacturer = document.getElementById("productManufacturer").value;
    const color = document.getElementById("productColor").value;
    const operatingSystem = document.getElementById("productOS").value;
    const RAM = document.getElementById("productRAM").value;
    const TypeCPU = document.getElementById("productTypeCPU").value;
    const TypeGPU = document.getElementById("productTypeGPU").value;
    previewObject.push(title, description, price, manufacturer, color, operatingSystem, RAM, TypeCPU, TypeGPU);

    //Save data Object for the session
    window.sessionStorage.setItem("previewObject", previewObject);
  }
  catch {
    alert("Problem while trying to initialize the Product Preview!");
  }
}

/** Logic for the actual product Creation*/
function pushNewProduct() {
  json = generateJSON();
  try {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "api/products", true);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = () => {
      try {
        var response = JSON.parse(xhttp.responseText);
        openPopUpBanner(response);
      }
      catch {
        openPopUpBanner(xhttp.responseText);
      }
    };
    xhttp.send(json);
  }
  catch {
    console.log("Problem");
  }
}

/**Generates the actual JSON, that'll be send to backend. Takes the given values from HTML form as inputs*/
function generateJSON() {
  const re = new RegExp("(?<=fakepath).*$");
  const imageFile = document.getElementById("uploadImage").value;
  let filename = imageFile.match(re);
  filename = String(filename).substring(1, String(filename).length);
  const filepath = "img/upload/" + filename;
  const productTitle = document.getElementById("productTitle").value;
  const productDescription = document.getElementById("productDescription").value;
  const productPrice = parseInt(document.getElementById("productPrice").value);
  const productManufacturer = document.getElementById("productManufacturer").value;
  const productColor = document.getElementById("productColor").value;
  const productOS = document.getElementById("productOS").value;
  let localProductRAM = document.getElementById("productRAM").value;
  const productRAM = parseInt(localProductRAM.substring(0, localProductRAM.length - 2));
  const productTypeCPU = document.getElementById("productTypeCPU").value;
  const productTypeGPU = document.getElementById("productTypeGPU").value;

  const mockProduct =
  {
    "productName": productTitle,
    "productDescription": productDescription,
    "price": productPrice,
    "image": [filepath],
    "productSpecification": {
      "operatingSystem": productOS,
      "amountRAM": productRAM,
      "color": productColor,
      "typeCPU": productTypeCPU,
      "manufactorer": productManufacturer,
      "typeGPU": productTypeGPU
    }
  };

  const jsonReturn = JSON.stringify(mockProduct);
  return jsonReturn;
}

/** Opens a popUpBanner depending on the success of the ProductCreation
*   @param {Number|any} error */
function openPopUpBanner(error) {
  if (typeof (error) != "string") {

    getImageFile();
    window.sessionStorage.removeItem("imageData");
    window.sessionStorage.removeItem("previewObject");
    //Success Banner
    document.getElementById("LoginBanner").style.backgroundColor = "green";
    document.getElementById("LoginBanner").innerText = "You Successfully created your own Product!";

  }
  else {
    //Error Banner
    document.getElementById("LoginBanner").style.backgroundColor = "red";
    document.getElementById("LoginBanner").innerText = "There was an error while trying to create your account. Please make sure you filled out all necessary fields(*). The fields 'Product Price' has to be of type number! As well make sure that you've added a picture!";
  }

  setTimeout(() => {
    document.getElementById("LoginBanner").style.backgroundColor = "transparent";
    document.getElementById("LoginBanner").innerText = "";
  }, "4000");
}

/** Gets Image Data from Input(type Image) */
function getImageFile() {
  var file = document.getElementById("uploadImage").files[0];
  console.log(typeof (file));
  pushFileToServer(file);
}

/** Stores the uploaded Image locally(img/upload) 
* @param {object} file The uploaded file object */
function pushFileToServer(file) {
  try {
    var xhttp = new XMLHttpRequest();
    var formData = new FormData();
    formData.append("image", file);
    xhttp.open("post", "/api/upload", true);
    xhttp.send(formData);
  }
  catch {
    console.log("something didn't work!");
  }
}
