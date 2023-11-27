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

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  const comparePassword = bcrypt.compare(password, user.password);

  if (!comparePassword) {
    throw HttpError(400, "Password or email not correct");
  }

  res.json(user);
};

module.exports = {
  registerUser: CtrlWrapper(registerUser),
  loginUser: CtrlWrapper(loginUser),
};
