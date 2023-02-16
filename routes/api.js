import express from "express"

import {getProductById, getProducts} from "../controllers/api_products_controller.js"
import {
  addItemToUserShoppingCart,
  getUserById,
  getUserCredentialValidity,
  getUserShoppingCart
} from "../controllers/api_users_controller.js"

const router = express.Router();

router.get("/api/products", getProducts);
router.get("/api/products/:id", getProductById);
router.post("/api/products")

router.get("/api/user/password", getUserCredentialValidity);
router.get("/api/user/:id", getUserById);

router.get("/api/user/:id/shoppingCart", getUserShoppingCart);
router.post("/api/user/:id/shoppingCart", addItemToUserShoppingCart);
