import express from "express"

import { getProducts, getProductById } from "../controllers/api_products_controller.js"
import {
  getUserById,
  getUserCredentialValidity,
  getUserShoppingCart,
  addToUserShoppingCart,
  addNewUser
} from "../controllers/api_users_controller.js"

const router = express.Router();

router.get("/api/products", getProducts);
router.get("/api/products/:id", getProductById);
router.post("/api/products", addNewProduct);

router.get("/api/user/:id", getUserById);
router.post("/api/user/", addNewUser);
router.get("/api/user/password", getUserCredentialValidity);

router.get("/api/user/:id/shoppingCart", getUserShoppingCart);
router.post("/api/user/:id/shoppingCart", addToUserShoppingCart);
