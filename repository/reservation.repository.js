const Reservation = require("../models/reservation");

class ReservationRepository {
  postReservation = async (
    companyName,
    companyAdmin,
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
      companyAdmin,
      interviewTopic,
      interviewTime,
      start,
      end,
      onMuted,
      interviewDone,
      isDone,
      url,
    });

    return;
  };

  cancelReservation = async (url, cancelMessage) => {
    await Reservation.findOneAndUpdate(
      { url },
      { cancelMessage, urlexpirated: true }
    );
    return;
  };

  getReservation = async (companyName) => {
    await Reservation.findOne({companyName});
    return;
  };
}

module.exports = ReservationRepository;
