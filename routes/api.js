import express from "express"

import {addNewProduct, getProductById, getProducts} from "../controllers/api_products_controller.js"
import {
    addItemToUserShoppingCart,
    addNewUser,
    getUserById,
    getUserCredentialValidity,
    getUserShoppingCart
} from "../controllers/api_users_controller.js"
import {
    addNewCompanyUser,
    getCompanyUserById,
    getCompanyUserCredentialValidity
} from "../controllers/api_company_users_controller.js";

const apiRouter = express.Router();

// API Routes

/** Retrieve all products. */
apiRouter.get("/api/products", getProducts);

/** Retrieve product information by the `id` of a product. */
apiRouter.get("/api/products/:id", getProductById);

/** Create a new product.
 * The information for the new product is passed in the body of the POST request as JSON.
 * The layout of the JSON must match the description of the Mongoose Schema in /models/product.js */
apiRouter.post("/api/products", addNewProduct);


/** Check whether the credentials of a user are valid.
 * E-Mail and password are passed in headers.  */
apiRouter.get("/api/users/password", getUserCredentialValidity);

/** Returns all information for a user by their `id`.
 * The password is not returned. */
apiRouter.get("/api/users/:id", getUserById);

/** Create a new user.
 * The information for the user are passed in the body of the POST request as JSON.
 * The layout of the JSON must match the description of the Mongoose Schema in /models/user.js */
apiRouter.post("/api/users", addNewUser);

/** Get the shopping cart of a certain user. */
apiRouter.get("/api/users/:id/shoppingCart", getUserShoppingCart);

/** Add a product by its id to the shopping cart of a certain user.
 * The ID of the product must be passed in the body of the request with the name `productId`. */
apiRouter.put("/api/users/:id/shoppingCart", addItemToUserShoppingCart);

/** Check whether he credentials of a company user are valid.
 * E-Mail and password are passed in headers. */
apiRouter.get("/api/companies/password", getCompanyUserCredentialValidity);

/** Returns all information for a compnay user by their `id`.
 * The password is not returned. */
apiRouter.get("/api/companies/:id", getCompanyUserById);

/** Create a new company user.
 * The information for the company user are passed in the body of the POST request as JSON.
 * The layout of the JSON must match the description of the Mongoose Schema in /models/company_user.js */
apiRouter.post("/api/companies", addNewCompanyUser);

export {
    apiRouter
}
