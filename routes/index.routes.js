const express = require("express");
const router = express.Router();
const membersRouter = require("./members.routes");
const reservationRouter = require("./reservation.routes");
const companyRouter = require("../routes/company.routes");
const mockInterviewRouter = require("./mockInterview.routes");
const room = require("./room.routes");

router.use("/members", membersRouter);
router.use("/interviews", reservationRouter);
router.use("/company", companyRouter);
router.use("/mockInterview", mockInterviewRouter);
router.use("/room", room);

module.exports = router;
