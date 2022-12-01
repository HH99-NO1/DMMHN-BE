const mongoose = require("mongoose");
const curr = new Date();
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

// required: 무조건 필요한지
const membersSchema = new mongoose.Schema({
  memberEmail: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    //  required: true,
  },
  expiration: {
    type: String,
  },
  memberName: {
    type: String,
    //  required: true,
  },
  birth: {
    type: String,
    //  required: true,
  },
  gender: {
    type: String,
    //  required: true,
  },
  stack: {
    type: String,
    //required: true,
  },
  degree: {
    type: String,
    // required: true,
  },
  career: {
    type: String,
    // required: true,
  },
  major: {
    type: String,
  },
  img: {
    type: String,
    default: "https://i.ibb.co/jwSbV5Z/profile-default.png",
    // required: true,
  },
  snsId: {
    type: String,
  },
  provider: {
    type: String,
  },
  loginHistory: {
    type: String,
    default: kr_curr,
  },
  createdAt: { type: String, default: kr_curr },
  updatedAt: { type: String, default: kr_curr },
});

module.exports = mongoose.model("Members", membersSchema);
