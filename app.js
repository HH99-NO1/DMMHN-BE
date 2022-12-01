const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./models/index");
connect();
const expiration = require("./schedule/schedule");

const morganMiddleware = require("./middleware/morgan_middleware");
const routes = require("./routes/index.routes");
const videoRoute = require("./routes/index.routes")

app.use(express.json());
// app.use(
//   cors({
//     origin: "*",
//   })
// );
app.use(cors());

app.use(morganMiddleware);

// scheduler 실행
expiration;

app.use("/", [routes,videoRoute]);

module.exports = app;
