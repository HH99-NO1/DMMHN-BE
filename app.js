const express = require("express");
const Sentry = require("@sentry/node");
const Tracing = require("@sentry/tracing");
const app = express();
const cors = require("cors");
const connect = require("./models/index");
connect();
const PORT = process.env.EXPRESS_PORT || 3000;
const expiration = require("./schedule/schedule");
const RateLimit = require("express-rate-limit");
const morganMiddleware = require("./middleware/morgan_middleware");
const helmet = require("helmet");
const routes = require("./routes/index.routes");

const swaggerFile = require("./modules/swagger-output.json");
const swaggerUi = require("swagger-ui-express");
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(swaggerFile, { explorer: true })
);

app.use(express.json());
app.use(cors());
app.use(helmet());

apiLimiter = new RateLimit({
  windowMs: 60 * 1000, // 1분 간격
  max: 100, // windowMs동안 최대 호출 횟수
  handler(req, res) {
    // 제한 초과 시 콜백 함수
    res.status(this.statusCode).json({
      code: this.statusCode, // statusCode 기본값은 429
      message: "1분 요청 제한수를 초과하였습니다",
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

app.use("/", apiLimiter, routes);

app.listen(PORT, () => {});

module.exports = app;