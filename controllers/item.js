const { HttpError, CtrlWrapper } = require("../healpers");
const { ItemModel } = require("../modules/Item");

const createItem = async (req, res) => {
  console.log(req.file);
};

module.exports = {
  createItem: CtrlWrapper(createItem),
};
