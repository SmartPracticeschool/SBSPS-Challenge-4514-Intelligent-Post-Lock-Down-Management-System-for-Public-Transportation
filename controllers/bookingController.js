const Booking = require("../models/bookingModel");

const axios = require("axios");
const uniqid = require("uniqid");

const asyncCatch = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.createOrder = asyncCatch(async (req, res, next) => {
  const response = await axios.post(
    "https://api.razorpay.com/v1/orders",
    {
      amount: req.body.amount,
      currency: "INR",
      receipt: uniqid("reciept-"),
      payment_capture: 1,

      notes: {},
    },
    {
      auth: {
        username: "rzp_test_2EpN77dvZEjRup",
        password: "uCpfLwVgy3w9R2b9bTmCeKvO",
      },
    }
  );
  res.status(200).json({
    status: "success",
    data: response.data,
  });
});

exports.createBooking = asyncCatch(async (req, res, next) => {
  console.log(req.body);
  const booking = await Booking.create({ ...req.body, userId: req.user.id });
  res.status(200).json({
    status: "success",
    data: booking,
  });
});
