const mongoose = require("mongoose");

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
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("MockInterviews", mockInterviewSchema);
