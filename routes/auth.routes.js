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