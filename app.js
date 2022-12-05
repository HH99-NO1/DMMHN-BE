const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./models/index");
connect();
const expiration = require("./schedule/schedule");
const RateLimit = require("express-rate-limit");
const morganMiddleware = require("./middleware/morgan_middleware");
const routes = require("./routes/index.routes");
const videoRoute = require("./routes/index.routes");

app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(cors());

apiLimiter = new RateLimit({
  windowMs: 60 * 1000, // 1분 간격
  max: 30, // windowMs동안 최대 호출 횟수
  handler(req, res) {
    // 제한 초과 시 콜백 함수
    res.status(this.statusCode).json({
      code: this.statusCode, // statusCode 기본값은 429
      message: "1분에 50번만 요청 할 수 있습니다.",
    });
  },
});

app.use(morganMiddleware);

// scheduler 실행
expiration;

app.use("/", apiLimiter, [routes, videoRoute]);

module.exports = app;
