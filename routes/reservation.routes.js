const express = require('express');
const router = express.Router();

const ReservationController = require('../controller/reservation.controller');
const reservationController = new ReservationController();

router.post("/reservation", reservationController.postReservation)

module.exports = router;