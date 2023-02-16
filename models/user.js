import mongoose from "mongoose"

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

const privateUserSchema = new mongoose.Schema({
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
    type: [{ type: String, required: true }],
    required: false
  },
});

const companyUserSchema = new Schema({
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

const PrivateUser = mongoose.model("CompanyUser", privateUserSchema);
const CompanyUser = mongoose.model("CompanyUser", companyUserSchema);

export {
  PrivateUser,
  CompanyUser
}
