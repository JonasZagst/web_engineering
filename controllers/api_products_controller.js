async function getProducts(req, res) {

    const {search} = req.params;

    // const products = ...; // List

    if (search) {
        // Return all products matching the search
    } else {
        // Return all products
    }

    // res.json(products) // [ { ... }, { ... } ]

}

async function getProductById(req, res) {
    const {id} = res.params;

    // const product = ...;

    // res.json(product);
}

async function addNewProduct(req, res) {
    const product = req.body;

    try {
        // product = services.createProduct(product);
        // res.json(product)
    } catch (err) {
        // TODO: Error handaling, 400 if format is wrong, else 500
    }
}

export {
    getProducts,
    getProductById,
    addNewProduct
}
