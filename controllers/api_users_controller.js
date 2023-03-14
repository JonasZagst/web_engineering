import { PrivateUser } from "../models/user.js"
import * as users_service from "../services/users_service.js"

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

async function getUserCredentialValidity(req, res) {
    const { username, passcode } = req.headers;
    if (username && passcode) {
        try {
            const user = await users_service.checkUserCredentialsValidity(PrivateUser, username, passcode);
            if (user) {
                res.statusCode = 200;
                res.cookie("credentials", JSON.stringify({ username: username, password: passcode }), { maxAge: 5 * 60 * 60 * 1000 }); // 5 Hours in milliseconds
                res.json(user);
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

async function getUserShoppingCart(req, res) {
    const { id } = req.params;

    if (id !== null) {
        try {
            const queryResult = await users_service.getUserShoppingCart(id);
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

async function clearUserShoppingCart(req, res) {
    const { id } = req.params;
    if (!id) {
        res.sendStatus(400);
    }
    else{
        try {
            await users_service.setUserShoppingCart(id, []);
            res.sendStatus(200);
        } catch (error) {
            res.statusCode = 500;
            console.error(error);
            res.send(error.message);
        }
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
