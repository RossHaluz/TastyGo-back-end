const { Schema, model } = require("mongoose");
const Joi = require("joi");

const CategorySchema = new Schema({
  title: {
    type: String,
    require: true,
  },
});

const categoryValidate = Joi.object({
  title: Joi.string(),
});

const CategoryModel = model("category", CategorySchema);

module.exports = {
  CategoryModel,
  categoryValidate,
};
