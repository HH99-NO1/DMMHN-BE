const passport = require("passport");
const KakaoStrategy = require("passport-kakao").Strategy;

const MemebersModel = require("../models/members");

module.exports = () => {
  passport.use(
    "kakao",
    new KakaoStrategy(
      {
        clientID: "805767768fee7092b22ffb1460b8e3d2",
        callbackURL: "http://localhost:3000/auth/kakao/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log("kakao profile", profile);
        try {
          const exMember = await MemebersModel.findOne({
            snsId: profile.id,
            provider: "kakao",
          });
          if (exMember) {
            done(null, exMember);
          } else {
            const newMember = await MemebersModel.create({
              memberEmail: profile._json && profile._json.kakao_account_email,
              snsId: profile.id,
              provider: "kakao",
            });
            done(null, newMember);
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
