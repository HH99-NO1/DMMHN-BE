const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const curr = new Date();
const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
const kr_curr = new Date(utc + KR_TIME_DIFF);

// required: 무조건 필요한지
const mockInterviewResultSchema = new mongoose.Schema({
  sequence: {
    type: Number,
    // required: true,
  },
  memberEmail: {
    type: String,
    // required: true
  },
  category: {
    type: String,
    // required: true,
  },
  number: {
    type: Number,
    // required: true,
  },
  result: {
    type: [{}],
    //  required: true,
  },
  totalTime: {
    type: String,
    // required: true,
  },
  createdAt: { type: String, default: kr_curr },
  updatedAt: { type: String, default: kr_curr },
});

mockInterviewResultSchema.plugin(AutoIncrement, {
  inc_field: "sequence"
});

module.exports = mongoose.model(
  "MockInterviewResults",
  mockInterviewResultSchema
);
