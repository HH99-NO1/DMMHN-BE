const express = require('express');
const router = express.Router();
const authCompanyMiddleware = require('../middlewares/auth_company_middleware');

const ReservationController = require('../controller/reservation.controller');
const reservationController = new ReservationController();

router.post("/reservation", authCompanyMiddleware, reservationController.postReservation)

module.exports = router;