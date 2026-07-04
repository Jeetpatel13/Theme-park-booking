const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  rideId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Ride",
  },

  bookingDate: {
    type: String,
  },

  bookingTime: {
    type: String,
  },
});

module.exports = mongoose.model("Booking", bookingSchema);
