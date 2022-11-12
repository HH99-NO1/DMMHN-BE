const express = require("express");
const router = express.Router();
const reservationRouter = require("./reservation.routes");

router.use("/company", reservationRouter)

module.exports = router;
