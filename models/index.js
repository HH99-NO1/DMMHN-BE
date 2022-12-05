require("dotenv").config();
const DB_NAME = process.env.DB_HOST;
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(
    DB_NAME,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true,
      dbName: "DMMHN",
    }).then(()=> {
      console.log("몽고db에 성공적으로 연결하였습니다.");
    }).catch((error) => {
      console.log(error);
    });
  }

module.exports = connect;
