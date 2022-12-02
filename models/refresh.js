const mongoose = require("mongoose");

// required: 무조건 필요한지
const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
  },
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);
