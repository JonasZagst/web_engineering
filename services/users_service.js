import {PrivateUser} from "../models/user.js";
import DbGetError from "../errors/dbGetError.js";
import JSONMappingError from "../errors/JSONMappingError.js";
import DbPostError from "../errors/dbPostError.js";
import DbPutError from "../errors/dbPutError.js";

async function getUserById(id) {
    try {
        const privateUser = await PrivateUser.findById(id).select("-password");
        // Separate the password from the json representation before returning it
        if (privateUser != null) {
            return privateUser;
        }
        return null;
    } catch (error) {
        if (error.name === "CastError") {   // CastError is thrown when mongodb doesn't find a user of this id, so we return null.
            return null;
        }

        throw new DbGetError(`Could not get user by id. Error: ${error}`);
    }
}

async function addNewUser(userJSON) {
    const userModel = new PrivateUser(userJSON);
    const userModelValidationError = userModel.validateSync();

    if (userModelValidationError != null) {
        // Throws Error if the input doesn't map to the user model
        throw new JSONMappingError(`Please enter a valid user json representation.`);
    }

    try {
        const privateUser = await userModel.save();
        // Delete password from the representation before returning it
        delete privateUser.password;
        return privateUser;
    } catch (error) {
        throw new DbPostError(`Could not create user. Error: ${error}`)
    }
}

async function checkUserCredentialsValidity(userEmail, password) {
    try {
        const privateUser = await PrivateUser.findOne({email: userEmail});

        if (password.length === 0) {
            return null;
        } else if (password === privateUser[0].password) {
            return true;
        }

        return false;
    } catch (error) {
        if (error.name === "CastError") {   // CastError is thrown when mongodb doesn't find a user by this email, so we return null.
            return null;
        }

        throw new DbGetError(`Could check user credentials. Could not find user per email. Error: ${error}`);
    }
}

async function getUserShoppingCart(userId) {
    try {
        const privateUser = await PrivateUser.findById(userId)
        return privateUser.shoppingCart;
    } catch (error) {
        if (error.name === "CastError") {
            return null;
        }

        throw new DbGetError(`Could not get user shopping cart by id. Error: ${error}`);
    }
}

async function addItemToUserShoppingCart(userId, productId) {
    try {
        PrivateUser.update(
            {_id: userId},
            {$push: {shoppingCart: productId}}
        );
        const updatedUser = PrivateUser.findById(userId);
        return updatedUser.shoppingCart;
    } catch (error) {
        if (error.name === "CastError") {
            return null;
        }

        throw new DbPutError(`Could not update user shopping cart by id. Error: ${error}`);
    }
}

export {
    getUserById,
    addNewUser,
    checkUserCredentialsValidity,
    getUserShoppingCart,
    addItemToUserShoppingCart
}