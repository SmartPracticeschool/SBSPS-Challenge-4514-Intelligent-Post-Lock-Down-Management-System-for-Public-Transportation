const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookingSchema = new Schema({
  pickup: {
    type: String,
    required: [true, "Pickup location should be selected."],
  },
  destination: {
    type: String,
    required: [true, "Destination should be selected"],
  },
  userId: {
    type: String,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ["online", "cash"],
    default: "cash",
  },
  orderId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: new Date().toISOString(),
  },
  transportationMode: {
    type: String,
    enum: ["taxi", "bus", "auto", "bike"],
    required: [true, "this is a required field"],
  },
  confirmation: {
    type: String,
    enum: ["pending", "confirmed"],
    default: "pending",
  },
});

const bookingModel = mongoose.model("Booking", BookingSchema);
module.exports = bookingModel;
