const Reservation = require("../models/reservation");

class ReservationRepository {
  postReservation = async (reservationDate, companyAdmin) => {
    await Reservation.create({ reservationDate, companyAdmin });

    return;
  };
}

module.exports = ReservationRepository;
