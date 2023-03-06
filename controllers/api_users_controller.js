import * as users_service from "../services/users_service.js"

async function getUserById(req, res) {
    const { id } = req.params;

    if (id !== null) {
        try {
            const queryResult = await users_service.getUserById(id);
            if (!queryResult) {
                res.statusCode = 404;
                res.send("Not found");
            } else {
                res.statusCode = 200;
                res.json(queryResult)
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
        const newUser = await users_service.addNewUser(user);
        res.statusCode = 201;
        res.json(newUser);
    } catch (error) {
        if (error.name === "JSONMappingError") {
            res.statusCode = 400;
        } else {
            res.statusCode = 500;
            console.error(error);
        }
        res.send(error.message);
    }
}

async function getUserCredentialValidity(req, res) {
    const { username, passcode } = req.headers;

    if (username !== null && passcode !== null) {
        try {
            const user = users_service.checkUserCredentialsValidity(username, passcode);

            if (user) {
                res.statusCode = 200;
                res.json({ userId: user.id });
            } else {
                res.statusCode = 401;
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
    const { id } = req.params;

    if (!req.body || id === null) {
        res.statusCode = 400;
        res.send("Bad Request");
        return;
    }
    const { productId } = req.body;

    try {
        const newShoppingCart = users_service.addItemToUserShoppingCart(id, productId);
        res.statusCode = 201;
        res.json(newShoppingCart);
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
    addItemToUserShoppingCart
}
