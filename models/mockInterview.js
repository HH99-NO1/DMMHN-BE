const mongoose = require("mongoose");
const curr = new Date();
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

// required: 무조건 필요한지
const mockInterviewSchema = new mongoose.Schema({
  category: {
    type: String,
   // required: true,
  },
  question: {
    type: String,
  //  required: true,
  },
  createdAt: { type: String, default: kr_curr },
  updatedAt: { type: String, default: kr_curr },
});

module.exports = mongoose.model("MockInterviews", mockInterviewSchema);
