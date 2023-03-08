import express from "express"
//for image Upload
import expressFileUpload from 'express-fileupload'

import {addNewProduct, getProductById, getProducts} from "../controllers/api_products_controller.js"
import {
  addItemToUserShoppingCart,
  getUserById,
  getUserByName,
  getUserCredentialValidity,
  addNewUser,
  getUserShoppingCart
} from "../controllers/api_users_controller.js"

const apiRouter = express.Router();

apiRouter.use(expressFileUpload());
// API Routes
apiRouter.get("/api/products", getProducts);
apiRouter.get("/api/products/:id", getProductById);
apiRouter.post("/api/products", addNewProduct);

apiRouter.get("/api/users/password", getUserCredentialValidity);
apiRouter.get("/api/users/id/:id", getUserById);
apiRouter.get("/api/users/name/:name", getUserByName);
apiRouter.post("/api/users", addNewUser);

apiRouter.get("/api/users/:id/shoppingCart", getUserShoppingCart);
apiRouter.post("/api/users/:id/shoppingCart/:productID", addItemToUserShoppingCart);

//Image Upload
apiRouter.post('/api/upload', (req, res) => {
  // Get the file that was set to our field named "image"
  const { image } = req.files;
  // If no image submitted, exit
  if (!image) return res.sendStatus(400);

  // Move the uploaded image to our upload folder
  image.mv('public/img/upload/' + image.name);
  // All good
  res.sendStatus(200);
});

// HTML Document Routes
apiRouter.get("/", (req, res) => {
  res.render("index")
});
apiRouter.get("/register", (req, res) => {
  res.render("register")
});
apiRouter.get("/login", (req, res) => {
  res.render("login")
});
apiRouter.get("/products", (req, res) => {
  res.render("productPage")
});
apiRouter.get("/productCreation", (req, res) => {
  res.render("productCreation")
});


export {
  apiRouter
}