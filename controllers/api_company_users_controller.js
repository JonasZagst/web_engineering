import { CompanyUser } from "../models/company_user.js"
import * as users_service from "../services/users_service.js"

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

async function addNewCompanyUser(req, res) {
    const companyUser = req.body;

    try {
        const newUser = await users_service.addNewUser(companyUser);
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

async function getCompanyUserCredentialValidity(req, res) {
    const { email, password } = req.body;

    // 1. Get user by email from database
    // 2. Check if password and password in database are the same.
    // 3. (Optional) Hash the passwords when creating or reading a user
}

export {
    getCompanyUserById,
    addNewCompanyUser,
    getCompanyUserCredentialValidity
}
