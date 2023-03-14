import { PrivateUser } from "../models/user.js"
import * as users_service from "../services/users_service.js"

/** API Endpoint for GET /api/users/:id
 *
 * Returns all information for a user by their `id`.
 * The password is not returned. */
async function getUserById(req, res) {
    const { id } = req.params;

    if (id !== null) {
        try {
            const user = await users_service.getUserById(PrivateUser, id);
            if (!user) {
                res.statusCode = 404;
                res.send("Not found");
            } else {
                res.statusCode = 200;
                res.json(user)
            }
        } catch (error) {
            res.statusCode = 500;
            console.error(error);
            res.send(error.message);
        }
    } else {
        res.statusCode = 400;
        res.send("Bad Request");
    }
}

/** API Endpoint for POST /api/users/
 *
 * Create a new user.
 * The information for the user are passed in the body of the POST request as JSON.
 * The layout of the JSON must match the description of the Mongoose Schema in /models/user.js */
async function addNewUser(req, res) {
    const user = req.body;

    try {
        const newUser = await users_service.addNewUser(PrivateUser, user);
        res.statusCode = 201;
        res.json(newUser);
    } catch (error) {
        if (error.name === "JSONMappingError") {
            res.statusCode = 400;
            res.json({
                error: error.code,
                message: error.message
            });
        } else if (error.name === "DuplicateKeyError") {
            res.statusCode = 403;
            res.json({
                error: error.code,
                message: error.message
            });
        } else {
            res.statusCode = 500;
            console.error(error);
        }
    }
}

/** API Endpoint for GET /api/users/password
 *
 * Check whether the credentials of a user are valid.
 * E-Mail and password are passed in headers.  */
async function getUserCredentialValidity(req, res) {
    const { username, passcode } = req.headers;
    if (username !== null && passcode !== null) {
        try {
            const user = users_service.checkUserCredentialsValidity(PrivateUser, username, passcode);
            if (user) {
                res.statusCode = 200;
                res.json(user);
                res.cookie("credentials", JSON.dump({ username: username, password: passcode }), { maxAge: 5 * 60 * 60 * 1000 }); // 5 Hours in milliseconds
            } else {
                res.statusCode = 401;
                res.send("Invalid Authentication!");
            }
        } catch (error) {
            res.statusCode = 500;
            console.error(error);
            res.send(error.message);
        }
    } else {
        res.statusCode = 400;
        res.send("Bad Request");
    }
}

/** API Endpoint for GET /api/users/:id/shoppingCart
 *
 * Get the shopping cart of a certain user. */
async function getUserShoppingCart(req, res) {
    const { id } = req.params;

    if (id !== null) {
        try {
            const queryResult = users_service.getUserShoppingCart(id);
            if (!queryResult) {
                res.statusCode = 404;
                res.send("Not found");
            } else {
                res.statusCode = 200;
                res.json(queryResult);
            }
        } catch (error) {
            res.statusCode = 500;
            console.error(error);
            res.send(error.message);
        }
    } else {
        res.statusCode = 400;
        res.send("Bad Request");
    }
}

/** API Endpoint for POST /api/users/:id/shoppingCart/:productID
 *
 * Adds an productId to the shopping cart of an user. */
async function addItemToUserShoppingCart(req, res) {
    const { id, productID } = req.params;

    if (!req.body || id === null) {
        res.statusCode = 400;
        res.send("Bad Request");
        return;
    }
    try {
        const newShoppingCart = users_service.addItemToUserShoppingCart(id, productID);
        res.statusCode = 201;
        res.json(newShoppingCart);
    } catch (error) {
        res.statusCode = 500;
        console.error(error);
        res.send(error.message);
    }
}

/** API Endpoint for DELETE /api/users/:id/shoppingCart
 *
 * Clears the shopping cart of an user. */
async function clearUserShoppingCart(req, res) {
    const { userId } = req.params;
    if (!userId) {
        res.sendStatus(400);
    }
    try {
        users_service.setUserShoppingCart(userId, []);
        res.sendStatus(200);
    } catch (error) {
        res.statusCode = 500;
        console.error(error);
        res.send(error.message);
    }
}

export {
    getUserById,
    addNewUser,
    getUserCredentialValidity,
    getUserShoppingCart,
    addItemToUserShoppingCart,
    clearUserShoppingCart
}
