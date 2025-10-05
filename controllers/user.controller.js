const { validationResult } = require("express-validator");
const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const blacklistTokenModel = require("../models/blaclistToken.model");
// register user
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password } = req.body;

  const hashedPassword = await userModel.hashPassword(password);
  const user = await userService.createUser({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
  });

  const token = user.generateAuthToken();
  res.status(201).json({ token, user });
};

// login user
module.exports.loginUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select("+password");

  // user not found
  if (!user) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
  }

  // user found, now check password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);
  res.status(200).json({ token, user });
};

// logout user
module.exports.logoutUser = async (req, res) => {
  res.clearCookie("token");
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    await blacklistTokenModel.create({ token });
  } else {
    return res.status(400).json({ msg: "No token found" });
  }
  res.status(200).json({ msg: "Logged out successfully" });
};
