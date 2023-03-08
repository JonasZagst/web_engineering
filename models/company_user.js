import mongoose from "mongoose"

const address = {
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

const companyUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    address: address
});
    
const CompanyUser = mongoose.model("CompanyUser", companyUserSchema);

export {
    CompanyUser
}
