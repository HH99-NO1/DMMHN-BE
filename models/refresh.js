const mongoose = require("mongoose");
// const curr = new Date();
// const utc = curr.getTime() + curr.getTimezoneOffset() * 60 * 1000;
// const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
// const kr_curr = new Date(utc + KR_TIME_DIFF);

// required: 무조건 필요한지
const refreshTokenSchema = new mongoose.Schema({
  refreshToken: {
    type: String,
  },
  // createdAt: { type: Date, default: Date.now, expires: "2m" },
  updatedAt: { type: Date },
});

module.exports = mongoose.model("refreshToken", refreshTokenSchema);
