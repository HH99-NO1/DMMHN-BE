const mongoose = require("mongoose");

// required: 무조건 필요한지
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    // required: true,
  },
  companyPassword: {
    type: String,
    // required: true,
  },
  companyAddress: {
    type: String,
    // required: true,
  },
  registrationNumber: {
    type: String,
    // required: true,
  },
  interviewManager: {
    type: String,
    // required: true,
  },
  companyTel: {
    type: String,
    // required: true,
  },
  keywordTag: {
    type: String,
    // required: true,
  },
  companyEmail: {
    type: String,
    // required: true,
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("company", companySchema);
