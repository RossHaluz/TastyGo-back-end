const { HttpError, CtrlWrapper } = require("../healpers");
const { ItemModel } = require("../modules/Item");
const { RecentlyViewedModel } = require("../modules/RecentlyViewed");
const { pagination } = require("../utils/paginations");

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
  const { page: currentPage, limit: currentLimit } = req.query;
  const { page, limit, skip } = pagination(currentPage, currentLimit);

  const items = await ItemModel.find({}, "", { skip, limit });
  const totalItems = await ItemModel.find().count();

  if (!items) {
    throw HttpError(404, "Items not found");
  }

  res.json({
    items,
    meta: {
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
    },
  });
};

const getItemDetails = async (req, res) => {
  const { itemId } = req.params;
  const item = await ItemModel.findById(itemId);

  if (!item) {
    throw HttpError(404, "Item not found");
  }
  // Отримання userId з запиту (припустимо, що ви передаєте його через параметр запиту)
  const userId = req.query.userId;

  // Оновлення Recently Viewed
  if (userId) {
    const recentlyViewed = await RecentlyViewedModel.findOne({ userId });

    if (!recentlyViewed) {
      // Якщо користувача ще немає в Recently Viewed, створіть новий запис
      const newRecentlyViewed = new RecentlyViewedModel({
        userId,
        items: [{ itemId, timestamp: new Date() }],
      });
      await newRecentlyViewed.save();
    } else {
      // Якщо користувач вже існує в Recently Viewed, додайте новий елемент
      recentlyViewed.items.addToSet({ itemId, timestamp: new Date() });

      await recentlyViewed.save();

      // Отримання інформації про айтеми з Recently Viewed
      const recentlyViewedItems = await Promise.all(
        recentlyViewed.items.map((item) => {
          return ItemModel.findOne({ _id: itemId });
        })
      );

      // Додавання інформації про Recently Viewed до відповіді
      return res.json({ item, recentlyViewedItems });
    }
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

const updateItem = async (req, res) => {
  const { itemId } = req.params;
  if (req.file) {
    const { path } = req.file;
    const updateItemWithImg = await ItemModel.findByIdAndUpdate(
      itemId,
      {
        ...req.body,
        image: path,
      },
      { new: true }
    );

    res.json(updateItemWithImg);
  }
  const updateItem = await ItemModel.findByIdAndUpdate(
    itemId,
    { ...req.body },
    { new: true }
  );
  res.json(updateItem);
};

const getCategoryItems = async (req, res) => {
  const { categoryName } = req.params;
  const { page: currentPage, limit: currentLimit } = req.query;
  const { page, limit, skip } = pagination(currentPage, currentLimit);

  const categoryItems = await ItemModel.find({ category: categoryName }, "", {
    skip,
    limit,
  });
  const totalItems = await ItemModel.find({ category: categoryName }).count();
  if (!categoryItems) {
    throw HttpError(404, "Items not found");
  }

  res.json({
    categoryItems,
    meta: {
      totalItems,
      page,
      limit,
      totalPages: Math.ceil(totalItems / limit),
    },
  });
};

const getRecentlyViewed = async (req, res) => {};

module.exports = {
  createItem: CtrlWrapper(createItem),
  getAllItems: CtrlWrapper(getAllItems),
  getItemDetails: CtrlWrapper(getItemDetails),
  deleteItem: CtrlWrapper(deleteItem),
  updateItem: CtrlWrapper(updateItem),
  getCategoryItems: CtrlWrapper(getCategoryItems),
  getRecentlyViewed: CtrlWrapper(getRecentlyViewed),
};
