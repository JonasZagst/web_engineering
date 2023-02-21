import mongoose from "mongoose"

/**
 * MongoDB schema for products on the
 */
const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: false
    },
    price: { // Amount in EURO
        type: Number,
        required: true
    },
    image: { // Link to images in public folder
        type: [String],
        required: false
    },
    // Maybe change the productSpecifications to just a list of tags
    productSpecification: {
        operatingSystem: {
            type: String,
            required: true
        },
        amountRAM: {
            type: Number,
            required: true
        },
        color: {
            type: String,
            required: true
        },
        typeCPU: {
            type: String,
            required: true
        },
        manufactorer: {
            type: String,
            required: true
        },
        typeGPU: { // not every notebook needs a GPU
            type: String,
            required: false
        }
    }
});
productSchema.index({'$**': 'text'});

// productSchema.query.bySearch = function (searchString) {
//
//     return undefined;
// }

const Product = mongoose.model("Product", productSchema);

export {
    Product
}
