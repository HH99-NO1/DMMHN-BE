<<<<<<< HEAD
const express = require("express");
const router = express.Router();
const passport = require("passport");

// /로 요청오면, 카카오 로그인 페이지로 가게 되고, 카카오 서버를 통해 카카오 로그인을 하게 되면, 다음 라우터로 요청한다.
router.get("/", passport.authenticate(""));

//? 위에서 카카오 서버 로그인이 되면, 카카오 redirect url 설정에 따라 이쪽 라우터로 오게 된다.
router.get("/callback", function (req, res, next) {
  passport.authenticate("", function (err, user) {
    console.log("passport.authenticate()실행");
    if (!user) {
      return res.redirect("http://localhost:3000/");
    }
    req.logIn(user, function (err) {
      console.log("/callback user : ", user);
      return res.redirect("http://localhost:3000/");
    });
  })(req, res, next);
});

module.exports = router;
=======
const express = require('express')
const router = express.Router();
const passport = require('passport');


router.get("/kakao", passport.authenticate("kakao"));
router.get(
  "/auth/kakao/callback",
  passport.authenticate("kakao-login", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

module.exports = router;
>>>>>>> f533496bd282565dd3b67e99a7b9b63048c554e3
