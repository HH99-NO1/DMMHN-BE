const mongoose = require("mongoose");

// required: 무조건 필요한지
const membersSchema = new mongoose.Schema({
  memberEmail: {
    type: String,
   // required: true,
  },
  password: {
    type: String,
  //  required: true,
  },
  confirmPw:{
    type:String,
//required:true
  },
  expiration: {
    type: String,
  },
  memberName: {
    type: String,
  //  required: true,
  },
  
  phoneNum: {
    type: String,
   //  required: true,
  },
  gender: {
    type: String,
   //  required: true,
  },
  personalNum: {
    type: String,
   //  required: true,
  },
  tech: {
    type: String,
     //required: true,
  },
  degree: {
    type: String,
    // required: true,
  },
  career: {
    type: String,
    // required: true,
  },
  img: {
    type: String,
    // required: true,
  },
  loginHistory: {
    type: String,
    default: new Date(),
  },
  createdAt: { type: String, default: new Date() },
  updatedAt: { type: String, default: new Date() },
});

module.exports = mongoose.model("Members", membersSchema);
