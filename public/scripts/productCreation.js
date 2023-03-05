//For Page Preview
function preview_image(event) {
  var reader =  new FileReader();
  reader.readAsDataURL(event.target.files[0]);
  var file = null;
  reader.onload = function(){
    var output = document.getElementById('uploadedImage');
    output.src = reader.result;
    file = event.target.files[0];
    var filename = event.target.files[0].name;
    pushFileToServer(file);
  } 
}

function preview_text(){
let title = document.getElementById("productTitle").value;
document.getElementById("productPreviewTitle").innerText= title;

let description = document.getElementById("productDescription").value;
document.getElementById("productPreviewDescription").innerText= description;

let price = document.getElementById("productPrice").value;
price="Price: "+price+"€"
document.getElementById("productPreviewPrice").innerText= price;

}

function pushFileToServer(file){
console.log("Arrived");
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

function pushNewProduct()
{
json = generateJSON();
try{
  var xhttp = new XMLHttpRequest();   
  xhttp.open("POST", "api/products", true);
  xhttp.setRequestHeader("Content-type","application/json");
  xhttp.send(json);
  console.log("Finished!")
  }
  catch{
      console.log("something didn't work!");
  }
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
