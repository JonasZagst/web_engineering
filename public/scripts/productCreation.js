function preview_image(event) {
    var reader =  new FileReader();
    reader.onload = function(){
      var output = document.getElementById('uploadedImage');
      output.src = reader.result;
      var filename = event.target.files[0].name;
      console.log(filename);
    }
    reader.readAsDataURL(event.target.files[0]);
    reader.readAsText(event.target.files[0]);   
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