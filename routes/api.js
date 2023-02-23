import express from "express"

import {addNewProduct, getProductById, getProducts} from "../controllers/api_products_controller.js"
import {
  addItemToUserShoppingCart,
  getUserById,
  getUserCredentialValidity,
  getUserShoppingCart
} from "../controllers/api_users_controller.js"

const apiRouter = express.Router();

// API Routs
apiRouter.get("/api/products", getProducts);
apiRouter.get("/api/products/:id", getProductById);
apiRouter.post("/api/products", addNewProduct);

apiRouter.get("/api/user/password", getUserCredentialValidity);
apiRouter.get("/api/user/:id", getUserById);

apiRouter.get("/api/user/:id/shoppingCart", getUserShoppingCart);
apiRouter.put("/api/user/:id/shoppingCart", addItemToUserShoppingCart);

// HTML Document Routs
apiRouter.get("/", (req, res) => {
  res.render("index")
});
apiRouter.get("/register", (req, res) => {
  res.render("register")
})
apiRouter.get("/login", (req, res) => {
  res.render("login")
})
apiRouter.get("/products", (req, res) => {
  res.render("productPage")
})

export {
  apiRouter
}