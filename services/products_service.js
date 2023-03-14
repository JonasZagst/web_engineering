import { Product } from "../models/product.js";
import DbGetError from "../errors/dbGetError.js";
import JSONMappingError from "../errors/JSONMappingError.js";
import DbPostError from "../errors/dbPostError.js";

/** The type for the product specification of a product.
 * @typedef {Object} ProductSpecification
 * @property {string} operatingSystem
 * @property {number} amountRAM
 * @property {string} color
 * @property {string} typeCPU
 * @property {string} typeGPU
 * @property {string} manufactorer
 */

/** The type of a product, such that Mongoose can create a MongoDB Document from it.
 * @typedef {Object} Product
 * @property {string} productName
 * @property {string} [productDescription]
 * @property {number} price
 * @property {string[]} image A list of paths to images for the product.
 * @property {ProductSpecification} productSpecification
 */

/** The ID type for a product
 * @typedef {string} ProductID */

/** Get a list of all products that exist.
 * @returns {Product[]} */
async function getProducts() {
    try {
        return await Product.find({});
    } catch (error) {
        throw new DbGetError(`Could not get all products. Error: ${error}`);
    }
}

/** Get a list of all products matching the query.
 * @param {string} searchString The raw search string as entered by the user
 *
 * @returns {Product[]} */
async function getProductsQuery(searchString) {
    try {
        return await Product.find({ $text: { $search: searchString } });
    } catch (error) {
        throw new DbGetError(`Could not get all products by querry string. Error: ${error}`);
    }
}

/** Get a product by its ID
 * @param {ProductID} id The id of the product
 *
 * @returns {?Product} The product or null if `id` has no product associated with it. */
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

/** Adds a new product to the database
 * @param {Product} productJSON
 *
 * @returns {?Object} The new Mongoose object for the product */
async function addNewProduct(productJSON) {
    const productModel = new Product(productJSON);
    const validationError = productModel.validateSync();

    if (validationError != null) {
        // Throws Error if the input doesn't map to any product model
        throw new JSONMappingError(`Please enter a valid product json representation.`);
    }

    try {
        return await productModel.save();
    } catch (error) {
        throw new DbPostError(`Could not create product. Error: ${error}`);
    }
}

export {
    getProducts,
    getProductById,
    addNewProduct,
    getProductsQuery
}
