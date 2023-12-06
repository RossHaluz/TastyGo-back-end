const {
  registerUser,
  loginUser,
  getUserDetails,
  updateUser,
  loginWithGoogle,
} = require("../controllers/auth");
const { uploadImage } = require("../middlewars");
const route = require("express").Router();

//Register user
route.post("/register", registerUser);

//Login user
route.post("/login", loginUser);

//Login with google
route.post("/login-google", loginWithGoogle);

//Get user
route.get("/user/:email", getUserDetails);

//Update user
route.put("/update-user/:userId", uploadImage.single("image"), updateUser);

module.exports = route;
