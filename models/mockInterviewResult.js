const mongoose = require("mongoose");
var autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(connection);

// required: 무조건 필요한지
const mockInterviewResultSchema = new mongoose.Schema({
  seq: {
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

mockInterviewResultSchema.plugin(autoIncrement.plugin,{
	model : 'MockInterviewResults',
	field : 'seq',
	startAt : 1, //시작 
	increment : 1 // 증가
});

module.exports = mongoose.model(
  "MockInterviewResults",
  mockInterviewResultSchema
);
