const mongoose = require("mongoose");
const curr = new Date();
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

// required: 무조건 필요한지
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  companyAddress: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
  },
  companyCEO: {
    type: String,
    required: true,
  },
  companyAdmin: {
    type: String,
    required: true,
  },
  companyTel: {
    type: String,
    required: true,
  },
  companyTag: {
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
  cancelMessage: {
    type: String,
  },
  createdAt: { type: String, default: kr_curr },
  updatedAt: { type: String, default: kr_curr },
});

module.exports = mongoose.model("Company", companySchema);
