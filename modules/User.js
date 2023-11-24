const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
  firstName: {
    type: String,
    require: true,
  },
  number: {
    type: String,
    require: true,
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
