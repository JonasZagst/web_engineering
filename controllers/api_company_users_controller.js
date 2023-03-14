import { CompanyUser } from "../models/company_user.js"
import * as users_service from "../services/users_service.js"

/** API Endpoint GET /api/companies/:id
 *
 * Returns all information for a compnay user by their `id`.
 * The password is not returned. */
async function getCompanyUserById(req, res) {
    const { id } = res.params;

    if (id !== null) {
        try {
            const queryResult = await users_service.getUserById(CompanyUser, id);
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

/** Unused API Endpoint POST /api/companies
 *
 * Create a new company user.
 * The information for the company user are passed in the body of the POST request as JSON.
 * The layout of the JSON must match the description of the Mongoose Schema in /models/company_user.js */
async function addNewCompanyUser(req, res) {
    const companyUser = req.body;

    try {
        const newUser = await users_service.addNewUser(CompanyUser, companyUser);
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

/** API Endpoint /api/users/password/
 *
 * Check whether the credentials of a user are valid.
 * E-Mail and password are passed in headers.*/
async function getCompanyUserCredentialValidity(req, res) {
    const { username, passcode } = req.headers;

    if (username !== null && passcode !== null) {
        try {
            const user = await users_service.checkUserCredentialsValidity(CompanyUser, username, passcode);
            if (user) {
                res.statusCode = 200;
                res.json(user);
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

export {
    getCompanyUserById,
    addNewCompanyUser,
    getCompanyUserCredentialValidity
}
