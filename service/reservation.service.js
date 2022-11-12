const ReservationRepository = require("../repository/reservation.repositroy");

class ReservationService {
    reservationRepository = new ReservationRepository();

    postReservation = async (reservationDate, companyAdmin) => {
        try{
            await this.reservationRepository.postReservation(reservationDate, companyAdmin);
            return {
                reservationDate,
                companyAdmin
            }
        } catch (err) {
            throw new Error ("postReservation에서 권한이 없습니다")
        }
    }
}

module.exports = ReservationService;