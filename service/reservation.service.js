const ReservationRepository = require("../repository/reservation.repository");

class ReservationService {
  reservationRepository = new ReservationRepository();

  postReservation = async ( 
    companyName,
    interviewManager,
    interviewTopic,
    interviewTime,
    start,
    end,
    onMuted,
    interviewDone,
    interviewUrl,
    ) => {
    try {
    if(onMuted === "true") {
      await this.reservationRepository.postReservation(
      companyName,
      interviewManager,
      interviewTopic,
      interviewTime,
      start,
      end,
      "true",
      interviewDone,
      interviewUrl
          );
      } else {
      await this.reservationRepository.postReservation(
      companyName,
      interviewManager,
      interviewTopic,
      interviewTime,
      start,
      end,
      "false",
      interviewDone,
      interviewUrl
          );
      }
      return {
      companyName,
      interviewManager,
      interviewTopic, 
      interviewTime: {
        start,
        end
      },
      interviewOption: {
        onMuted
      },
      interviewDone, 
      interviewUrl,
      // createdAt,
      // updatedAt
      };
    } catch (err) {
      throw new Error("postReservation에서 권한이 없습니다");
    }
  };

  getReservation = async (id) => {
    try {
      await this.reservationRepository.getReservation(id);
      
      return {
        interviewTopic: id.interviewTopic,
        reservationDate: id.reservationDate,
      };
    } catch (err) {
      throw new Error("getReservation에서 권한이 없습니다");
    }
  };
}

module.exports = ReservationService;
