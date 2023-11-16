const {
  createItem,
  getAllItems,
  getItemDetails,
  deleteItem,
  updateItem,
  getCategoryItems,
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
route.delete("/delete-item/:itemId", deleteItem);

//Update item
route.put("/update-item/:itemId", upload.single("image"), updateItem);

//Get category items
route.get("/category-items/:nameCategory", getCategoryItems);

module.exports = route;
