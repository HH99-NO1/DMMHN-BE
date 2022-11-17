const mongoose = require("mongoose");

// required: 무조건 필요한지
const reservationSchema = new mongoose.Schema({
  companyName: {
    type: String,
    // required: true,
  },
  interviewManager: {
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
    type: String,
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
  interviewCancelMessage: {
    type: String,
  },
  interviewMembers: {
    type: String,
  },
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
  
});

module.exports = mongoose.model("reservation", reservationSchema);
