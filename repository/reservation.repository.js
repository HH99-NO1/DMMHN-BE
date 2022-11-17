const Reservation = require("../models/reservation");

class ReservationRepository {
  postReservation = async (       
    companyName,
    interviewManager,
    interviewTopic,
    interviewTime,
    start,
    end,
    onMuted,
    interviewDone,
    isDone,
    url
    ) => {
   await Reservation.create({
      companyName,
      interviewManager,
      interviewTopic, 
      interviewTime, 
      start,
      end,
      onMuted, 
      interviewDone,
      isDone,
      url
      // createdAt,
      // updatedAt
    });

    return;
  };

  getListReservation = async (id) => {
    await Reservation.findById(id);
    return;
  };
}

module.exports = ReservationRepository;
