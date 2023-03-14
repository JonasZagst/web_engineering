import { PrivateUser } from "../models/user.js";
import DbGetError from "../errors/dbGetError.js";
import JSONMappingError from "../errors/JSONMappingError.js";
import DbPostError from "../errors/dbPostError.js";
import DbPutError from "../errors/dbPutError.js";
import DuplicateKeyError from "../errors/duplicateKeyError.js";

/** The Address of the user, where they want their stuff delivered to.
 * @typedef {Object} Address
 * @property {string} country
 * @property {string} city
 * @property {number} zip
 * @property {string} street
 * @property {number} houseNumber */

/** The type of a private user, such that Mongoose can create a MongoDB Document from it.
 * @typedef {Object} PrivateUser
 * @property {string} PrivateUser.firstName
 * @property {string} PrivateUser.lastName
 * @property {string} PrivateUser.email
 * @property {string} PrivateUser.password
 * @property {Address} PrivateUser.address
 * @property {string[]} [PrivateUser.shoppingCart] List of product IDs which the user put into their shopping cart.*/

/** The ID type for a user
 * @typedef {string} UserID */

/** The ID type for a product
 * @typedef {string} ProductID */

/** Retrieves a private user by their ID from the database.
 * @param {any} model The Mongoose user model of which the user is
 * @param {string} id The id of the user of which the information should be returned
 *
 * @returns {Object|null} The Mongoose model for PrivateUser with the according id */
async function getUserById(model, id) {
    try {
        // Find the user by id and remove the password from the result before returning
        return await model.findById(id).select("-password");
    } catch (error) {
        // CastError is thrown when mongodb doesn't find a user of this id, so we return null.
        if (error.name === "CastError") {
            return null;
        }

        throw new DbGetError(`Could not get user by id. Error: ${error}`);
    }
}

/** Adds a new private user.
 * @param {any} model The Mongoose user model of which the user is
 * @param {PrivateUser} userJSON
 *
 * @returns {?Object} The new Mongoose model for PrivateUser */
async function addNewUser(model, userJSON) {
    console.log(userJSON);
    const userModel = new model(userJSON);
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
        if (error.code === 11000) {
            throw new DuplicateKeyError();
        }

        throw new DbPostError(`Could not create user. Error: ${error}`);
    }
}

/** Checks whether details provided by a user login are valid.
 * @param {any} model The Mongoose user model of which the user is
 * @param {string} email The email specified by the user
 * @param {string} password The password provided by the user
 *
 * @returns {PrivateUser|null} returns the user if E-Mail and password match an user in the database and null if no match could be found.*/
async function checkUserCredentialsValidity(model, email, password) {
    try {
        return await model.findOne({ email: email, password: password });
    } catch (error) {
        // CastError is thrown when mongodb doesn't find a user of this id, so we return null.
        if (error.name === "CastError") {
            return null;
        }

        // FIXME: Why this error message?
        throw new DbGetError(`Could check user credentials. Could not find user per email. Error: ${error}`);
    }
}

/** Get all Product-IDs in the shopping cart of the user
 * @param {UserID} userId The id of the user
 *
 * @returns {?ProductID[]} A list of product IDs for the items in the shopping cart */
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

/** Add a product to the user shopping cart.
 * @param {UserID} userId The user whose shopping cart should be modified
 * @param {ProductID} productId The product that will be added to the shopping cart
 * @returns {?ProductID[]} The updated shopping cart of the user */
async function addItemToUserShoppingCart(userId, productId) {
    try {
        await PrivateUser.findByIdAndUpdate(userId,
            { $push: { shoppingCart: productId } }
        );
        const updatedUser = await PrivateUser.findById(userId);
        return updatedUser.shoppingCart;
    } catch (error) {
        if (error.name === "CastError") {
            return null;
        }

        throw new DbPutError(`Could not update user shopping cart by id. Error: ${error}`);
    }
}

/** Updates the shopping cart of a user to `products`
 * @param {UserID} userId The user whose shopping cart should be modified
 * @param {ProductID[]} products The products that will be added to the shopping cart
 * @returns {?ProductID[]} The updated shopping cart of the user */
async function setUserShoppingCart(userId, products) {
    try {
        await PrivateUser.findByIdAndUpdate(userId, { shoppingCart: products });
        const updatedUser = await PrivateUser.findById(userId);
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
    addItemToUserShoppingCart,
    setUserShoppingCart
}
