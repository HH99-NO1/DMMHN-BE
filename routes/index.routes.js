const express = require("express");
const router = express.Router();
const membersRouter = require("./members.routes");
const reservationRouter = require("./reservation.routes");
const companyRouter = require("../routes/company.routes")

router.use("/members", membersRouter);
router.use("/interviews", reservationRouter);
router.use("/company", companyRouter)

module.exports = router;
