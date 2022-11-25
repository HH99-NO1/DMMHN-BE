const mongoose = require("mongoose");
const curr = new Date();
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

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
  createdAt: { type: String, default: kr_curr },
  updatedAt: { type: String, default: kr_curr },
  
});

module.exports = mongoose.model("reservation", reservationSchema);
