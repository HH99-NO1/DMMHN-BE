const { string } = require("joi");
const mongoose = require("mongoose");

// required: 무조건 필요한지
const membersSchema = new mongoose.Schema({
  memberEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expiration: {
    type: String,
  },
  memberName: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  stack: {
    type: String,
    required: true,
  },
  job: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    default: "https://i.ibb.co/jwSbV5Z/profile-default.png",
  },
  provider: {
    type: String,
  },
  loginHistory: {
    type: Date,
    default: Date.now,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Members", membersSchema);
