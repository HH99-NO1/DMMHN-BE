const mongoose = require("mongoose");

// required: 무조건 필요한지
const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
  },
  expiratedAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);
