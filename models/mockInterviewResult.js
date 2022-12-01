const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);
const options = {
  year: "2-digit",
  month: "short",
  weekday: "short",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
}

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
  createdAt: { type: String, default: new Intl.DateTimeFormat('ko-KR', options).format(new Date()) },
  updatedAt: { type: String, default: new Intl.DateTimeFormat('ko-KR', options).format(new Date()) },
});

mockInterviewResultSchema.plugin(autoIncrement, {
  inc_field: "sequence"
});

module.exports = mongoose.model(
  "MockInterviewResults",
  mockInterviewResultSchema
);
