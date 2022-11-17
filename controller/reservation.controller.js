const ReservationService = require("../service/reservation.service");
const Company = require("../middleware/company_auth");

class ReservationController {
  reservationService = new ReservationService();

  postReservation = async (req, res, next) => {
    try {
      const { interviewTopic, interviewTime, start, end, onMuted, interviewDone, isDone } = req.body;

      console.log("#####controller", res.locals.user)
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
        isDone,
      );

      res.status(201).json({ data: postReservation });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };

  // postUrl = async (req, res, next) => {
  //   const { _id } = req.params;
  //   const { companyName } = res.locals.user;

  //   await Company.findById({ companyName });
  //   const makeUrl = await Company.creare({_id, companyName});

  //   res.status(201).json({ data: makeUrl});
  // }

  getListReservation = async (req, res, next) => {
    try {
      const { id } = res.locals.user;

      const getReservation = await this.reservationService.getListReservation(
        id
      );

      res.status(201).json({ data: getReservation });
    } catch (err) {
      res.status(400).json({ errorMessage: err.message });
    }
  };
}

module.exports = ReservationController;
