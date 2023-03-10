//For Page Previewy‚
function showPreview(){
  const previewObject = generateProductPreviewObject();
  window.open('/productDetailPreviewPage','ProductPreview');
}
function getImagePreview(event){  
    const image = event.target.files[0];
    const imageName= image.name;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.addEventListener('load', () => {
        window.sessionStorage.setItem('imageData', reader.result);
    });
  }

function generateProductPreviewObject()
{
  const previewObject =[];
  try{
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
    previewObject.push(title,description,price,manufacturer,color,operatingSystem,RAM,TypeCPU,TypeGPU);

    //Save data Object for the session
    window.sessionStorage.setItem("previewObject",previewObject);
    //Save Image for the Session
    
  }
  catch{
      alert("Problem while trying to initialize the Product Preview!");
  }
}

//Logic for the actual product Creation
function pushNewProduct()
{
  json = generateJSON();
  console.log(json);
  try{
    var xhttp = new XMLHttpRequest();   
    xhttp.open("POST", "api/products", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(json);
    }
    catch{
    document.getElementById("LoginBanner").style.backgroundColor="red";
    document.getElementById("LoginBanner").innerText="There was an error while trying to create your product!";

    setTimeout(() => {
        document.getElementById("LoginBanner").style.backgroundColor="transparent";
        document.getElementById("LoginBanner").innerText="";
    }, "2000");
    }
  getImageFile();
  window.sessionStorage.removeItem("imageData");
  window.sessionStorage.removeItem("previewObject");

  document.getElementById("LoginBanner").style.backgroundColor="green";
  document.getElementById("LoginBanner").innerText="You Successfully created your own Product!";

  setTimeout(() => {
      document.getElementById("LoginBanner").style.backgroundColor="transparent";
      document.getElementById("LoginBanner").innerText="";
  }, "2000");

  setTimeout(() => {
    window.location.href = "/products";
}, "1000")

}

function generateJSON(){
const re = new RegExp("(?<=fakepath).*$");
const imageFile = document.getElementById("uploadImage").value;
let filename = imageFile.match(re);
filename = String(filename).substring(1,String(filename).length);
const filepath = "img/upload/"+filename;
const productTitle = document.getElementById("productTitle").value;
const productDescription = document.getElementById("productDescription").value;
const productPrice = parseInt(document.getElementById("productPrice").value);
const productManufacturer = document.getElementById("productManufacturer").value;
const productColor = document.getElementById("productColor").value;
const productOS = document.getElementById("productOS").value;
let localProductRAM = document.getElementById("productRAM").value;
const productRAM= parseInt(localProductRAM.substring(0, localProductRAM.length - 2));
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
          "manufactorer":productManufacturer,
          "typeGPU": productTypeGPU
      }
  };

const jsonReturn = JSON.stringify(mockProduct);
return jsonReturn;
}

function getImageFile() {
  var file = document.getElementById("uploadImage").files[0];
  pushFileToServer(file);
}


function pushFileToServer(file){
  console.log(file);
  try{
      var xhttp = new XMLHttpRequest();  
      var formData = new FormData();
      formData.append("image", file); 
      xhttp.open("post", "/api/upload", true);
      xhttp.send(formData);
  }
  catch{
      console.log("something didn't work!");
  }
}
