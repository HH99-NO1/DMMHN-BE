const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./Strategy");
const MembersModel = require("../models/members");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    console.log("deserializeUser", id);
    MembersModel.findOne({ memberEmail: id })
      .then((user) => done(null, user))
      .catch((err) => done(err));
  });
  //   local();
  kakao();
};
