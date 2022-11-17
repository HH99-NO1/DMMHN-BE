const Members = require("../models/members");
const schedule = require("node-schedule");
const rule = new schedule.RecurrenceRule();

// 시간 데이터에 1달을 더하는 함수
const nextMonth = (date) => {
  const newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + 1);
  return String(newDate);
};

// 현재 시각
const date = new Date();
const str_date = String(date);

rule.dayOfWeek = [0, 1, 2, 3, 4, 5, 6];
rule.hour = 00;
rule.minute = 00;

// rule에서 정의한 대로 매일 정해진 시간마다 스케쥴러 실행
const j = schedule.scheduleJob(rule, async () => {
  console.log("스케쥴러 실행");
  // expiration 모델에서 모든 유저들의 정보를 가져온다
  const findAllExpiration = await Members.find({});
  const expirationMember = [];

  /**가져온 유저중에서 한달동안 로그인을 하지 않은 유저들을 찾은 뒤
   * expirationMember 배열에 넣는다 */
  for (let i = 0; i < findAllExpiration.length; i++) {
    const date = findAllExpiration[i].updatedAt;
    if (nextMonth(date) < str_date) {
      expirationMember.push(findAllExpiration[i]);
    }
  }
  console.log();
  //expirationMember 배열에 담긴 유저들의 expiration값을 true로 바꾼다
  if (expirationMember[0] !== undefined) {
    for (let i = 0; i < expirationMember.length; i++) {
      await Members.findByIdAndUpdate(expirationMember[i]._id, {
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

module.exports = j;
