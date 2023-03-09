function pushNewUser()
{
  typeofuser =""
  if(document.getElementById("registerInputCompanyName"))
  {
    typeofuser="company";
  }
  else if(document.getElementById("registerInputCompanyName")){
    typeofuser="private";
  }
  json = generateJSON(typeofuser);
  try{
    var xhttp = new XMLHttpRequest();   
    if(typeofuser=="company"){
      xhttp.open("POST", "api/companies", true);
    }
    else{
      xhttp.open("POST", "api/users", true);
    }
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(json);
    //setTimeout(() => {
        //window.location.href = "/";
      //}, "1000")
    }
    catch{
        console.log("something didn't work!");
    }
}

function generateJSON(typeofuser){
  var companyName="";
  var firstName="";
  var lastName="";
  if(typeofuser=="company"){
    companyName = document.getElementById("registerInputCompanyName").value;
  }
  else{
    firstName = document.getElementById("registerInputFirstName").value;
    lastName = document.getElementById("registerInputLastName").value;
  }
  const email = document.getElementById("registerInputEmail").value;
  const password = document.getElementById("registerInputPassword").value;
  const country = document.getElementById("country").value;
  const city  = document.getElementById("city").value;
  const zip = parseInt(document.getElementById("zip").value);
  const street = document.getElementById("street").value;
  const houseNumber = document.getElementById("houseNumber").value;

  let mockUser ="";
  if(typeofuser=="company"){
    mockUser =  
    {
        "name":companyName,
        "email": email,
        "password": password,
        "address": {
            "country": country,
            "city": city,
            "zip": zip,
            "street": street,
            "houseNumber":houseNumber
        }
    };
  }
  else {
    mockUser =  
    {
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "password": password,
        "address": {
            "country": country,
            "city": city,
            "zip": zip,
            "street": street,
            "houseNumber":houseNumber
        },
        "shoppingCart": []
    };
  }
  const jsonReturn = JSON.stringify(mockUser);
  console.log(jsonReturn);
  return jsonReturn;
}

function changeAccountUse(event){
  console.log(event.path[0].id);
  if(event.path[0].id=="containerLoginCaptionLeft")
  {
    document.getElementById("containerLoginCaptionLeft").style.border="solid black";
    document.getElementById("containerLoginCaptionRight").style.border="none";
    document.getElementById("nameGrid").innerHTML=`<label for="registerInputCompanyName">Company Name:</label></br>
    <input type="text" id="registerInputCompanyName" name="registerInputCompanyName"></br>`
  }
  else if(event.path[0].id=="containerLoginCaptionRight"){  
      document.getElementById("containerLoginCaptionRight").style.border="solid black";
      document.getElementById("containerLoginCaptionLeft").style.border="none";
      document.getElementById("nameGrid").innerHTML=`<div class="InlineGrid" id="inlineGridName">
      <div class="leftInlineElement">
          <label for="registerInputFirstName" id="registerLabelFirstName">First Name:</label></br>
          <input type="text" id="registerInputFirstName" name="first-name"></br>
      </div>
      <div class="rightInlineElement">
          <label for="registerInputLastName" id="registerLabelFirstName">Last Name:</label></br>
          <input type="text" id="registerInputLastName" name="last-name"></br>
      </div>
  </div>`
  }
}