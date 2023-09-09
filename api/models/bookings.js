const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  place: {type: mongoose.Schema.Types.ObjectId, required: true, ref: "Place"},
  user: {type: mongoose.Schema.Types.ObjectId, required: true},
  checkInDate: {type: Date, required: true},
  checkOutDate: {type: Date, required: true},
  numOfGuests: {type: Number, required: true},
  guestName: {type: String, required: true},
  guestPhone: {type: String, required: true},
  totalPrice: Number,
});

const bookingModel = mongoose.model("Booking", bookingSchema);

module.exports = bookingModel;