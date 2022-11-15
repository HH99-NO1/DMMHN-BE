const mongoose = require("mongoose");

// required: 무조건 필요한지
const companySchema = new mongoose.Schema({
  companyName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  confirmPw: {
    type: String,
    //required:true,
  },
 
  companyAddress: {
    type: String,
    // required: true,
  },
  businessScale:{
    type:String,
    //required:true,
  },
  registrationNumber: {
    type: String,
    // required: true,
  },
  companyAdmin: {
    type: String,
    // required: true,
  },
  companyTel: {
    type: String,
    // required: true,
  },
  companyTage: {
    type: String,
    // required: true,
  },
  companyEmail: {
    type: String,
    // required: true,
  },
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("Company", companySchema);
