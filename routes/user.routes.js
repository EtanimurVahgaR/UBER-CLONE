const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const { authUser } = require("../middleware/auth.middleware");

// user registration
router.post(
  "/register",
  [
    body("email").isEmail(),
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be artleast 3 characters long"),
    body("password")
      .isLength({ min: 3 })
      .withMessage("password must be artleast 6 characters long"),
  ],
  userController.registerUser
);
// get user profile
router.get("/profile", authUser, userController.getUserProfile);

// user login
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid Email"),
    body("password")
      .isLength(6)
      .withMessage("password should be atleast 6 characters long"),
  ],
  userController.loginUser
);

// user logout
router.post("/logout", userController.logoutUser);

module.exports = router;
