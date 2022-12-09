var fs = require("fs");
var logger = require("tracer").console({
  transport: [
    function (data) {
      fs.appendFile("./file.log", data.rawoutput + "\n", (err) => {
        if (err) throw err;
      });
    },
    function (data) {
      console.log(data.output);
    },
  ],
});

function getTodayFormat() {
  let today = new Date();

  let year = today.getFullYear(); // 년도
  let month = today.getMonth() + 1; // 월
  let date = today.getDate(); // 날짜
  let day = today.getDay(); // 요일

  let format =
    year +
    "-" +
    ((month + "").length === 1 ? "0" : "") +
    month +
    "-" +
    ((date + "").length === 1 ? "0" : "") +
    date; // ex) 2021-08-24

  return format;
}

module.exports = logger;
