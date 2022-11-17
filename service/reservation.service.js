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

      let randomStr = Math.random().toString(36).substring(2, 12);
      console.log(randomStr);

      const [dayOfTheWeek, month, day,year ,time] = start.split(" ")
      const [hour, min, sec] = time.split(":")
      const realYear = year-0
      const realMonth = month-1
      const realDay = day-0
      const realHour = hour-0
      const realMin = min -0
      // console.log(realYear, realMonth,realDay, realHour, realMin)
      const date = new Date(realYear, realMonth, realDay, realHour, realMin, 0)
      // console.log(date)
      date.setMinutes(date.getMinutes() - 10)
      schedule.scheduleJob(date, async () => {
        console.log("start: test")
        await Company.updateOne({companyName},{isDone:"true"})
        console.log("성공")
      });

      const [endDayOfTheWeek, endMonth, endDay, endYear, endTime] = end.split(" ")
      const [endHour, endMin, endSec] = endTime.split(":")
      const endRealYear = endYear-0
      const endRealMonth = endMonth-1
      const endRealDay = endDay-0
      const endRealHour = endHour-0
      const endRealMin = endMin -0
      const endDate = new Date(endRealYear, endRealMonth, endRealDay, endRealHour, endRealMin, 0)
      // console.log(endDate)
      endDate.setMinutes(endDate.getMinutes() + 10)
      schedule.scheduleJob(endDate, async () => {
        console.log("end: test")
        await Company.updateOne({companyName},{isDone:"false"})
      });

      url = `localhost:3000/${randomStr}`

      console.log(url)

    try {
    if(onMuted === "true") {
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
      url
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
      url
          );
      };



      return {
      companyName,
      companyAdmin,
      interviewTopic, 
      interviewTime: {
        start,
        end
      },
      interviewOption: {
        onMuted
      },
      interviewDone, 
      interviewUrl: {
        isDone,
        url
      },
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
