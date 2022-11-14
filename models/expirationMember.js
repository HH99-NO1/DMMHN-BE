const mongoose = require("mongoose");

// required: 무조건 필요한지
const expirationMembersSchema = new mongoose.Schema({
  memberEmail: {
    type: String,
    // required: true,
  },
  expiration: {
    type: String,
  },
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("expirationMember", expirationMembersSchema);
