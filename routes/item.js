const { createItem } = require("../controllers/item");
const { validateBody, upload } = require("../middlewars");
const { ItemValidate } = require("../modules/Item");
const route = require("express").Router();

route.post(
  "/create-item",
  validateBody(ItemValidate),
  upload.single("image"),
  createItem
);

module.exports = route;
