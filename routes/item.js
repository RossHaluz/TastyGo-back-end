const {
  createItem,
  getAllItems,
  getItemDetails,
  deleteItem,
} = require("../controllers/item");
const { validateBody, upload } = require("../middlewars");
const { ItemValidate } = require("../modules/Item");
const route = require("express").Router();

//Create new item
route.post("/create-item", upload.single("image"), createItem);

//Get all items
route.get("/get-items", getAllItems);

//Get item details
route.get("/get-item/:itemId", getItemDetails);

//Delete item 
route.delete('/delete-item/:itemId', deleteItem);

module.exports = route;
