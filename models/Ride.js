const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
  rideName: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  duration: {
    type: String,
  },

  minHeight: {
    type: String,
  },

  availableTimes: [String],
});

module.exports = mongoose.model("Ride", rideSchema);
