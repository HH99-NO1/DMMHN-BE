const mongoose = require("mongoose");

// required: 무조건 필요한지
const reservationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    // required: true,
  },
  companyAdmin: {
    type: String,
    // required: true,
  },
  memberName: {
    type: String,
    // required: true,
  },
  reservationDate: {
    type: String,
    // required: true,
  },
  interviewTopic: {
    type: String,
    // required: true,
  },
  interviewTime: {
    type: String,
    // required: true,
  },
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("reservation", reservationSchema);
