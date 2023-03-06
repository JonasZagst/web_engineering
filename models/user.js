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

const privateUserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
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
    address: address,
    shoppingCart: {
        type: [{ type: String, required: true }],
        required: false
    },
});

const PrivateUser = mongoose.model("PrivateUser", privateUserSchema);

export {
    PrivateUser
}
