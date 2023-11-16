const { HttpError, CtrlWrapper } = require("../healpers");
const { CategoryModel } = require("../modules/Category");

const createCategory = async (req, res) => {
  const newCategory = await CategoryModel.create({ ...req.body });

  res.json(newCategory);
};

const getAllCategories = async (req, res) => {
  const categories = await CategoryModel.find();

  if (!categories) {
    throw HttpError(404, "Categories noit found");
  }

  res.json(categories);
};

const getCategory = async (req, res) => {
  const { categoryId } = req.params;
  const category = await CategoryModel.findById(categoryId);

  if (!category) {
    throw HttpError(404, "Category not found");
  }

  res.json(category);
};

const updateCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { title } = req.body;
  const categories = await CategoryModel.find();
  const updateCategory = await CategoryModel.findByIdAndUpdate(
    categoryId,
    { title: title },
    { new: true }
  );
  if (!updateCategory) {
    throw HttpError(404, "Category not found");
  }

  res.json({
    updateCategory,
    categories,
  });
};

const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;
  const deleteCategory = await CategoryModel.findByIdAndDelete(categoryId);
  if (!deleteCategory) {
    throw HttpError(404, "Category not found");
  }

  res.json(deleteCategory);
};


module.exports = {
  createCategory: CtrlWrapper(createCategory),
  getAllCategories: CtrlWrapper(getAllCategories),
  getCategory: CtrlWrapper(getCategory),
  updateCategory: CtrlWrapper(updateCategory),
  deleteCategory: CtrlWrapper(deleteCategory),

};
