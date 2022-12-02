const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

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
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

mockInterviewResultSchema.plugin(autoIncrement, {
  inc_field: "sequence"
});

module.exports = mongoose.model(
  "MockInterviewResults",
  mockInterviewResultSchema
);
