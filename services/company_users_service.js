import DbGetError from "../errors/dbGetError.js";
import JSONMappingError from "../errors/JSONMappingError.js";
import DbPostError from "../errors/dbPostError.js";
import {CompanyUser} from "../models/company_user";

async function getCompanyUserById(id) {
    try {
        const companyUser = await CompanyUser.findById(id);
        // Delete password from the representation before returning it
        delete companyUser.password;
        return companyUser;
    } catch (error) {
        if (error.name === "CastError") {   // CastError is thrown when mongodb doesn't find a product of this id, so we return null.
            return null;
        }

        throw new DbGetError(`Could not get company user by id. Error: ${error}`);
    }
}

async function addNewCompanyUser(userJSON) {
    const userModel = new CompanyUser(userJSON);
    const userModelValidationError = userModel.validateSync();

    if (Object.keys(userModelValidationError).length > 0) {
        // Throws Error if the input doesn't map to the user model
        throw new JSONMappingError(`Please enter a valid company user json representation.`);
    }

    try {
        const companyUser = await userModel.save();
        // Delete password from the representation before returning it
        delete companyUser.password;
        return companyUser;
    } catch (error) {
        throw new DbPostError(`Could not create company user. Error: ${error}`)
    }
}

async function checkCompanyUserCredentialsValidity(email, password) {
    // 1. Get user by email from database
    // 2. Check if password and password in database are the same.
    // 3. (Optional) Hash the passwords when creating or reading a user
}

export {
    getCompanyUserById,
    addNewCompanyUser,
    checkCompanyUserCredentialsValidity
}