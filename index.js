// TODO: Basic authentication (NGINX Authbasic)?

import express from "express"
import mongoose from "mongoose"
import expressLayouts from "express-ejs-layouts"
import dotenv from "dotenv"

import {apiRouter} from "./routes/api.js"
import {createMockProducts} from "./mockdata.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DB_URI;

const main = async () => {
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", "views");
    app.set("layout", "layouts/layout.ejs");
    app.use(expressLayouts);
    app.use(express.static("public"));
    app.use(apiRouter);

    await mongoose.connect(MONGODB_URI);
    const mongooseDb = mongoose.connection;

    // Setup mock data based on .env mock flag
    if (process.env.SETUP_MOCK_DATA) {
        await createMockProducts();
    }

    mongooseDb.on("error", error => console.error(error));
    mongooseDb.once("open", () => console.log("Connected to mongoose database"))

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
}

main().catch(err => console.error(err));