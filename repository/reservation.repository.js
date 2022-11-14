const Reservation = require("../models/reservation");

class ReservationRepository {
  postReservation = async (interviewTopic, interviewTime, reservationDate) => {
    await Reservation.create({
      interviewTopic,
      interviewTime,
      reservationDate,
    });

    return;
  };

  getListReservation = async (id) => {
    await Reservation.findById(id);
    return;
  };
}

module.exports = ReservationRepository;
