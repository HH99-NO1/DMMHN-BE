require("dotenv").config();
const DB_NAME = process.env.DB_HOST;
const mongoose = require("mongoose");

const connect = () => {
  mongoose.connect(DB_NAME, (error) => {
    if (error) console.log("Mongo DB Connect Error");
    else console.log("몽고db에 성공적으로 연결하였습니다.");
  });
};

module.exports = connect;
