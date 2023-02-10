import fs from "fs/promises"

import express from "express"

import { buildRoutes } from "./routes.js"

let app = express();

app.use(express.static("public"));

/* Here are currently only place holders */
const routes = {
  dir: "site/",
  template: "template.html",

  "/": "/startpage/index.html",
  "/search/": "/search/index.html",
  "/login/": "/login/index.html",
  "/register/": "/register/index.html",
};

await buildRoutes(app, routes);

app.listen(3000, () => {
  console.log("Server started");
});
