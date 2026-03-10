const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  dateOfBirth: String,
  address: String,
  membershipType: String,
  phoneNumber: String,
  password: String
});

module.exports = mongoose.model("Member", memberSchema);