const { HttpError, CtrlWrapper } = require("../healpers");
const { ItemModel } = require("../modules/Item");

const createItem = async (req, res) => {
  if (req.file) {
    const { path } = req.file;
    const createItemWithImg = await ItemModel.create({
      ...req.body,
      image: path,
    });
    return res.json(createItemWithImg);
  }
  const createItem = await ItemModel.create({
    ...req.body,
  });

  res.json(createItem);
};

const getAllItems = async (req, res) => {
  const items = await ItemModel.find();
  if (!items) {
    throw HttpError(404, "Items not found");
  }

  res.json(items);
};

const getItemDetails = async (req, res) => {
  const { itemId } = req.params;
  const item = await ItemModel.findById(itemId);
  if (!item) {
    throw HttpError(404, "Item not found");
  }

  res.json(item);
};

const deleteItem = async (req, res) => {
  const { itemId } = req.params;
  const deleteItem = await ItemModel.findByIdAndDelete(itemId);
  if (!deleteItem) {
    throw HttpError(404, "Item not found");
  }
  res.json(deleteItem);
};

module.exports = {
  createItem: CtrlWrapper(createItem),
  getAllItems: CtrlWrapper(getAllItems),
  getItemDetails: CtrlWrapper(getItemDetails),
  deleteItem: CtrlWrapper(deleteItem),
};