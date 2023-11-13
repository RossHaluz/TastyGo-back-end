const { Schema, model } = require("mongoose");
const Joi = require("joi");

const itemSchema = new Schema({
  img: {
    type: String,
    require: true,
  },
  nameItem: {
    type: String,
    require: true,
  },
  weigth: {
    type: String,
    require: true,
  },
  ingredients: {
    type: [Object],
    require: true,
  },
  allergens: {
    type: [String],
  },
  price: {
    type: String,
    require: true,
  },
  characteristics: {
    type: [Object],
    require: true,
  },
  popular: {
    type: Boolean,
  },
  season: {
    type: Boolean,
  },
  category: {
    type: String,
    require: true,
  },
});

const ItemModel = model("item", itemSchema);

const ItemValidate = Joi.object({
  img: Joi.string().required(),
  nameItem: Joi.string().required(),
  weigth: Joi.string().required(),
  ingredients: Joi.array().items(
    Joi.object({
      option: Joi.string(),
    })
  ),
  allergens: Joi.array().items(Joi.string()),
  price: Joi.string().required(),
  characteristics: Joi.array().items(
    Joi.object({
      name: Joi.string(),
      option: Joi.string(),
    })
  ),
});

module.exports = {
  ItemValidate,
  ItemModel,
};
