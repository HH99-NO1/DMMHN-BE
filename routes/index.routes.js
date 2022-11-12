const express = require("express");
const router = express.Router();
const membersRouter = require("./members.routes");
const reservationRouter = require("./reservation.routes");

router.use("/members", membersRouter);
router.use("/company", reservationRouter);

module.exports = router;
