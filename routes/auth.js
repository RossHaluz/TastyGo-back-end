const { registerUser, loginUser } = require("../controllers/auth");
const route = require("express").Router();

//Register user
route.post("/register", registerUser);

//Login user 
route.post('/login', loginUser);

module.exports = route;
