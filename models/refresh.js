const mongoose = require("mongoose");

// required: 무조건 필요한지
const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
  },
  expireAt: {
    type: Date,
    default: Date.now,
    index: { expires: "1m" },
  },
  createdAt: { type: Date },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);
