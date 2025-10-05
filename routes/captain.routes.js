const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const captainController = require("../controllers/captain.controller");
const { authCaptain } = require("../middleware/auth.middleware");

// captain registration
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
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("Vehicle color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("Plate number must be at least 3 characters long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("Capacity must be at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "bike", "auto"])
      .withMessage(
        "Invalid Vehicle type. Vehicle type must be car, bike or auto."
      ),
  ],
  captainController.registerCaptain
);

// captain login
router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password")
      .isLength({ min: 3 })
      .withMessage("password must be at least 6 characters long"),
  ],
  captainController.loginCaptain
);

// get captain profile
router.get("/profile", authCaptain, captainController.getCaptainProfile);

router.post("/logout", authCaptain, captainController.logoutCaptain);
module.exports = router;
