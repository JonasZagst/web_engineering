async function getUserById(req, res) {
  const { id } = res.params;

  // TODO: Delete key for password before returning

  // const product = ...;

  // res.json(product);
}

async function addNewUser(req, res) {
  const product = req.body;

  try {
    // product = service.createUser(product);
    // res.json(product)
  } catch (err) {
    // TODO: Error handaling, 400 if format is wrong, else 500
  }
}

async function getUserCredentialValidity(req, res) {
  const { email, password } = req.body;

  // 1. Get user by email from database
  // 2. Check if password and password in database are the same.
  // 3. (Optional) Hash the passwords when creating or reading a user
}

async function getUserShoppingCart(req, res) {

}

async function addToUserShoppingCart(req, res) {

}

export {
  getUserById,
  addNewUser,
  getUserCredentialValidity,
  getUserShoppingCart,
  addToUserShoppingCart
}
