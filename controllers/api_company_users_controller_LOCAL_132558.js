import {CompanyUser} from "../models/company_user.js"
import * as users_service from "../services/users_service.js"

async function getCompanyUserById(req, res) {
    const {id} = res.params;

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

async function addNewCompanyUser(req, res) {
    const companyUser = req.body;

    try {
        const newUser = await users_service.addNewUser(companyUser);
        res.statusCode = 201;
        res.json(newUser);
    } catch (error) {
        if (error.name === "JSONMappingError") {
            res.statusCode = 400;
        } else if (error.name === "DuplicateKeyError") {
            res.statusCode = 403;
        } else {
            res.statusCode = 500;
            console.error(error);
        }
        res.json({
            error: error.code,
            message: error.message
        });
    }
}

async function getCompanyUserCredentialValidity(req, res) {
    const {username, passcode} = req.headers;

    if (username !== null && passcode !== null) {
        try {
            const user = users_service.checkUserCredentialsValidity(CompanyUser, username, passcode);

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
