const express = require('express');
const router = express.Router();
const authCompanyMiddleware = require("../middleware/company_auth");

const ReservationController = require('../controller/reservation.controller');
const reservationController = new ReservationController();

router.post("/reservation", reservationController.postReservation);
router.get("/list/reservation", reservationController.getListReservation);

module.exports = router;