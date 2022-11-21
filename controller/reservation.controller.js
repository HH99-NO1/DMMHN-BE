const ReservationService = require("../service/reservation.service");
const Company = require("../middleware/company_auth");

class ReservationController {
  reservationService = new ReservationService();

  postReservation = async (req, res, next) => {
    try {
      const {
        interviewTopic,
        interviewTime,
        start,
        end,
        onMuted,
        interviewDone,
        isDone,
      } = req.body;
      const { companyName, companyAdmin } = res.locals.user;

      const postReservation = await this.reservationService.postReservation(
        companyName,
        companyAdmin,
        interviewTopic,
        interviewTime,
        start,
        end,
        onMuted,
        interviewDone,
        isDone
      );

      res.status(201).json({ data: postReservation });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };

  cancelReservation = async (req, res, next) => {
    try {
      const { url } = req.params;
      const { cancelMessage } = req.body;
      const { companyName, companyAdmin } = res.locals.user;

      const cancelReservation = await this.reservationService.cancelReservation(
        url,
        cancelMessage,
        companyName,
        companyAdmin
      );

      res.status(201).json({ data: cancelReservation });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };

  getReservation = async (req, res, next) => {
    // try {
    const { companyName } = res.locals.user;

    const getReservation = await this.reservationService.getReservation(
      companyName,
    );

    res.status(201).json({ data: getReservation });
    // } catch (err) {
    //   res.status(400).json({ errorMessage: err.message });
    // }
  };
}

module.exports = ReservationController;
