// const passport = require("passport");
// //const local = require('./localStrategy'); // 로컬서버로 로그인할때
// const kakao = require("./kakao"); // 네이버서버로 로그인할때

// const Members = require("../models/members");

// module.exports = () => {
//   passport.serializeUser((members, done) => {
//     done(null, members.id);
//   });

//   passport.deserializeUser((email, done) => {
//     Members.findOne({ memberEmail })
//       .then((members) => done(null, members))
//       .catch((err) => done(err));
//   });

//   //local();
//   kakao(); //카카오 전략 등록
// };
