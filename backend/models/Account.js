const mongoose = require("mongoose");

const accountSchema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Accounts", accountSchema);
