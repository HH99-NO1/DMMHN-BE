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
    });

    return;
  };

  getListReservation = async (id) => {
    await Reservation.findById(id);
    return;
  };

  createReservation = async (
    companyName,
    companyEmail,
    companyPassword,
    interviewManager
  ) => {
    await Reservation.create(
      companyName,
      companyEmail,
      companyPassword,
      interviewManager
    );
    return;
  };
}

module.exports = ReservationRepository;
