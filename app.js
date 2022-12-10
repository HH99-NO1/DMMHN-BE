const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const app = express();
const cors = require("cors");
const connect = require("./models/index");
connect();
const PORT = process.env.EXPRESS_PORT || 3000;
var WhatapAgent = require("whatap").NodeAgent;
const logger = require("./config/tracer");
const rTracer = require("cls-rtracer");
const expiration = require("./schedule/schedule");
const RateLimit = require("express-rate-limit");
const morganMiddleware = require("./middleware/morgan_middleware");
const routes = require("./routes/index.routes");
const videoRoute = require("./routes/index.routes");

// app.get("/", function rootHandler(req, res) {
//   res.end("Hello world!");
// });

//소셜로그인 테스트
// const ejs = require("ejs");
// app.set("view engine", "ejs");
// app.set("views", "./views");

// app.get("/", (req, res) => {
//   res.send("Hellow world");
// });

app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(cors());

apiLimiter = new RateLimit({
  windowMs: 60 * 1000, // 1분 간격
  max: 100, // windowMs동안 최대 호출 횟수
  handler(req, res) {
    // 제한 초과 시 콜백 함수
    res.status(this.statusCode).json({
      code: this.statusCode, // statusCode 기본값은 429
      message: "1분에 50번만 요청 할 수 있습니다.",
    });
  },
});

app.use(morganMiddleware);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Tracing.Integrations.Express({ app }),
  ],
});
// 첫번째 미들웨어로 설정
app.use(Sentry.Handlers.requestHandler());

app.use(Sentry.Handlers.tracingHandler());

app.use(Sentry.Handlers.errorHandler());

app.get("/debug-sentry", () => {
  throw new Error("My first Sentry error!");
});

// scheduler 실행
expiration;

// app.use(rTracer.expressMiddleware());
// app.use((req, res, next) => {
//   const {
//     method,
//     path,
//     url,
//     query,
//     headers: { cookie },
//     body,
//   } = req;
//   const request = {
//     method,
//     path,
//     cookie,
//     body,
//     url,
//     query,
//   };
//   logger.info({ request });
//   next();
// });
app.use("/", apiLimiter, [(routes, videoRoute)]);

app.listen(PORT, () => {
  logger.info(`http server on ${PORT}`);
});
module.exports = app;
