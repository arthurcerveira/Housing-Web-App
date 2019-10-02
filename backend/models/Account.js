const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 1024
  },
  name: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  description: {
    type: String,
    required: true,
    min: 5,
    max: 500
  },
  role: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Accounts", accountSchema);
