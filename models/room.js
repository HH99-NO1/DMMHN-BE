const mongoose = require("mongoose");

// required: 무조건 필요한지
const roomSchema = new mongoose.Schema({
  roomName: {
    type: String,
    // required: true,
  },
  user: {
    type: [],
    // required: true,
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("rooms", roomSchema);
