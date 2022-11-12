const mongoose = require("mongoose");

// required: 무조건 필요한지
const userSchema = new mongoose.Schema({
  memberEmail: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  memberName: {
    type: String,
    // required: true,
  },
  age: {
    type: String,
    // required: true,
  },
  phoneNum: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  address: {
    type: String,
    // required: true,
  },
  tech: {
    type: String,
    // required: true,
  },
  degree: {
    type: String,
    // required: true,
  },
  career: {
    type: String,
    // required: true,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("users", userSchema);
