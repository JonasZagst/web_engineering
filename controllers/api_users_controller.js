import * as users_service from "../services/users_service.js"

async function getUserById(req, res) {
    const {id} = req.params;
    if (id !== null) {
        try {
            const queryResult = await users_service.getUserById(id);
            if (!queryResult) {
                res.statusCode = 404;
                res.send("Not found");
            } else {
                res.statusCode = 200;
                res.json(queryResult)
                res.json(email,password);
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

async function getUserByName(req, res) {
    const {name} = req.params;
    if (name !== null) {
        try {
            const queryResult = await users_service.getUserByName(name);
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
    const {username,passcode} = req.headers;
    if (username,passcode !== null) {
        try {
            let queryResult = await users_service.getUserByName(username);

            if (queryResult.length==0|| queryResult==null) {
                res.statusCode = 404;
                res.send("User Not Found");
            }
            else {
                const password =queryResult[0].password;
                if(passcode==password){
                    res.statusCode = 200;
                    res.send("Login succesfull!")
                }
                else {
                    res.statusCode =200;
                    res.send("Login failed!")
                }    
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


    // 1. Get user by email from database
    // 2. Check if password and password in database are the same.
    // 3. (Optional) Hash the passwords when creating or reading a user
}

async function getUserShoppingCart(req, res) {
    const {id} = req.params;

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
    const {id,productID} = req.params;

    if (!req.body || id === null){
        res.statusCode = 400;
        res.send("Bad Request");
        return;
    }
    try {
        const newShoppingCart = await users_service.addItemToUserShoppingCart(id, productID);
        res.statusCode = 201;
        res.json(newShoppingCart);
    } catch (error){
        res.statusCode = 500;
        console.error(error);
        res.send(error.message);
    }
}

export {
    getUserById,
    getUserByName,
    addNewUser, 
    getUserCredentialValidity,
    getUserShoppingCart,
    addItemToUserShoppingCart
}
