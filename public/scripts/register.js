function pushNewUser()
{
  json = generateJSON();
  try{
    var xhttp = new XMLHttpRequest();   
    xhttp.open("POST", "api/users", true);
    xhttp.setRequestHeader("Content-type","application/json");
    xhttp.send(json);
    setTimeout(() => {
        window.location.href = "/";
      }, "1000")
    }
    catch{
        console.log("something didn't work!");
    }
}

function generateJSON(){
  const firstName = document.getElementById("registerInputFirstName").value;
  const lastName = document.getElementById("registerInputLastName").value;
  const email = document.getElementById("registerInputEmail").value;
  const password = document.getElementById("registerInputPassword").value;
  const country = document.getElementById("country").value;
  const city  = document.getElementById("city").value;
  const zip = parseInt(document.getElementById("zip").value);
  const street = document.getElementById("street").value;
  const houseNumber = document.getElementById("houseNumber").value;

  const mockUser = 
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
  
  const jsonReturn = JSON.stringify(mockUser);
  console.log(jsonReturn);
  return jsonReturn;
}