const { registerUser } = require("../controllers/auth");
const route = require("express").Router();

//Register user
route.post("/register", registerUser);

module.exports = route;
