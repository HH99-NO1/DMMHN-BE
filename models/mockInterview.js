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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MockInterviews", mockInterviewSchema);
