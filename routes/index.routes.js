const express = require("express");
const router = express.Router();
const membersRouter = require("./members.routes");
const reservationRouter = require("./reservation.routes");
const companyRouter = require("../routes/company.routes")
const mockInterviewRouter = require("./mockInterview.routes")

router.use("/members", membersRouter);
router.use("/", reservationRouter);
router.use("/company", companyRouter)
router.use("/mockInterview", mockInterviewRouter)

module.exports = router;
