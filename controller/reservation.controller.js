const ReservationService = require("../service/reservation.service");

class ReservationController {
    reservationService = new ReservationService();

    postReservation = async (req, res, next) => {
        try {
            const { interviewTopic, interviewTime, reservationDate } = req.body;
            // const { companyAdmin } = res.locals.user;
        
            const postReservation = await this.reservationService.postReservation(interviewTopic,interviewTime,reservationDate);
        
            res.status(201).json({ data: postReservation });
        
        } catch (err) {
            res.status(400).json({errorMessage: err.message})
        }
    }

    getReservation = async (req, res, next) => {
        try {
            const { id } = res.locals.user;

            const getReservation = await this.reservationService.getReservation(id);

            res.status(201).json({ data: getReservation });
            
        } catch (err) {
            res.status(400).json({errorMessage: err.message})
        }
    }
}

module.exports = ReservationController