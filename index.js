// TODO: Basic authentication (NGINX Authbasic)?

import "dotenv"

import express from "express"
import mongoose from "mongoose"

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DB_URI;

main().catch(err => console.error(err));

const main = async () => {
    const app = express();

    await mongoose.connect(MONGODB_URI);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

