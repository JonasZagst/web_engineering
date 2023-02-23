import * as products_service from "../services/products_service.js";

async function getProducts(req, res) {

    const {search} = req.params;

    try {
        let queryResult;

        if (search) {
            queryResult = await products_service.getProductsQuery(search);
        } else {
            queryResult = await products_service.getProducts();
        }

        if (!queryResult.length) {
            res.statusCode = 404;
            res.send("Not found");
        } else {
            res.statusCode = 200;
            res.json(queryResult);
        }
    } catch (error) {
        res.statusCode = 500;
        console.error(error);
    }
}

async function getProductById(req, res) {
    const {id} = req.params;

    if (id !== null) {
        try {
            const queryResult = await products_service.getProductById(id);
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

async function addNewProduct(req, res) {
    const product = req.body;

    try {
        const newProduct = await products_service.addNewProduct(product);
        res.statusCode = 201;
        res.json(newProduct);
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

export {
    getProducts,
    getProductById,
    addNewProduct
}
