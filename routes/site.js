import express from "express"

const websiteRouter = express.Router();
//
// HTML Document Routes
websiteRouter.get("/", (req, res) => {
  res.render("index")
});
websiteRouter.get("/register", (req, res) => {
  res.render("register")
});
websiteRouter.get("/login", (req, res) => {
  res.render("login")
});
websiteRouter.get("/products", (req, res) => {
  res.render("productPage")
});
websiteRouter.get("/productCreation", (req, res) => {
  res.render("productCreation")
});

export { websiteRouter }
