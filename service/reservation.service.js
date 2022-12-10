const ReservationRepository = require("../repository/reservation.repository");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
const Company = require("../models/reservation");

class ReservationService {
  reservationRepository = new ReservationRepository();

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
    const [dayOfTheWeek, month, day, year, time] = start.split(" ");
    const [hour, min, sec] = time.split(":");
    const realYear = year - 0;
    const realMonth = month - 1;
    const realDay = day - 0;
    const realHour = hour - 0;
    const realMin = min - 0;
    const date = new Date(realYear, realMonth, realDay, realHour, realMin, 0);
    date.setMinutes(date.getMinutes() + 0);
    schedule.scheduleJob(date, async () => {
      await Company.updateOne({ companyName }, { isDone: "true" });
    });

    const [endDayOfTheWeek, endMonth, endDay, endYear, endTime] =
      end.split(" ");
    const [endHour, endMin, endSec] = endTime.split(":");
    const endRealYear = endYear - 0;
    const endRealMonth = endMonth - 1;
    const endRealDay = endDay - 0;
    const endRealHour = endHour - 0;
    const endRealMin = endMin - 0;
    const endDate = new Date(
      endRealYear,
      endRealMonth,
      endRealDay,
      endRealHour,
      endRealMin,
      0
    );
    endDate.setMinutes(endDate.getMinutes() + 0);
    schedule.scheduleJob(endDate, async () => {
      await Company.updateOne({ companyName }, { isDone: "false" });
    });

    let randomStr = Math.random().toString(36).substring(2, 12);

    url = `localhost:3000/${randomStr}`;

    try {
      if (onMuted === "true") {
        await this.reservationRepository.postReservation(
          companyName,
          companyAdmin,
          interviewTopic,
          interviewTime,
          start,
          end,
          "true",
          interviewDone,
          isDone,
          randomStr
        );
      } else {
        await this.reservationRepository.postReservation(
          companyName,
          companyAdmin,
          interviewTopic,
          interviewTime,
          start,
          end,
          "false",
          interviewDone,
          isDone,
          randomStr
        );
      }

      return {
        companyName,
        companyAdmin,
        interviewTopic,
        interviewTime: {
          start,
          end,
        },
        interviewOption: {
          onMuted,
        },
        interviewDone,
        interviewUrl: {
          isDone,
          url,
        },
      };
    } catch (err) {
      throw new Error("postReservation에서 권한이 없습니다");
    }
  };

  cancelReservation = async (url, cancelMessage, companyName, companyAdmin) => {
    try {
      await this.reservationRepository.cancelReservation(
        url,
        cancelMessage,
        companyName,
        companyAdmin
      );

      return {
        url,
        cancelMessage,
        companyName,
        companyAdmin,
      };
    } catch (err) {
      throw new Error("cancelReservation에서 권한이 없습니다");
    }
  };

  getReservation = async (companyName) => {
    // try {
    await this.reservationRepository.getReservation(
      companyName,
      interviewTopic,
      url,
      onMuted
    );

    return {
      companyName,
      interviewTopic,
      url,
      onMuted,
    };
    // } catch (err) {
    //   throw new Error("getReservation에서 권한이 없습니다");
    // }
  };
}

module.exports = ReservationService;
