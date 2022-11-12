const ReservationService = require("../service/reservation.service");

class ReservationController {
    reservationService = new ReservationService();

    postReservation = async (req, res, next) => {
        try {
            const { reservationDate } = req.body;
            const { companyAdmin } = res.locals.user;
        
            const postReservation = await this.reservationService.postReservation(reservationDate, companyAdmin);
        
            res.status(201).json({ data: postReservation });
        
        } catch (err) {
            res.status(400).json({errorMessage: err.message})
        }
    }
}

module.exports = ReservationController