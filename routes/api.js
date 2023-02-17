import express from "express"

import {getProductById, getProducts} from "../controllers/api_products_controller.js"
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
apiRouter.post("/api/products")

apiRouter.get("/api/user/password", getUserCredentialValidity);
apiRouter.get("/api/user/:id", getUserById);

apiRouter.get("/api/user/:id/shoppingCart", getUserShoppingCart);
apiRouter.post("/api/user/:id/shoppingCart", addItemToUserShoppingCart);

// HTML Document Routs
apiRouter.get("/", (req, res) => {
  res.render("index")
});

export {
  apiRouter
}