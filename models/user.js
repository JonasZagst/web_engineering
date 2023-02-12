import { Schema } from "mongoose"

const Address = {
  type: {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    zip: {
      type: Number,
      required: true
    },
    street: {
      type: String,
      required: true
    },
    houseNumber: {
      type: String,
      required: true
    }
  },
  required: false
};

const PrivateUserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: Address,

  shoppingCart: { 
    type: [{type: String, required: true}], 
    required: false
  },
});

const CompanyUserSchema = new Schema({
  userId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  address: Address
});

export {
  PrivateUserSchema,
  CompanyUserSchema
}
