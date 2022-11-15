const express = require("express");
const router = express.Router();
const authCompanyMiddleware = require("../middleware/company_auth");

const ReservationController = require("../controller/reservation.controller");
const reservationController = new ReservationController();

router.post("/reservation", authCompanyMiddleware, reservationController.postReservation);
router.get("/list/reservation", authCompanyMiddleware, reservationController.getListReservation);

module.exports = router;
