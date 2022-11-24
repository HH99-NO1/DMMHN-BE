const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

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
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
});

mockInterviewResultSchema.plugin(AutoIncrement, {
  inc_field: "sequence"
});

module.exports = mongoose.model(
  "MockInterviewResults",
  mockInterviewResultSchema
);
