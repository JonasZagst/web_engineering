import express from "express"

import { addNewProduct, getProductById, getProducts } from "../controllers/api_products_controller.js"
import {
  addItemToUserShoppingCart,
  getUserById,
  getUserCredentialValidity,
  addNewUser,
  getUserShoppingCart
} from "../controllers/api_users_controller.js"

const apiRouter = express.Router();

// API Routes
apiRouter.get("/api/products", getProducts);
apiRouter.get("/api/products/:id", getProductById);
apiRouter.post("/api/products", addNewProduct);

apiRouter.get("/api/users/password", getUserCredentialValidity);
apiRouter.get("/api/users/:id", getUserById);
apiRouter.post("/api/users", addNewUser);

apiRouter.get("/api/users/:id/shoppingCart", getUserShoppingCart);
apiRouter.put("/api/users/:id/shoppingCart", addItemToUserShoppingCart);

export {
  apiRouter
}
