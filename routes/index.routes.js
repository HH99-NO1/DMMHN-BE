const express = require("express");
const router = express.Router();
const membersRouter = require("./members.routes");
const reservationRouter = require("./reservation.routes");
const companyRouter = require("../routes/company.routes");
const mockInterviewRouter = require("./mockInterview.routes");
const authRouter = require("./auth.routes");
const startKakaoLogin = require("../controller/startKakaoLogin.controller");
const finishKakaoLogin = require("../controller/finishKakaoLogin.controller");
const videoRouter = require("./videos.routes");
const authRouter = require("./auth.routes");
//const passportConfig = require("../passport");
//passportConfig(app);

router.use("/members", membersRouter);
router.use("/interviews", reservationRouter);
router.use("/company", companyRouter);
router.use("/mockInterview", mockInterviewRouter);
router.use("/kakao/start", startKakaoLogin);
router.use("/kakao/finish", finishKakaoLogin);
router.use("/video", videoRouter);
router.use("/auth", authRouter);

module.exports = router;
