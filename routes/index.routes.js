const express = require("express");
const router = express.Router();
const membersRouter = require("./members.routes");
const mockInterviewRouter = require("./mockInterview.routes");
// const reservationRouter = require("./reservation.routes")
// const startKakaoLogin = require("../controller/startKakaoLogin.controller");
// const finishKakaoLogin = require("../controller/finishKakaoLogin.controller");
// const videoRouter = require("./videos.routes");

router.use("/members", membersRouter);
router.use("/mockInterview", mockInterviewRouter);
//router.use("/interviews", reservationRouter);
// router.use("/kakao/start", startKakaoLogin);
// router.use("/kakao/finish", finishKakaoLogin);
//router.use("/video", videoRouter);

module.exports = router;
