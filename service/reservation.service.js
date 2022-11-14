const ReservationRepository = require("../repository/reservation.repository");

class ReservationService {
    reservationRepository = new ReservationRepository();

    postReservation = async (interviewTopic, interviewTime, reservationDate) => {
        try{
            await this.reservationRepository.postReservation(interviewTopic,interviewTime,reservationDate);
            return {
                interviewTopic,
                interviewTime,
                reservationDate,
            }
        } catch (err) {
            throw new Error ("postReservation에서 권한이 없습니다")
        }
    }

    getListReservation = async (id) => {
        try{
            await this.reservationRepository.getListReservation(id);
            return {
                interviewTopic: id.interviewTopic,
                reservationDate: id.reservationDate,
            }
        } catch (err) {
            throw new Error ("getReservation에서 권한이 없습니다")
        }
    }
}

module.exports = ReservationService;