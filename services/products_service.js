import {Product} from "../models/product.js";
import DbGetError from "../errors/dbGetError.js";
import JSONMappingError from "../errors/JSONMappingError.js";
import DbPostError from "../errors/dbPostError.js";

async function getProducts() {
    try {
        return await Product.find({});
    } catch (error) {
        throw new DbGetError(`Could not get all products. Error: ${error}`);
    }
}

async function getProductsQuery(searchString) {
    try {
        return await Product.find({$text: {$search: searchString}});
    } catch (error) {
        throw new DbGetError(`Could not get all products by querry string. Error: ${error}`);
    }
}

async function getProductById(id) {
    try {
        return await Product.findById(id);
    } catch (error) {
        if (error.name === "CastError") {   // CastError is thrown when mongodb doesn't find a product of this id, so we return null.
            return null;
        }
        throw new DbGetError(`Could not get product by id. Error: ${error}`);
    }
}

async function addNewProduct(productJSON) {
    const productModel = new Product(productJSON);
    const validationError = productModel.validateSync();

    if (Object.keys(validationError).length > 0) {
        throw new JSONMappingError(`Please enter a valid product json representation.`);
    }

    try {
        return await productModel.save();
    } catch (error) {
        throw new DbPostError(`Could no create product. Error: ${error}`);
    }
}

export {
    getProducts,
    getProductById,
    addNewProduct,
    getProductsQuery
}