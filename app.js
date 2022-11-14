const express = require("express");
const app = express();
const PORT = process.env.EXPRESS_PORT || 3000;
const cors = require("cors");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();
const connect = require("./models/index");
const expiration = require("./models/expirationMember");
connect();

const morgan = require("morgan");
const routes = require("./routes/index.routes");
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

// 마지막 로그인 기록에 + 1 month
const nextMonth = (date) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);
  return String(newDate);
};

// 현재 시각
const date = new Date();
const str_date = String(date);
// const newDate = new Date(str_date);
// scheduler rule
rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
rule.hour = 09;
rule.minute = 25;

// rule에서 정의한 대로 매일 정해진 시간마다 스케쥴러 실행
schedule.scheduleJob(rule, async () => {
  // expiration 모델에서 모든 유저들의 정보를 가져온다
  const findAllExpiration = await expiration.find({});
  const expirationMember = [];

  /**가져온 유저중에서 한달동안 로그인을 하지 않은 유저들을 찾은 뒤
   * expirationMember 배열에 넣는다 */
  for (let i = 0; i < findAllExpiration.length; i++) {
    const date = findAllExpiration[i].updatedAt;
    if (nextMonth(date) < str_date) {
      expirationMember.push(findAllExpiration[i]);
    }
  }

  //expirationMember 배열에 담긴 유저들의 expiration값을 true로 바꾼다
  if (expirationMember[0] !== undefined) {
    for (let i = 0; i < expirationMember.length; i++) {
      await expiration.findByIdAndUpdate(expirationMember[i]._id, {
        expiration: "true",
      });
      console.log(
        `${expirationMember[i].memberEmail}의 계정이 일시적으로 정지되었습니다`
      );
    }
  } else {
    console.log("정지할 계정이 없습니다");
  }
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`${PORT} is Running`);
});
