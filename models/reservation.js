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
  interviewOption: {
    type: String,
  },
  onMuted: {
    type: String,
  },
  interviewTopic: {
    type: String,
    // required: true,
  },
  interviewTime: {
    type: String,
    default: new Date(),
  },
  start: {
    type: String,
  },
  end: {
    type: String,
  },
  interviewDone: {
    type: Boolean,
  },
  interviewUrl: {
    type: String,
  },
  isDone: {
    type: String,
  },
  url: {
    type: String,
    // required: true,
  },
  cancelMessage: {
    type: String,
  },
  interviewMembers: {
    type: String,
  },
  urlexpirated: {
    type: Boolean,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("reservation", reservationSchema);
