import { Schema } from "mongoose"

/**
 * MongoDB schema for products on the
 */
const ProductSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
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

export {
  ProductSchema
}
