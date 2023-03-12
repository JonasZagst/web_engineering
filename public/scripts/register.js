/** JS File for /register */

/** Registers a new user based on the user inputs. */
function pushNewUser() {
  let typeofuser = ""

  if (document.getElementById("typeofUser").checked) {
    typeofuser = "company";
  }
  else {
    typeofuser = "private";
  }

  let json = generateJSON(typeofuser);

  try {
    let xhttp = new XMLHttpRequest();

    if (typeofuser == "company") {
      xhttp.open("POST", "api/companies", true);
    }
    else {
      xhttp.open("POST", "api/users", true);
    }

    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.onload = () => {
      const response = JSON.parse(xhttp.responseText);
      const responseErr = response.error;
      openPopUpBanner(responseErr);
    };
    xhttp.send(json);
  }
  catch (error) {
    console.error(`pushNewUser: ${error}`);
  }
}

/** Open a popup window to inform the user whether the registration of the user account succeeded.
 * @param {Number|any} error */
function openPopUpBanner(error) {
  if (typeof(error)=="number") {
    // Alert Banner
    document.getElementById("LoginBanner").style.backgroundColor = "red";
    if (error == 5) {
      document.getElementById("LoginBanner").innerText = "There was an error while trying to create your account. Please make sure you filled out all necessary fields(*). The fields 'zip' and 'number' have to be of type number!";
    }
    else if (error == 4) {
      document.getElementById("LoginBanner").innerText = "There was an error while trying to create your account. The username/email-adress you provided already has an existing account!";
    }
    setTimeout(() => {
      document.getElementById("LoginBanner").style.backgroundColor = "transparent";
      document.getElementById("LoginBanner").innerText = "";
    }, 4000);
  }
  else {
    // Success Banner
    document.getElementById("LoginBanner").style.backgroundColor = "green";
    document.getElementById("LoginBanner").innerText = "You Successfully created your own Account!";

    setTimeout(() => {
      document.getElementById("LoginBanner").style.backgroundColor = "transparent";
      document.getElementById("LoginBanner").innerText = "";
      window.location.href = "/";
    }, 4000);
  }
}

/** Generate the json string for the register user request to the backend.
 * @param {"company"|"private"} typeofuser*/
function generateJSON(typeofuser) {
  let companyName = "";
  let firstName = "";
  let lastName = "";
  if (typeofuser == "company") {
    companyName = document.getElementById("registerInputCompanyName").value;
  }
  else {
    firstName = document.getElementById("registerInputFirstName").value;
    lastName = document.getElementById("registerInputLastName").value;
  }
  const email = document.getElementById("registerInputEmail").value;
  const password = document.getElementById("registerInputPassword").value;
  const country = document.getElementById("country").value;
  const city = document.getElementById("city").value;
  const zip = parseInt(document.getElementById("zip").value);
  const street = document.getElementById("street").value;
  const houseNumber = document.getElementById("houseNumber").value;

  let mockUser = null;
  if (typeofuser == "company") {
    mockUser = {
      "name": companyName,
      "email": email,
      "password": password,
      "address": {
        "country": country,
        "city": city,
        "zip": zip,
        "street": street,
        "houseNumber": houseNumber
      }
    };
  } else {
    mockUser = {
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "password": password,
      "address": {
        "country": country,
        "city": city,
        "zip": zip,
        "street": street,
        "houseNumber": houseNumber
      },
      "shoppingCart": []
    };
  }
  return JSON.stringify(mockUser);
}

/** Change the form if the user switches from a private user registration form to a company user one or vice versa.
 * @param {Object} event */
function changeAccountUse(event) {
    if(document.getElementById("typeofUser").checked)
    {   
      document.getElementById("nameGrid").innerHTML = `<label for="registerInputCompanyName">Company Name:</label></br>
      <input type="text" id="registerInputCompanyName" name="registerInputCompanyName"></br>`;
    }
    else{
      document.getElementById("nameGrid").innerHTML = `<div class="InlineGrid" id="inlineGridName">
      <div class="leftInlineElement">
          <label for="registerInputFirstName" id="registerLabelFirstName">First Name:</label></br>
          <input type="text" id="registerInputFirstName" name="first-name"></br>
      </div>
      <div class="rightInlineElement">
          <label for="registerInputLastName" id="registerLabelFirstName">Last Name:</label></br>
          <input type="text" id="registerInputLastName" name="last-name"></br>
      </div>
      </div>`;
    }
}
