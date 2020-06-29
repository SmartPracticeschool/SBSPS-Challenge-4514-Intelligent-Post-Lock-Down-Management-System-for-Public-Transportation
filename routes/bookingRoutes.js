const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");
const authenticationController = require("../controllers/authenticationController");

router.post("/createOrder", bookingController.createOrder);
router.post(
  "/createbooking",
  authenticationController.sendProtect,
  bookingController.createBooking
);

module.exports = router;
