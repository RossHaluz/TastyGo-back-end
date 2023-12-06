const { HttpError, CtrlWrapper } = require("../healpers");
const { UserModel } = require("../modules/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  const { name, number, email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(req.body);
  if (user) {
    throw HttpError("User already exist", 400);
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const registerUser = await UserModel.create({
    name,
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

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw HttpError(400, "Password or email not correct");
  }

  res.json(user);
};

const getUserDetails = async (req, res) => {
  const { email } = req.params;
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw HttpError(404, "User not found");
  }
  res.json(user);
};

const updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email } = req.body;

  if (req.file) {
    const { path } = req.file;
    const uploadUserWithImg = await UserModel.findByIdAndUpdate(
      userId,
      { ...req.body, image: path },
      { new: true }
    );

    if (!uploadUserWithImg) {
      const findUserByEmail = await UserModel.findOne({ email });
      if (!findUserByEmail) {
        throw HttpError(404, "User not found");
      }
    }

    return res.json(uploadUserWithImg);
  }

  const newUser = await UserModel.findByIdAndUpdate(
    userId,
    { ...req.body },
    { new: true }
  );

  if (!newUser) {
    const findUserByEmail = await UserModel.findOne({ email });
    if (!findUserByEmail) {
      throw HttpError(404, "User not found");
    }
  }

  res.json(newUser);
};

const loginWithGoogle = async (req, res) => {
  const { email, name, picture, sub } = req.body;
  console.log(req.body);
  const user = await UserModel.findOne({ email });
  console.log(user);

  if (!user) {
    console.log("33333333");
    const createUser = await UserModel.create({
      email,
      name,
      image: picture,
      userId: sub,
    });

    return res.json(createUser);
  }

  res.json(user);
};

module.exports = {
  registerUser: CtrlWrapper(registerUser),
  loginUser: CtrlWrapper(loginUser),
  getUserDetails: CtrlWrapper(getUserDetails),
  updateUser: CtrlWrapper(updateUser),
  loginWithGoogle: CtrlWrapper(loginWithGoogle),
};
