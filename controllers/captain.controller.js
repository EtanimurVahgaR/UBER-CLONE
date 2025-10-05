const captainModel = require("../models/captain.model");
const { validationResult } = require("express-validator");
const captainService = require("../services/captain.service");

// register captain
module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { fullname, email, password, vehicle } = req.body;

  const doesCaptainExist = await captainModel.findOne({ email });
  if (doesCaptainExist) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Captain with this email already exists" }] });
  }

  const hashedPassword = await captainModel.hashPassword(password);
  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashedPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();
  res.status(201).json({ token, captain });
};

// login captain
module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");
  if (!captain) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Invalid email or password" }] });
  }
  const isMatch = await captain.comparePassword(password);
  if (!isMatch) {
    return res
      .status(400)
      .json({ errors: [{ msg: "Invalid email or password" }] });
  }

  const token = captain.generateAuthToken();
  res.cookie("cap_token", token);
  res.status(200).json({ token, captain });
};

//  get Captain Profile
module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json({ captain: req.captain });
};

// logout captain
module.exports.logoutCaptain = async (req, res) => {
  res.clearCookie("cap_token");
  const token =
    req.cookies["cap_token"] ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (token) {
    await blacklistTokenModel.create({ token });
  } else {
    return res.status(400).json({ msg: "No token found" });
  }
  res.status(200).json({ msg: "Logged out successfully" });
};
