const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const { add } = require("date-fns");


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
  createdAt: { type: Date, default: add(new Date(), { hours: 9 }) },
  updatedAt: { type: Date, default: add(new Date(), { hours: 9 }) },
});

mockInterviewResultSchema.plugin(autoIncrement, {
  inc_field: "sequence"
});

module.exports = mongoose.model(
  "MockInterviewResults",
  mockInterviewResultSchema
);
