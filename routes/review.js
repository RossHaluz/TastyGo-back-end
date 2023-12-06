const { createNewReview } = require("../controllers/review");
const route = require("express").Router();

//Create new review
route.post("/create-review/:userId", createNewReview);

module.exports = route;
