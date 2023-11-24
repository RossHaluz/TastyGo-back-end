const { HttpError, CtrlWrapper } = require("../healpers");
const { UserModel } = require("../modules/User");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { firstName, number, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    throw HttpError("User already exist", 400);
  }
  const hashPassword = bcrypt(password, 10);

  const registerUser = await UserModel.create({
    firstName,
    number,
    email,
    password: hashPassword,
  });

  res.json(registerUser);
};

module.exports = {
  registerUser: CtrlWrapper(registerUser),
};
