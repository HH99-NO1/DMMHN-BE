const express = require("express");
const router = express.Router();
const membersRouter = require("./members.routes");
const mockInterviewRouter = require("./mockInterview.routes");

// const socialRouter = require('./social.routes')

router.use("/members", membersRouter);
router.use("/mockInterview", mockInterviewRouter);
//router.use("/interviews", reservationRouter);
// router.use("/kakao/start", startKakaoLogin);
// router.use("/kakao/finish", finishKakaoLogin);
//router.use("/video", videoRouter);
// router.use("/social", socialRouter);

module.exports = router;
