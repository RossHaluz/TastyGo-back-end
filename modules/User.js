const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
  },
  DateOfBirth: {
    type: Date,
  },
  number: {
    type: String,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 3,
  },
  image: {
    type: String,
  },
  orders: {
    type: [Schema.Types.ObjectId],
    ref: "Order",
  },
  reviews: {
    type: [Schema.Types.ObjectId],
    ref: "Review",
  },
});

const validateRegister = Joi.object({
  firstName: Joi.string().required(),
  number: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const UserModel = model("user", userSchema);

module.exports = {
  UserModel,
  validateRegister,
};
