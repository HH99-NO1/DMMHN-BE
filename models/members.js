const mongoose = require("mongoose");

// required: 무조건 필요한지
const membersSchema = new mongoose.Schema({
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
  img: {
    type: String,
    // required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Members", membersSchema);
