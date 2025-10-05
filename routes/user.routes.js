const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
// validation of data
router.get("/", (req, res) => {
  res.send("user routes");
});
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

module.exports = router;
